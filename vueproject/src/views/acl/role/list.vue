<template>
    <div> 
      <publicTable2
      v-bind="da"
      @getList="getList"


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
import getData from '@/utils/data'
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
   },
   mounted(){
      this.getList({});
    },
   computed:{
   },
   methods:{
      rowOperation($index,row) {
				console.log($index,row)
			},
      getList(searchForm){
         // 后台接口 返回data数据
         //    selectUser(searchForm)
         //   .then((res) => {
         //     console.log(res);
         //     this.da.tableData = res.data.records;
         //     this.da.tableTotal = res.data.total;
         //     this.da.page.current = res.data.current;
         //     this.da.page.pageSize = res.data.size;
         //   })
         //   .catch((err) => {
         //     console.log(err);
         //   });
         // console.log(searchForm);
         this.da.tableTotal = getData(10).length
         if(!searchForm.pageSize){
            this.da.page.currentPage = 1
            this.da.page.pageSize = 4
         }else{
            this.da.page.currentPage = searchForm.currentPage
            this.da.page.pageSize = searchForm.pageSize
         }
         //截取
         this.da.tableData = getData(10).slice(
              ( this.da.page.currentPage - 1) * this.da.page.pageSize,
              this.da.page.currentPage * this.da.page.pageSize
         )
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
