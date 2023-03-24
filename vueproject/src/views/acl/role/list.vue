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
      editClick(){
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
