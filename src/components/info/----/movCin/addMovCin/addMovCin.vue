<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/"></el-breadcrumb>
            <el-form ref="form" :model="form" label-width="100px">
            	<el-form-item label="选择影片">
            	    <el-select @visible-change='inputChange' 
                        class='selBox' 
                        v-model="form.movId" 
                        placeholder="请选择影片" >
                        <el-input placeholder="请输入影片名关键字查询" 
                            icon="search" 
                            v-model="seaMovName" 
                            :on-icon-click="searchMov">
                        </el-input>
                		<el-option v-for="item in movies.rows" 
                            :key="item._id" 
                            :label="item.movieName" 
                            :value="item._id"  
                            ref='movName' 
                            _name='scope.row'>
                		</el-option>
                        <el-pagination
                            @current-change="handleCurrentChangeMov"
                            :current-page="movies.curpage"
                            :page-size='movies.eachpage'
                            layout=" total, prev, pager, next, jumper"
                            :total="movies.total">
                        </el-pagination>
            		</el-select>
            	</el-form-item>
                <el-form-item label="选择影院">
                    <el-select @visible-change='inputChange' 
                        @change='getScrRoom' 
                        class='selBox'  
                        v-model="form.cinId" 
                        placeholder="请选择影院">
                        <el-input placeholder="请输入影院名关键字查询" 
                            icon="search" 
                            v-model="seaCinName" 
                            :on-icon-click="searchCin">
                        </el-input>
                        <el-option
                            v-for="item in cinemas.rows"
                            :key="item._id"
                            :label="item.cinema"
                            :value="item._id">
                        </el-option>
                        <el-pagination
                            @current-change="handleCurrentChangeCin"
                            :current-page="cinemas.curpage"
                            :page-size='cinemas.eachpage'
                            layout="total, prev, pager, next, jumper"
                            :total="cinemas.total">
                        </el-pagination>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择放映厅">
                    <el-select class='selBox' 
                        @visible-change='inputChange' 
                        v-model="form.scrRoomId" 
                        placeholder="请选择放映厅">
                        <el-option
                            v-for="item in scrRooms"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="票价">
                    <el-input @focus='inputChange' class='inp' v-model="form.price"></el-input>元
                </el-form-item>
            	<el-form-item label="放映时间">
            		<el-col :span="12">
            			<el-date-picker type="date" 
                            @change='inputChange' 
                            placeholder="选择日期" 
                            v-model="form.day" 
                            style="width: 90%;">
                        </el-date-picker>
            		</el-col>
            		<el-col :span="12">
            			<el-time-picker type="fixed-time" 
                            @change='inputChange' 
                            placeholder="选择时间" 
                            v-model="form.time" 
                            style="width: 90%;">
                        </el-time-picker>
            		</el-col>
            	</el-form-item>
            	<el-form-item>
            		<el-button type="primary" @click="onSubmit">确认排片</el-button>
            		<el-button @click='cancel'>取消</el-button>
            	</el-form-item>
            </el-form>
            <div class='tipsBox'>
                <div :class='isErr'>
                    <el-alert
                        title="排片失败"
                        type="error"
                        description="请完善排片信息！"
                        show-icon :closable='false'>
                    </el-alert>
                </div>
                <div :class='isSuc'>
                    <el-alert
                        title="排片成功"
                        type="success"
                        description="可至排片列表页面查看！"
                        show-icon :closable='false'>
                    </el-alert>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from "vuex"
    import {ASYNC_GET_MOVIE_BY_PAGE, ASYNC_GET_CINEMA_BY_PAGE, ASYNC_GET_SCRROOM_BY_PAGE, ASYNC_ADD_SCRCIN} from  "./store.js"
    export default {
    	name: "movcinlist",
        data() {
            return {
                form: {
                    movId: '',
                    cinId: '',
                    scrRoomId: '',
                    price: '',
                    day: '',
                    time: ''
                },
                isSuc: 'tipsHid',
                isErr: 'tipsHid',
                seaMovName: '',
                seaCinName: ''
            }
        },
    	created() {
    		this[ASYNC_GET_MOVIE_BY_PAGE]()
            this[ASYNC_GET_CINEMA_BY_PAGE]()
            this[ASYNC_GET_SCRROOM_BY_PAGE]()
    	},
    	computed: {
    		...mapState("addMovCin", ["movies", "cinemas", "scrRooms"])
    	},
    	methods: {
    		...mapActions("addMovCin", [ASYNC_GET_MOVIE_BY_PAGE, ASYNC_GET_CINEMA_BY_PAGE, ASYNC_GET_SCRROOM_BY_PAGE, ASYNC_ADD_SCRCIN]),
    		handleSizeChangeMov(val) {
    	        var curpage = this.movies.curpage;
    	        var eachpage = val;
    	        this[ASYNC_GET_MOVIE_BY_PAGE]({curpage, eachpage})
            },
            handleCurrentChangeMov(val) {
    	        var curpage = val;
    	        var eachpage = this.movies.eachpage;
    	        this[ASYNC_GET_MOVIE_BY_PAGE]({curpage, eachpage})
            },
            handleCurrentChangeCin(val) {
    	        var curpage = val;
    	        var eachpage = this.movies.eachpage;
    	        this[ASYNC_GET_CINEMA_BY_PAGE]({curpage, eachpage})
            },
            onSubmit(){
                for(let key in this.form){
                    if(this.form[key] == ''){
                        this.isErr = '';
                        return
                    }
                }
                const obj = {
                    movId: this.form.movId,
                    cinId: this.form.cinId,
                    scrRoomId: this.form.scrRoomId,
                    playTime: `${this.form.day.toLocaleDateString()} ${this.form.time.toLocaleTimeString()}`,
                    price: this.form.price
                }
                this.movies.rows.forEach((item) => {
                    if(item._id == this.form.movId){
                        obj.movieName = item.movieName
                    }
                })
                this.cinemas.rows.forEach((item) => {
                    if(item._id == this.form.cinId){
                        obj.cinemaName = item.cinema
                    }
                })
                this.scrRooms.forEach((item) => {
                    if(item._id == this.form.scrRoomId){
                        obj.scrRoomName = item.name
                    }
                })
                this[ASYNC_ADD_SCRCIN]({ obj })
                this.isErr = 'tipsHid';
                this.isSuc = '';
                setTimeout(this.clearFormInp, 2000)
            },
            getScrRoom(){
                var cinId = this.form.cinId;
                this.form.scrRoomId = '';
                if(cinId != ''){
                    this[ASYNC_GET_SCRROOM_BY_PAGE]({ cinId })
                    return
                }
                return false
            },
            inputChange(){
                console.log(this.isSuc, this.isErr)
                this.isErr = 'tipsHid';
                this.isSuc = 'tipsHid';
            },
            cancel(){
                this.clearFormInp()
            },
            searchMov(){
                const movieName = this.seaMovName
                this[ASYNC_GET_MOVIE_BY_PAGE]({ movieName })
            },
            searchCin(){
                const cinema = this.seaCinName
                this[ASYNC_GET_CINEMA_BY_PAGE]({ cinema })
            },
            clearFormInp(){
                for(let key in this.form){
                    this.form[key] = '';
                }
            }
    	}
    }
</script>
<style scoped>
.selBox {
    width: 45%;
}
.inp{
    width: 45%;
    margin-right: 10px;
}
.tipsBox{
    width: 45%;
    margin: 0 auto;
}
.tipsHid{
    display: none;
}
</style>