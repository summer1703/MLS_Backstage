<template>
    <div class="login-wrap">
        <div class="ms-title">喵老师后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="管理员账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="logn-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="reg-btn">
                    <el-button type="primary" @click="reg">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import axios from "../../lib";
    import router from "../../router/index.js";
    export default {
        data: function() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            //            this.getEmpByPage()
        },
        methods: {
            submitForm() {
                this.toLogin(this.ruleForm.username, this.ruleForm.password)
                //                router.push(`/info`)
            },
            reg() {
                router.push(`/reg`)
            },
            async toLogin(username, password){
                const { data } = await axios.post("/managers/login", {
                    username,
                    password
                })
                if(data.code != 0){
                    this.$message.error(data.message);
                }else{
                    this.$message({
                        type: 'success',
                        message: '登陆成功，即将跳转至主页面！'
                    });
                    setTimeout(() => {
                        router.push('/info')
                    }, 2000);
                }
            }
        }
    }
</script>
<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
    }
    .developer {
        position: absolute;
        left: 33%;
        bottom: 10%;
    }
    .developer>span {
        color: #fff
    }
    .logn-btn,
    .reg-btn {
        display: inline-block;
        width: 60px;
    }
    .reg-btn {
        margin-right: 0;
    }
    .logn-btn {
        margin-right: 50px;
        margin-left: 50px;
    }
</style>
