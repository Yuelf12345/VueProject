<template>
    <div>
    <publicTable></publicTable>

        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
            label="年龄"
            prop="age">
            <el-input v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        </el-form-item>
    </el-form>
    </div>
    
</template>

<script>
import publicTable from '@/components/publicTable.vue';
export default {
    components:{publicTable},
    data() {
      return {
        numberValidateForm: {
          age: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.numberValidateForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>
<style lang="scss" scoped></style>
