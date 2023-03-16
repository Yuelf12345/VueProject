<template>
    <div>
        <el-table ref="singleTable" :data="
            tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
            )
        " highlight-current-row @current-change="handleCurrentChange" 
        tooltip-effect="dark" @selection-change="handleSelectionChange" 
        :default-sort="{ prop: 'ip_name', order: 'descending' }"
            style="width: 100%" max-height="250">

            <el-table-column type="selection" width="55" fixed>
            </el-table-column>
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <!--  :default-sort = "{prop: 'ip_name', order: 'descending'}" 配合sortable -->
            <el-table-column property="ip_name" label="接口名称" sortable>
            </el-table-column>
            <el-table-column property="ip_type" label="接口状态">
            </el-table-column>
            <el-table-column label="生效配置">
                <template #default="scope">
                    <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="1000">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin: 10px; text-align: end" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" background layout="total,sizes,prev, pager, next,jumper"
            :page-sizes="[3, 5, 7, 9]" :total="tableData.length" :page-size="pageSize" :current-page="currentPage">
        </el-pagination>
        <div style="margin-top: 20px">
            <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
            <el-button @click="setCurrent()">取消选择</el-button>
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'publicTable',
    props: [],
    data() {
        return {
            tableData: [
                {
                    ip_name: "ens30",
                    ip_type: "正常",
                    status: true,
                },
                {
                    ip_name: "ens31",
                    ip_type: "正常",
                    status: true,
                },
                {
                    ip_name: "ens32",
                    ip_type: "正常",
                    status: true,
                },
                {
                    ip_name: "ens33",
                    ip_type: "正常",
                    status: true,
                },
                {
                    ip_name: "ens34",
                    ip_type: "错误",
                    status: false,
                },
            ],
            totalSize: 1,
            currentPage: 1,
            total: 20,
            pageSize: 3,
            multipleSelection: []

        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.singleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.singleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        //当前页改变时触发 跳转其他页
        // handleCurrentChange(val) {
        //     this.currentPage = val;
        // },
        // handleEdit(index, row) {
        //     console.log(index, row);
        // }
    },

}
</script>
<style lang="scss" scoped></style>
