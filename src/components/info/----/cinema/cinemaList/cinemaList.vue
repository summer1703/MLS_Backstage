<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>影院列表</el-breadcrumb-item>
                <el-breadcrumb-item>电影院线管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="primary" size="small" @click="add">增加</el-button>
        <div style="margin-top: 15px;" class="search" >
            <el-input placeholder="请输入内容"  v-model="input5">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="电影院名称" value="1"></el-option>
                    <el-option label="影院地址" value="2"></el-option>
                    <el-option label="联系方式" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="search"></el-button>
            </el-input>
        </div>
        <el-table :data="hotM.rows"
            border
            style="width: 100%"
            max-height="250" stripe>
            <el-table-column fixed
                prop="cinema"
                label="影院名称"
                width="200"
                align="center">
            </el-table-column>
            <el-table-column prop="add"
                label="影院地址"
                width="300"
                align="center">
            </el-table-column>
            <el-table-column prop="tel"
                label="影院联系方式"
                width="200"
                align="center">
            </el-table-column>
            <el-table-column prop="url"
                label="影院网站"
                width="200"
                align="center">
            </el-table-column>
            <el-table-column fixed="right"
                label="操作"
                width="120"
                align="center">
                <template scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)"
                        type="text"
                        size="small">
                        修改
                    </el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, hotM.rows)"
                        type="text"
                        size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="hotM.curpage" 
            :page-sizes="[10, 15, 20, 50]" 
            :page-size="hotM.eachpage" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="hotM.total">
        </el-pagination>
        <el-dialog title="影院信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="影院ID:" :label-width="formLabelWidth">
                    <el-input v-model="form._id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院名字:" :label-width="formLabelWidth">
                    <el-input v-model="form.cinema" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院地址:" :label-width="formLabelWidth">
                    <el-input v-model="form.add" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式:" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院网站:" :label-width="formLabelWidth">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditTrue">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import router from "../../../../../router/index.js"
    import {
        mapState,
        mapActions,
        mapMutations
    } from "vuex"
    import {
        ASYNC_GET_EMP_BY_PAGE,
        GET_EMP_BY_PAGE,
        ASYNC_DEL_EMP_BY_PAGE,
        USER_NAME_UPDATE,
        SEARCH
    } from "./store.js"
    export default {
        data() {
            return {
                input5: '',
                select: '',
                dialogFormVisible: false,
                formLabelWidth: '80px',
                form: {},
                value6: '',
                currentPage3: 1
            }
        },
        created() {
            this[ASYNC_GET_EMP_BY_PAGE]()
            //            console.log(this.$store.state.stu)
        },
        computed: {
            ...mapState("cinemaList", ["hotM"])
        },
        methods: {
            ...mapActions("cinemaList", ["ASYNC_GET_EMP_BY_PAGE", "ASYNC_DEL_EMP_BY_PAGE", "USER_NAME_UPDATE", "SEARCH"]),
            add() {
                router.push(`/info/movie_screen/addCinema`)
            },
            deleteRow(index, rows) {
                console.log(index);
                console.log(rows);
                var deletData = rows.splice(index, 1)[0];
                console.log(deletData);
                this[ASYNC_DEL_EMP_BY_PAGE](deletData._id)
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.form = row;
                console.log(this.form);
                this.dialogFormVisible = true
            },
            handleEditTrue() {
                this[USER_NAME_UPDATE]({
                    _id: this.form._id,
                    cinema: this.form.name,
                    add: this.form.add,
                    tel: this.form.tel,
                    url: this.form.url,
                });
                this.dialogFormVisible = false
            },
            handleSizeChange(val) {
                this[ASYNC_GET_EMP_BY_PAGE]({
                    page: this.$store.state.stu.hotM.curPage,
                    rows: val
                })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this[ASYNC_GET_EMP_BY_PAGE]({
                    page: val,
                    rows: this.$store.state.stu.hotM.eachPage
                })
            },
            search() {
                const searchData = {}
                switch (this.select) {
                    case "1":
                        searchData.cinema = this.input5
                        break
                    case "2":
                        searchData.add = this.input5
                        break
                    case "3":
                        searchData.tel = this.input5
                        break
                }
                this[SEARCH](searchData)
                this.input5 = "";
            }
        }
    }
</script>
<style scoped>
    .search {
        display: inline-block;
        width: 700px;
    }
    .el-select {
        width: 120px;
    }
    .el-input-group {
        width: 500px
    }
    .el-table--fit {
        margin: 20px 0;
    }
</style>
