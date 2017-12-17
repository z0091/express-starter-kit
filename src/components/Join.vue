<template>
    <el-form
            id="joinForm"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="220px"
            class="">
        <el-form-item label="Login" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm password" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    username: '',
                    password: '',
                    checkPass: '',
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: 'Login is required',
                            trigger: 'blur'
                        },
                    ],
                    username: [
                        {
                            required: true,
                            message: 'Username is required',
                            trigger: 'blur'
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: 'Password is required',
                            trigger: 'blur'
                        },
                    ],
                    checkPass: [
                        {
                            required: true,
                            message: 'Please input the password again',
                            trigger: 'blur'
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (value !== this.ruleForm.password) {
                                    callback(new Error('Two inputs don\'t match!'));
                                } else {
                                    callback();
                                }
                            }
                        },
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style lang="scss" scoped>
    #joinForm {
        margin: 0 auto;
        width: 500px;
    }
</style>
