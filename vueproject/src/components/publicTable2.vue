<template>
   <div>
      <el-button type="primary"  @click="handleClick('Edit')">新增</el-button>
      <!-- 表格部分 -->
      <el-table 
      :data="tableData" 
      @select="danxuan"
      @select-all="quanxuan"
      :border="tableConfig.border"
      style="width: 100%;"
      :default-sort="{ prop: 'id', order: 'descending' }"
      >
      <!-- 多选框 -->
         <el-table-column v-if="tableConfig.select" type="selection" width="55" fixed></el-table-column>
      <!-- 序号 -->
         <el-table-column v-if="tableConfig.index" type="index" label="序号" width="50" fixed></el-table-column>
      <!-- 表格中的类型 -->
         <el-table-column v-for="(item, index) in tableProp"
          :key = 'index'
          :prop="item.prop"
          :label="item.label">
               <template slot-scope="scope">
                  <span v-if="item.type === 'text'">{{ scope.row[item.prop] }}</span>
                  <el-tag v-if="item.type === 'tag'">{{ scope.row[item.prop] }}</el-tag>
                  <el-progress v-if="item.type === 'progress'" :percentage="scope.row[item.prop]"></el-progress>
                  <el-switch v-if="item.type === 'switch'" v-model="scope.row[item.prop]" active-color="#13ce66" inactive-color="#ff4949" />
                  <img v-if="item.type === 'img'" :src="scope.row[item.prop]" min-width="70" height="70"/>
                </template>      
         </el-table-column>
         <!-- 操作按钮 -->
         <el-table-column  v-if="tableConfig.handle" label="操作" fixed="right" :min-width="150">
            <template slot-scope="scope">
            <!--操作列内的按钮部分-->
              <el-button
                v-for="(item, index) in tableConfig.buttonAffairs"
                :key="index"
                @click="handleClick(item.affairs, scope.row)"
                :type="item.type"
                :icon="item.icon"
                size="mini"
                >{{ item.name }}</el-button
              >
            </template>
         </el-table-column>
      </el-table>
       <!-- 分页部分 -->
       <div class="block">
            <el-pagination 
            v-if="tableConfig.paging"
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
                :current-page="page.currentPage" 
                :page-sizes="[4, 6, 8, 12]" 
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper" 
                :total="tableTotal">
            </el-pagination>
        </div>
   </div>
</template>
<script>
export default {
   props: {
      tableData: Array,
      tableProp: Array,
      tableTotal:0,
      page: {
         currentPage: Number,
         pageSize: Number,
      },
      tableConfig:{
         type:Object,
         default:function(){
            return{
               select:true,
               index:true,
               border:true,
               paging: true,
               handle: true,
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
               }]
            }
         }
      }
   },
   data() {
      return {
            batchDel: [],//删除数组
            
      }
   },
   created() {
   },
   computed: {
   },
   methods: {
      danxuan(selection) {//表格多选
         this.batchDel = selection;
      },
      quanxuan(selection) {//表格多选
         this.batchDel = selection;
      },
      handleClick(affairs, row) {//表格内操作列抛出事件
         this.$emit("btn" + affairs, row);
      },
      handleSizeChange(val) {//分页每页大小改变操作事件
         this.page.pageSize = val;
         this.$emit("pageChange", this.page);
      },
      handleCurrentChange(val) {//分页当前页改变操作事件
         this.page.currentPage = val;
         this.$emit("pageChange", this.page);
      },
   },
}
</script>
<style lang="scss" scoped></style>
