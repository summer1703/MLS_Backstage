<template>
	<div class="tabBox">
		<h2>用户信息</h2>
		<div class='searchBox'>
			<el-input placeholder="请输入关键字查询" v-model="selectSearchUserValue">
			    <el-select class='searchSel' v-model="selectSearchUser" slot="prepend" placeholder="请选择">
			        <el-option label="用户名" value="1"></el-option>
			        <el-option label="手机号" value="2"></el-option>
			        <el-option label="邮箱" value="3"></el-option>
			    </el-select>
			    <el-button slot="append" icon="search" @click='searchUser'></el-button>
		    </el-input>
		</div>
		<el-table ref="multipleTable2" :data="user.rows" border
		    tooltip-effect="dark"
		    style="width: 100%" @selection-change="handleSelectionUserChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop='username' label="用户名"></el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="email" label="邮箱"></el-table-column>
		    <el-table-column prop="email" label="操作">
		    	<template scope="scope">
			        <el-button
			          size="small"
			          @click="updateUser(scope.$index, scope.row)">修改</el-button>
			      </template>
		    </el-table-column>
		</el-table>
	    <el-pagination
	        @size-change="handleSizeChangeUser"
	        @current-change="handleCurrentChangeUser"
	        :current-page="user.curpage"
	        :page-sizes="[5, 10]"
	        :page-size="user.pagesize"
	        layout="total, sizes, prev, pager, next, jumper"
	        :total="user.total">
		</el-pagination>
		<div class="btns">
		    <el-button type="danger" @click="deleteUser">批量删除</el-button>
		    <el-button @click="toggleSelectionUser()">取消选择</el-button>
		</div>
		<el-form v-show='updateFormShow' label-width="100px" class="demo-ruleForm">
		  	<el-form-item label="用户名">
		    	<el-input v-model="updateForm.username" @input='usernameRules()' auto-complete="off"></el-input>
            	<p class="tips" v-show='tipsState.usernameTips'>仅支持8-12位字母、数字、下划线！</p>
		  	</el-form-item>
		  	<el-form-item label="手机号">
		    	<el-input v-model="updateForm.phone" @input='phoneRules()' auto-complete="off"></el-input>
            	<p class="tips" v-show='tipsState.phoneTips'>仅支持中国大陆11位手机号!</p>
		  	</el-form-item>
		  	<el-form-item label="邮箱">
		    	<el-input v-model="updateForm.email" @input='emailRules()'></el-input>
            	<p class="tips" v-show='tipsState.emailTips'>请输入正确的邮箱格式!</p>
		  	</el-form-item>
		  	<el-form-item>
		    	<el-button type="primary" @click="submitForm(updateForm)">提交</el-button>
		    	<el-button @click="resetForm()">重置</el-button>
		    	<el-button @click="cancelUpdate()">取消</el-button>
		  	</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {mapState, mapActions} from "vuex"
	import {ASYNC_GET_USER_BY_PAGE, ASYNC_DEL_USER, ASYNC_UPDATE_USER} from  "./store.js"
	export default {
		name: "user",
		data(){
			return{
				userList: [], //选中的用户
				selectSearchUser: '',  //用户查询类型
				selectSearchUserValue: '',  //用户查询内容
				updateFormShow: false, //修改表单是否显示
				updateForm: {
					username: '',
					phone: '',
					email: ''
				},
 				tipsState: {
 					usernameTips: false,
 					phoneTips: false,
                    emailTips: false
 				},
 				toUpdateObj: {
 					user: true,
 					phone: true,
                    email: true
 				},
 				selectionValue: {}

			}
		},
		created() {
			this[ASYNC_GET_USER_BY_PAGE]()  //初始化用户列表  
		},
		computed: {
			...mapState("user", ["user"])
		},
		methods: {
			...mapActions("user", [ASYNC_GET_USER_BY_PAGE, ASYNC_DEL_USER, ASYNC_UPDATE_USER]),
	        //用户列表每页显示条数变化
			handleSizeChangeUser(val) {
		        var curpage = this.user.curpage;
		        var pagesize = val;
	        	var type = this.selectSearchUser;
	        	var value = this.selectSearchUserValue;
		        this[ASYNC_GET_USER_BY_PAGE]({curpage, pagesize, type, value});
	        },
	        //用户列表页码切换
	        handleCurrentChangeUser(val) {
		        var curpage = val;
		        var pagesize = this.user.pagesize;
	        	var type = this.selectSearchUser;
	        	var value = this.selectSearchUserValue;
		        this[ASYNC_GET_USER_BY_PAGE]({curpage, pagesize, type, value});
	        },
	        //选择/取消选择
		    toggleSelectionUser(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable2.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable2.clearSelection();
		        }
		    },
		    //改变选项时重置userList
	        handleSelectionUserChange(val) {
	        	this.userList = val;
	      	},
	      	//删除用户
	      	delUser(){
	      		var ids = [];
	        	this.userList.forEach((item, index) => {
	        		ids.push(item._id);
	        	});
	        	console.log(ids)
	        	this[ASYNC_DEL_USER]({
	        		ids,
	        		callback: () => {
				        var curpage = this.user.curpage;
				        var pagesize = this.user.pagesize;
			        	var type = this.selectSearchUser;
			        	var value = this.selectSearchUserValue;
				        this[ASYNC_GET_USER_BY_PAGE]({ curpage, pagesize, type, value });
	        		}
	        	 });
	      	},
	      	//确认删除？
	      	deleteUser() {
		        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.delUser();
		        	this.$message({
			            type: 'success',
			            message: '删除成功!'
		          	});
		        }).catch(() => {
		          	this.$message({
			            type: 'info',
			            message: '已取消删除'
		          	});          
		        });
		    },
		    //触发修改
		    updateUser(a, b){
		        this.selectionValue.username = b.username;
		        this.selectionValue.phone = b.phone;
		        this.selectionValue.email = b.email;
		        this.selectionValue._id = b._id;
		        this.updateFormShow = true;
		        this.chooseToUpdate();
		    },
		    //提交update表单
		    submitForm(updateForm){
            	const obj = Object.keys(this.toUpdateObj);
            	for(var i = 0; i < obj.length; i++){
            		if(this.toUpdateObj[obj[i]] === false){
            			this.$message({
				          	message: '请完善信息！',
				          	type: 'warning'
			        	});
            			return
            		}
            	}
            	this[ASYNC_UPDATE_USER]({
            		obj: {
            			username: updateForm.username,
            			phone: updateForm.phone,
            			email: updateForm.email,
            			_id: updateForm._id
            		},
            		callback: ({code, message}) => {
            			if(code !== 0){
            				this.$message.error(message);
            				return;
            			}
            			this.$message({
				          	message,
				          	type: 'success'
			        	});
				        var curpage = this.user.curpage;
				        var pagesize = this.user.pagesize;
			        	var type = this.selectSearchUser;
			        	var value = this.selectSearchUserValue;
		    			this.updateFormShow = false;
				        this[ASYNC_GET_USER_BY_PAGE]({ curpage, pagesize, type, value });
		            }
            	})
		    },
		    //重置表单内容
		    resetForm(){
		        this.chooseToUpdate();
		    },
		    //将updateForm内容改为当前选中行内容
		    chooseToUpdate(){
		        this.updateForm.username = this.selectionValue.username;
		        this.updateForm.phone = this.selectionValue.phone;
		        this.updateForm.email = this.selectionValue.email;
		        this.updateForm._id = this.selectionValue._id;
		    },
		    //修改表单hide
		    cancelUpdate(){
		    	this.updateFormShow = false;
		    },
		    //正则-用户名
        	usernameRules(){
        		const reg = /^[a-zA-Z0-9_]{8,12}$/;
        		if(reg.test(this.updateForm.username)){
        			this.tipsState.usernameTips = false;
        			this.toUpdateObj.user = true;
        			return
        		}
        		this.tipsState.usernameTips = true;
        		this.toUpdateObj.user = true;
        	},
		    //正则-手机号
		    phoneRules(){
                const reg = /^[1]{1}[3,5,7,8,9]{1}[0-9]{9}$/;
                if(reg.test(this.updateForm.phone)){
                    this.tipsState.phoneTips = false;
                    this.toUpdateObj.phone = true;
                    return
                }
                this.tipsState.phoneTips = true;
                this.toUpdateObj.phone = true;
            },
		    //正则-邮箱
            emailRules(){
                const reg = /^[0-9a-zA-Z_]+@{1}[0-9a-zA-Z_]+\.{1}[a-zA-Z]{2,3}$/;
                if(reg.test(this.updateForm.email)){
                    this.tipsState.emailTips = false;
                    this.toUpdateObj.email = true;
                    return
                }
                this.tipsState.emailTips = true;
                this.toUpdateObj.email = true;
            },
	      	//条件查询
	        searchUser(){
		        var curpage = 1;
		        var pagesize = this.user.pagesize;
	        	var type = this.selectSearchUser;
	        	var value = this.selectSearchUserValue;
		        this[ASYNC_GET_USER_BY_PAGE]({curpage, pagesize, type, value});
	        }
		}
	}
</script>
<style>
	h2{
		text-align: center;
		color: #324057;
		height: 60px;
		line-height: 60px;
		background-color: #E5E9F2; 
		border: 1px solid #D3DCE6;
	}
	.tabBox{
		margin-bottom: 40px;
	}
	.searchBox{
		width: 44%;
	}
	.searchSel{
		width: 120px;
	}
	.demo-ruleForm{
		width: 50%;
		padding: 50px 30px 30px;
		border: 1px solid #dfe6ec;
		border-radius: 6px;
		background-color: #fff;
		position: absolute;
		top: 20%;
		left: 20%;
		z-index: 10;
	}
    .tips{
    	color: red;
    }
</style>
