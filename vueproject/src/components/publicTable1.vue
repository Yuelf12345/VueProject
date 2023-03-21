<template>
    <div>
        <el-table :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
            style="width: 100%" row-key="id" border>
            <!-- <el-table-column type="index" :index="indexMethod">
            </el-table-column> -->
            <el-table-column prop="FO_Num" label="工厂订单编号">
            </el-table-column>
            <el-table-column prop="O_Num" label="订单编号">
            </el-table-column>
            <el-table-column prop="O_Status" label="订单状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.O_Status == '未开始'">未开始</el-tag>
                    <el-tag type="success" v-else>进行中</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="P_Progress" label="生产进度">
                <template slot-scope="scope">
                    <el-progress :percentage="scope.row.P_Progress"></el-progress>
                </template>        
            </el-table-column>
            <el-table-column prop="C_Emission" label="当前碳排量">
            </el-table-column>
            <el-table-column label="操作" >
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
                :current-page="currentPage" 
                :page-sizes="[4, 6, 8, 12]" 
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" 
                :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>
<script>

import getData from '@/utils/data'

export default {
    data() {
        return {
            tableData: [
                // {
                //     id:1,
                //     FO_Num:12,
                //     O_Num:1,
                //     O_Status:'开始',
                //     P_Progress:50,
                //     C_Emission:300
                // }
            ],
            totalSize: 1,
            currentPage: 1,
            total: 20,
            pageSize: 4,
        }
    },
    mounted(){
        this.tableData = getData(20)
        console.log(this.tableData);
    },
    methods: {
        // 自定义索引
        // indexMethod(index) {
        //     return index
        // },
        // // 子列表    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" lazy :load="load"
        // load(tree, treeNode, resolve) {
        //     setTimeout(() => {
        //         resolve([
        //             {
        //                 id: 31,
        //                 date: '2016-05-01',
        //                 name: '王小虎',
        //                 num: '10'
        //             }, {
        //                 id: 32,
        //                 date: '2016-05-01',
        //                 name: '王小虎',
        //                 num: '20'
        //             }
        //         ])
        //     }, 1000)
        // },
        // // 求和   show-summary :summary-method="getSummaries"
        // getSummaries(param) {
        //     const { columns, data } = param;
        //     const sums = [];
        //     columns.forEach((column, index) => {
        //         if (index === 0) {
        //             sums[index] = '总价';
        //             return;
        //         }
        //         const values = data.map(item => Number(item[column.property]));
        //         if (!values.every(value => isNaN(value))) {
        //             sums[index] = values.reduce((prev, curr) => {
        //                 const value = Number(curr);
        //                 if (!isNaN(value)) {
        //                     return prev + curr;
        //                 } else {
        //                     return prev;
        //                 }
        //             }, 0);
        //             sums[index] += ' 元';
        //         } else {
        //             sums[index] = 'N/A';
        //         }
        //     });

        //     return sums;
        // },
        // // 合并          :span-method="objectSpanMethod"
        // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //     if (columnIndex === 1) {    //列
        //         if (rowIndex % 2 === 0) { //行
        //             return [2, 1];           //占两行一列
        //         } else {
        //             return [0, 0];
        //         }
        //     }
        // },
        //分页
        handleSizeChange(val) {
            this.pageSize = val
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
        },
        handleEdit(){
           
        }
    }
}
</script>