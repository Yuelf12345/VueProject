<template>
    <div class="app-container">
        <el-table v-loading="loading" :data="roleList">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="角色编号" prop="roleId" width="120" />
            <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
            <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
            <el-table-column label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        active-value="1"
                        inactive-value="0"
                        @change="handleStatusChange(scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading:true,
            // 数据列表
            roleList:[],
        }
    },
    created() {
        this.getList()
    },
    computed: {
    },
    methods: {
        getList(){
            setTimeout(()=>{
                this.roleList = [{
                    roleId: '1',
                    roleName: '王小虎',
                    roleKey: '上海市普陀区金沙江路 1518 弄',
                    status:'0'
                }]
            this.loading = false
            },500)
        },
        handleStatusChange(row){
            console.log(row.status);
        }
    },
}
</script>
<style lang="scss" scoped></style>
