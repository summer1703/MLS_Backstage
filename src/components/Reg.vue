<template>
    <div class="warp">
        <el-form :label-position="left" 
            :model="ruleForm" 
            :rules="rules" 
            ref="ruleForm" 
            label-width="70px"
            class="demo-ruleForm form">
            <h3 class="h3">管理员注册</h3>
            <el-form-item label="用户名：" prop="user">
                <el-input type="text" v-model="ruleForm.user" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密　码：" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-button class="button" type="danger" @click="submitForm('ruleForm')">注 册</el-button>
        </el-form>
    </div>
</template>
<script>
    import axios from "../lib";
    import router from "../router/index.js"
    export default {
        data() {
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入注册用户名'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                left: 'left',
                ruleForm: {
                    user: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    user: [{
                        validator: validateUser,
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            async reg(){
                const { data } = await axios.post("/managers/add", {
                    "username": this.ruleForm.user,
                    "password": this.ruleForm.pass
                })
                if(data.code != 0){
                    this.$message({
                        type: 'warning',
                        message: data.message
                    });
                }else{
                    this.$message({
                        type: 'success',
                        message: '注册成功，即将跳转登录页面！'
                    });
                    setTimeout(() => {
                        router.push('/')
                    }, 2000);
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.reg()
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .wrap {
        overflow: hidden;
        height: 100%;
        background: rgba(214, 214, 214, 0.4);
    }
    .form {
        width: 300px;
        margin: 10% auto;
        padding: 40px 50px;
        border-radius: 5px;
        box-shadow: 0 0 25px #cac6c6;
        background: rgba(248, 250, 249, 0.8);
    }
    .h3 {
        width: 80px;
        margin: 0 auto 40px;
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        color: #979797;
    }
    .button {
        width: 100%;
        margin-top: 20px;
        font-weight: 700;
        font-size: 16px;
    }
</style>
