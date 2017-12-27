<template>
    <div>
        <div>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i>增加影院</el-breadcrumb-item>
                    <el-breadcrumb-item>电影院线管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="margin: 20px;"></div>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="影院名称:" prop="name">
                    <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院地址:" prop="add">
                    <el-input type="text" v-model="ruleForm2.add" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式:" prop="tel">
                    <el-input type="text" v-model="ruleForm2.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网站:" prop="url">
                    <el-input type="text" v-model="ruleForm2.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    <el-button @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
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
        USER_NAME
    } from "../cinemaList/store.js"
    export default {
        data() {
            var checkname = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('影院名称不能为空'));
                } else {
                    callback();
                }
            };
            var checktel = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('联系方式不能为空'));
                } else {
                    callback();
                }
            };
            var checkadd = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('地址不能为空'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'right',
                ruleForm2: {
                    name: '',
                    add: '',
                    tel: '',
                    url: ''
                },

                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                formLabelAlign: {
                    name: '',
                    add: '',
                    tel: '',
                    url: ''
                },
                rules2: {
                    tel: [{
                        validator: checktel,
                        trigger: 'blur'
                    }],
                    add: [{
                        validator: checkadd,
                        trigger: 'blur'
                    }],
                    name: [{
                        validator: checkname,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            ...mapActions("cinemaList", [USER_NAME]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this[USER_NAME]({
                            cinema: this.ruleForm2.name,
                            add: this.ruleForm2.add,
                            tel: this.ruleForm2.tel,
                            url: this.ruleForm2.url,
                        });
                        this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log('111');
                this.$refs[formName].resetFields();
            },
            back() {
                console.log('error submit!!');
                router.push(`/info/movie_screen/cinemaList`)
            }
        }
    }
</script>
<style>
    .el-input {
        width: 300px;
    }
</style>
