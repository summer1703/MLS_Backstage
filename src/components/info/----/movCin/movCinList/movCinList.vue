<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/"></el-breadcrumb>
			<div class="tabBox">
				<h2>影片状态</h2>
				<div class='searchBox'>
					<el-input placeholder="请输入关键字查询" v-model="selectSearchMovValue">
					    <el-select class='searchSel' v-model="selectSearchMov" slot="prepend" placeholder="请选择">
					        <el-option label="影片名" value="movieName"></el-option>
					        <el-option label="演员" value="actor"></el-option>
					        <el-option label="类型" value="type"></el-option>
					    </el-select>
					    <el-button slot="append" icon="search" @click='searchMovie'></el-button>
				    </el-input>
				</div>
				<el-table ref="multipleTable1" :data="movies.rows" border
				    tooltip-effect="dark"
				    style="width: 100%" @selection-change="handleSelectionMovChange">
				    <el-table-column type="selection"></el-table-column>
				    <el-table-column label="影片名" prop='movieName'></el-table-column>
				    <el-table-column prop="englishName" label="英文名"></el-table-column>
				    <el-table-column prop="actor" label="主要演员"></el-table-column>
				    <el-table-column prop="type" label="类型"></el-table-column>
				    <el-table-column prop="canMatch" label="是否可排片"></el-table-column>
				</el-table>
			    <el-pagination
			        @size-change="handleSizeChangeMov"
			        @current-change="handleCurrentChangeMov"
			        :current-page="movies.curpage"
			        :page-sizes="[5, 10]"
			        :page-size="movies.eachpage"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="movies.total">
				</el-pagination>
				<div class="btns">
				    <el-button type="primary" @click="addMovCanMatch">批量添加可排片状态</el-button>
				    <el-button :plain="true"  @click="remMovCanMatch" type="danger">批量删除可排片状态</el-button>
				    <el-button @click="toggleSelectionMov()">取消选择</el-button>
				</div>
			</div>
			<div class="tabBox">
				<h2>影院状态</h2>
				<div class='searchBox'>
					<el-input placeholder="请输入关键字查询" v-model="selectSearchCinValue">
					    <el-select class='searchSel' v-model="selectSearchCin" slot="prepend" placeholder="请选择">
					        <el-option label="影院名" value="cinema"></el-option>
					        <el-option label="地址" value="add"></el-option>
					        <el-option label="电话" value="tel"></el-option>
					    </el-select>
					    <el-button slot="append" icon="search" @click='searchCinema'></el-button>
				    </el-input>
				</div>
				<el-table ref="multipleTable2" :data="cinemas.rows" border
				    tooltip-effect="dark"
				    style="width: 100%" @selection-change="handleSelectionCinChange">
				    <el-table-column type="selection"></el-table-column>
				    <el-table-column label="影院名" prop='cinema'></el-table-column>
				    <el-table-column prop="add" label="地址"></el-table-column>
				    <el-table-column prop="tel" label="电话"></el-table-column>
				    <el-table-column prop="canMatch" label="是否可排片"></el-table-column>
				</el-table>
			    <el-pagination
			        @size-change="handleSizeChangeCin"
			        @current-change="handleCurrentChangeCin"
			        :current-page="cinemas.curpage"
			        :page-sizes="[5, 10]"
			        :page-size="cinemas.eachpage"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="cinemas.total">
				</el-pagination>
				<div class="btns">
				    <el-button type="primary" @click="addCinCanMatch">批量添加可排片状态</el-button>
				    <el-button :plain="true"  @click="remCinCanMatch" type="danger">批量删除可排片状态</el-button>
				    <el-button @click="toggleSelectionCin()">取消选择</el-button>
				</div>
			</div>
			<div class="tabBox">
				<h2>已排片场次</h2>
				<div class='searchBox'>
					<el-input placeholder="请输入关键字查询" v-model="selectSearchSCValue">
					    <el-select class='searchSel' v-model="selectSearchSC" slot="prepend" placeholder="请选择">
					        <el-option label="影片名" value="movieName"></el-option>
					        <el-option label="影院名" value="cinemaName"></el-option>
					    </el-select>
					    <el-button slot="append" icon="search" @click='searchSC'></el-button>
				    </el-input>
				</div>
				<el-table ref="multipleTable3" :data="scrCins.rows" border
				    tooltip-effect="dark"
				    style="width: 100%" @selection-change="handleSelectionSCChange">
				    <el-table-column type="selection"></el-table-column>
					<el-table-column prop="movieName" label="影片"></el-table-column>
					<el-table-column prop="cinemaName" label="影院"></el-table-column>
					<el-table-column prop="scrRoomName" label="放映厅"></el-table-column>
					<el-table-column prop="playTime" label="放映时间"></el-table-column>
					<el-table-column prop="price" label="票价"></el-table-column>
				</el-table>
			    <el-pagination
			        @size-change="handleSizeChangeSC"
			        @current-change="handleCurrentChangeSC"
			        :current-page="scrCins.curpage"
			        :page-sizes="[5, 10]"
			        :page-size="scrCins.eachpage"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="scrCins.total">
				</el-pagination>
				<div class="btns">
				    <el-button :plain="true"  @click="removeSC" type="danger">批量删除排片场次</el-button>
				    <el-button @click="toggleSelectionSC()">取消选择</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import {ASYNC_GET_MOVIE_BY_PAGE, ASYNC_GET_CINEMA_BY_PAGE, ASYNC_CANMATCH_MOVIE, ASYNC_CANMATCH_CINEMA, ASYNC_GET_SCRCIN_BY_PAGE, ASYNC_DEL_SCRCIN} from  "./store.js"
