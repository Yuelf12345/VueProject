<template>
    <div>
        <el-button @click="resetDateFilter">清除接口过滤器</el-button>
         <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table ref="singleTable" :data="tableData" 
        highlight-current-row @current-change="handleCurrentChange" 
        tooltip-effect="dark" @selection-change="handleSelectionChange" 
        :default-sort="{ prop: 'ip_name', order: 'descending' }"
            style="width: 100%" max-height="250">

            <el-table-column type="selection" width="55" fixed>
            </el-table-column>
            <el-table-column type="index" label="序号" width="100" >
            </el-table-column>
            <!--  :default-sort = "{prop: 'ip_name', order: 'descending'}" 配合sortable -->
            <el-table-column property="ip_name" label="接口名称" 
            sortable
            column-key="date"
            :filters="[{text: 'ens30', value: 'ens30'}, {text: 'ens31', value: 'ens31'}, {text: 'ens32', value: 'ens32'}, {text: 'ens33', value: 'ens33'}]"
            :filter-method="filterHandler">
            </el-table-column>
            <el-table-column property="ip_type" label="接口状态">
            </el-table-column>
            <el-table-column label="生效配置">
                <template #default="scope">
                    <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" />
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="tag"
                label="标签"
                width="600"
                :filters="[{ text: '1', value: '1' }, { text: '2', value: '2' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.tag === '1' ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
                </el-table-column>
        </el-table>
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
                    tag:'1'
                },
                {
                    ip_name: "ens31",
                    ip_type: "正常",
                    status: true,
                    tag:'1'
                },
                {
                    ip_name: "ens32",
                    ip_type: "正常",
                    status: true,
                    tag:'2'
                },
                {
                    ip_name: "ens33",
                    ip_type: "正常",
                    status: true,
                    tag:'2'
                },
                {
                    ip_name: "ens34",
                    ip_type: "错误",
                    status: false,
                    tag:'1'
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

        //  选中  高亮
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 多选  收集
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
        // 选择器
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
       
        // 清除选择器
        resetDateFilter() {
            this.$refs.singleTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.singleTable.clearFilter();
        }
    }
}
</script>
<style lang="scss" scoped></style>
