<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :ref="fromConfig.ref" :label-position="fromConfig.position" :model="fromObj"
        :label-width="fromConfig.width + 'px'">
        <el-form-item v-for="(item, index) in fromProp" :key="index" :label="item.label" :prop="item.model">
          <el-input v-if="item.type == 'input'" v-model="fromObj[item.model]" :placeholder="item.placeholder"
            :disabled="item.disabled"></el-input>
          <el-select v-else-if="item.type == 'select'" v-model="fromObj[item.model]" :placeholder="item.placeholder"
            :disabled="item.disabled">
            <el-option v-for="(i, index) in item.options" :key="index" :label="i.label" :value="i.value"></el-option>
          </el-select>
          <el-time-picker v-else-if="item.type == 'data'" v-model="fromObj[item.model]" :placeholder="item.placeholder"
            :disabled="item.disabled" style="width: 40%;"></el-time-picker>
          <el-checkbox-group v-else-if="item.type == 'checkbox'" v-model="fromObj[item.model]" :disabled="item.disabled">
            <el-checkbox v-for="(i, index) in item.checkboxs" :key="index" :label="i.label"
              :value="i.value"></el-checkbox>
          </el-checkbox-group>

          <el-radio-group v-else-if="item.type == 'radio'" v-model="fromObj[item.model]" :disabled="item.disabled">
            <el-radio v-for="(i, index) in item.radios" :key="index" :label="i.label"></el-radio>
          </el-radio-group>

          <el-switch v-else-if="item.type == 'switch'" v-model="fromObj[item.model]"
            :disabled="item.disabled"></el-switch>


          <!-- <el-upload
                v-else-if="item.type == 'upload'"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
        </el-form-item>

        <el-form-item v-if="this.isAdd">
          <el-button @click="onReset(fromConfig.ref)">重置</el-button>
          <el-button :loading="loading" type="primary" @click="onSubmit(fromConfig.ref)">立即创建</el-button>
        </el-form-item>

        <el-form-item v-else-if="!this.isAdd">
          <el-button @click="onCancel(fromConfig.ref)">取消</el-button>
          <el-button :loading="loading" type="primary" @click="onUpData(fromConfig.ref)">保存</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tableDialog",
  props: {
    fromConfig: {
      type: Object,
      default: function () {
        return {
          ref: 'ruleForm',
          position: 'left',
          width: '80'
        }
      }
    },
    fromObj: {
      type: Object
    },
    fromProp: Array
  },
  data() {
    return {
      dialogTitle: "",
      dialogFormVisible: false,
      loading:false,
      isAdd:false,
    };
  },
  created() { },
  computed: {},
  watch: {
    fromObj: {
      handler: function (val) {
        // 将form实例返回到父级
        this.$emit('updateRef', val)
      },
      deep: true // 深度监听
    },
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
      console.log(this.dialogTitle);
      if(this.dialogTitle == '添加用户'){
        this.isAdd = true
      }else{
        this.isAdd = false
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.loading = true;
            setTimeout(()=>{
              this.loading = false;
              this.dialogFormVisible = false;
              this.$API.order.addOrder(this.$props.fromObj).then((res)=>{
                  console.log('7.添加用户返回结果',res);
                  this.$refs[formName].resetFields()
              })
            },500)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onUpData(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.loading = true;
            setTimeout(()=>{
              this.loading = false;
              this.dialogFormVisible = false;
              this.$API.order.upDataOrder(this.$props.fromObj).then((res)=>{
                  console.log('8.更新用户返回结果',res);
                  this.$refs[formName].resetFields()
              })
            },500)
        } else {
          console.log('error upData!!');
          return false;
        }
      });
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
    },
    onCancel(formName){
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false;
    }
  },
};
</script>
<style lang="scss" scoped></style>
  