export default {
	name: "movcinlist",
	data(){
		return{
			movieList: [], //选中的影片
			cinemaList: [],  //选中的影院
			removeSCList: [],
			selectSearchMov: '',  //影片查询类型
			selectSearchMovValue: '',  //影片查询内容
			selectSearchCin: '',  //影院查询类型
			selectSearchCinValue: '',  //影院查询内容
			selectSearchSC: '',  //影院查询类型
			selectSearchSCValue: ''  //影院查询内容
		}
	},
	created() {
		this[ASYNC_GET_MOVIE_BY_PAGE]()  //初始化影片信息  
		this[ASYNC_GET_CINEMA_BY_PAGE]()  //初始化影院信息 
		this[ASYNC_GET_SCRCIN_BY_PAGE]()  //初始化场次信息
	},
	computed: {
		...mapState("movCinList", ["movies", "cinemas", "scrCins"])
	},
	methods: {
		...mapActions("movCinList", [ASYNC_GET_MOVIE_BY_PAGE, ASYNC_GET_CINEMA_BY_PAGE, ASYNC_CANMATCH_MOVIE, ASYNC_CANMATCH_CINEMA, ASYNC_GET_SCRCIN_BY_PAGE, ASYNC_DEL_SCRCIN]),
		//影片列表每页显示条数变化
		handleSizeChangeMov(val) {
	        var curpage = this.movies.curpage;
	        var eachpage = val;
        	const searchObj = {};
        	searchObj[`${this.selectSearchMov}`] = this.selectSearchMovValue
	        this[ASYNC_GET_MOVIE_BY_PAGE]({curpage, eachpage, searchObj})
        },
        //影片列表页码切换
        handleCurrentChangeMov(val) {
	        var curpage = val;
	        var eachpage = this.movies.eachpage;
        	const searchObj = {};
        	searchObj[`${this.selectSearchMov}`] = this.selectSearchMovValue
	        this[ASYNC_GET_MOVIE_BY_PAGE]({curpage, eachpage, searchObj})
        },
        //影院列表每页显示条数变化
		handleSizeChangeCin(val) {
	        var curpage = this.movies.curpage;
	        var eachpage = val;
	        this[ASYNC_GET_CINEMA_BY_PAGE]({curpage, eachpage})
        },
        //影院列表页码切换
        handleCurrentChangeCin(val) {
	        var curpage = val;
	        var eachpage = this.movies.eachpage;
	        this[ASYNC_GET_CINEMA_BY_PAGE]({curpage, eachpage})
        },
        toggleSelectionMov(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable1.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable1.clearSelection();
	        }
	    },
	    toggleSelectionCin(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable2.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable2.clearSelection();
	        }
	    },
	    toggleSelectionSC(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable3.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable3.clearSelection();
	        }
	    },
        handleSelectionMovChange(val) {
        	this.movieList = val;
      	},
        handleSelectionCinChange(val) {
        	this.cinemaList = val;
      	},
        handleSelectionSCChange(val) {
        	this.removeSCList = val;
      	},
      	addMovCanMatch(){
        	console.log('测试选择项22222',this.movieList)
        	this.movieList.forEach((item, index) => {
        		console.log(item._id)
        		var id = item._id;
        		var str = 'true'
        		this[ASYNC_CANMATCH_MOVIE]({id, str})
        	})
	        var curpage = this.movies.curpage;
	        var eachpage = this.movies.eachpage;
	        this[ASYNC_GET_MOVIE_BY_PAGE]({curpage, eachpage})
      	},
      	remMovCanMatch(){
        	this.movieList.forEach((item, index) => {
        		console.log(item._id)
        		var id = item._id;
        		var str = 'false'
        		this[ASYNC_CANMATCH_MOVIE]({id, str})
        	})
	        var curpage = this.movies.curpage;
	        var eachpage = this.movies.eachpage;
	        this[ASYNC_GET_MOVIE_BY_PAGE]({curpage, eachpage})
      	},
      	addCinCanMatch(){
        	this.cinemaList.forEach((item, index) => {
        		console.log(item._id)
        		var id = item._id;
        		var str = 'true'
        		this[ASYNC_CANMATCH_CINEMA]({id, str})
        	})
	        var curpage = this.cinemas.curpage;
	        var eachpage = this.cinemas.eachpage;
	        this[ASYNC_GET_CINEMA_BY_PAGE]({curpage, eachpage})
      	},
      	remCinCanMatch(){
        	this.cinemaList.forEach((item, index) => {
        		console.log(item._id)
        		var id = item._id;
        		var str = 'false'
        		this[ASYNC_CANMATCH_CINEMA]({id, str})
        	})
	        var curpage = this.cinemas.curpage;
	        var eachpage = this.cinemas.eachpage;
	        this[ASYNC_GET_CINEMA_BY_PAGE]({curpage, eachpage})
      	},
		handleSizeChangeSC(val) {
			console.log('排片信息页码')
	        var curpage = this.scrCins.curpage;
	        var eachpage = val;
	        this[ASYNC_GET_SCRCIN_BY_PAGE]({curpage, eachpage})
        },
        handleCurrentChangeSC(val) {
			console.log('排片信息翻页')
	        var curpage = val;
	        var eachpage = this.scrCins.eachpage;
	        this[ASYNC_GET_SCRCIN_BY_PAGE]({curpage, eachpage})
        },
        searchMovie(){
        	const searchObj = {};
        	searchObj[`${this.selectSearchMov}`] = this.selectSearchMovValue
	        this[ASYNC_GET_MOVIE_BY_PAGE]({ searchObj })
        },
        searchCinema(){
        	const searchObj = {};
        	searchObj[`${this.selectSearchCin}`] = this.selectSearchCinValue
	        this[ASYNC_GET_CINEMA_BY_PAGE]({ searchObj })
        },
        searchSC(){
        	const searchObj = {};
        	searchObj[`${this.selectSearchSC}`] = this.selectSearchSCValue
	        this[ASYNC_GET_SCRCIN_BY_PAGE]({ searchObj })
        },
        removeSC(){
        	console.log('测试选择项22222',this.removeSCList)
        	this.removeSCList.forEach((item, index) => {
        		var id = item._id
        		this[ASYNC_DEL_SCRCIN]({ id })
        	})
	        var curpage = this.scrCins.curpage;
	        var eachpage = this.scrCins.eachpage;
	        this[ASYNC_GET_SCRCIN_BY_PAGE]({curpage, eachpage})
        }
	}
}
</script>
<style scoped>
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
</style>
