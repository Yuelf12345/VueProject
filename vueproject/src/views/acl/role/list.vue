<template>
    <div> 
      <publicTable2
      v-bind="da"
      @getList="getList"
      @pageChange = "pageChange"

      @btnEdit="editClick"
      @btnRemove="deleteOneClick"
      />

      <tableDialog 
      v-bind="dialog"
         ref="diaLog"
      />
    </div>
</template>
<script>
import publicTable2 from '@/components/publicTable2.vue';
import tableDialog from '@/components/tableDialog.vue';


// import getData from '@/utils/data'


export default {
   components:{publicTable2,tableDialog},
   data() {
      return {
         da:{
            page: {//页数
               currentPage: 1,
               pageSize: 4,
            },
            tableConfig:{
                  select:true,
                  index:true,
                  border:true,
                  paging: true,
                  handle:true,
                  buttonAffairs:[{
                     name:"编辑",
                     icon:"el-icon-plus",
                     type:"primary",
                     affairs: "Edit",
                  },{
                     name: "删除",
                     icon: "el-icon-delete",
                     type: "danger",
                     affairs: "Remove",
                  }]},
            tableData:[],
            tableTotal: 0,
            tableProp:[{prop:'FO_Num',label:'工厂订单编号',type:"text"},
                     {prop:'O_Num',label:'订单编号',type:"text"},
                     {prop:'O_Status',label:'订单状态',type:"tag"},
                     {prop:'P_Progress',label:'生产进度',type:"progress"},
                     {prop:'C_Emission',label:'当前碳排量',type:"text"},
                     {prop:'C_Open',label:'工序状态',type:"switch"},
                     {prop:'S_Avatar',label:'图片',type:"img"}]
            },
         dialog:{
            fromConfig:{
               ref:'ruleForm',
               position:'left',
               width:'100'
            },
            fromObj:{
               FO_Num:'',
               O_Num:'',
               O_Status:'',
               P_Workers:[],
               P_Equipment:[],
               C_Open:false
            },
            fromProp:[{
               type:'input',
               model:'FO_Num',
               label:'工厂订单编号',
               placeholder:'请输入',
               disabled:false
            },
            {
               type:'input',
               model:'O_Num',
               label:'订单编号',
               placeholder:'请输入',
               disabled:false
            },
            {
               type:'select',
               model:'O_Status',
               label:'订单状态',
               placeholder:'请选择',
               disabled:false,
               options:[{label:'未开始',value:'未开始'},{label:'进行中',value:'进行中'}]
            },
            {
               type:'checkbox',
               model:'P_Workers',
               label:'生产工人',
               placeholder:'请选择',
               disabled:false,
               checkboxs:[{label:'张三',value:'张三'},{label:'李四',value:'李四'},{label:'王五',value:'王五'}]
            },
            {
               type:'checkbox',
               model:'P_Equipment',
               label:'生产设备',
               placeholder:'请选择',
               disabled:false,
               checkboxs:[{label:'染色机',value:'染色机'},{label:'织机',value:'织机'},{label:'加捻机',value:'加捻机'}]
            },
            {
               type:'switch',
               model:'C_Open',
               label:'工序状态',
               placeholder:'请选择',
               disabled:false,
            }]
         }
      }  
   },
   created(){
      this.getList();
   },
   mounted(){
      
    },
   computed:{
   },
   methods:{
      rowOperation($index,row) {
				console.log($index,row)
			},
      async getList(){
         const {currentPage, pageSize} =  this.da.page
         const result = await this.$API.user.getPageList(currentPage, pageSize);
         console.log('5.后端返回的数据列表',result.data.dataList);
         this.da.tableData = result.data.dataList
         this.da.tableTotal = result.data.total;
      },
      // 页数
      pageChange(searchForm){
         console.log(searchForm);
         this.da.page.currentPage = searchForm.currentPage
         this.da.page.pageSize = searchForm.pageSize
         this.getList()
      },
      // 编辑
      editClick(row){
         if(row){
            this.$refs.diaLog.dialogTitle = "编辑用户"
         }else{
            this.$refs.diaLog.dialogTitle = "添加用户"
         }
         this.$refs.diaLog.open()
      },
      // 删除
      deleteOneClick(data){
         this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
               confirmButtonText: "确定",
               cancelButtonText: "取消",
               type: "warning",
            }).then(async ()=>{
               // 删除操作
               await this.$API.user.removeUser(data.id).then((res)=>{
                  if(res.code == '2000'){
                     this.$message({showClose: true,message: "删除用户成功",type: "success",});
                     console.log(res.msg);
                  }else{
                     this.$message({showClose: true,message: "删除用户失败",type: "error",});    
                  }
               }).catch((err)=>{console.log(err);})
               this.getList({});
            }).catch((err) => {
               console.log(err);
               this.$message({showClose: true,message: "已取消删除",type: "info",}); 
        });
      }
   },
}
</script>
<style lang="scss" scoped>
 
</style>
