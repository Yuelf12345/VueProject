<template>
    <el-table :data="userList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="Date" prop="date">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            userList: [{
              date: '2023-03-13',
              name: '张三',
              address: '湖北省武汉市101'
            }, {
              date: '2023-03-14',
              name: '李四',
              address: '湖北省武汉市102'
            }, {
              date: '2023-03-15',
              name: '王五',
              address: '湖北省武汉市103'
            }, {
              date: '2023-03-16',
              name: '赵六',
              address: '湖北省武汉市104'
            }],
            search: ''
            // tableData: [{
            //   date: '2023-03-13',
            //   name: '张三',
            //   address: '湖北省武汉市101'
            // }, {
            //   date: '2023-03-14',
            //   name: '李四',
            //   address: '湖北省武汉市102'
            // }, {
            //   date: '2023-03-15',
            //   name: '王五',
            //   address: '湖北省武汉市103'
            // }, {
            //   date: '2023-03-16',
            //   name: '赵六',
            //   address: '湖北省武汉市104'
            // }],
        }
    },
    created() {
        // this.getUserList()
    },
    methods: {
        async getUserList() {
            const  {data:result}  = await this.$API.user.getUserList(this.search)
            console.log(result);
        },
        handleEdit(index, row) {
            this.getUserList()
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
}
</script>
<style lang="scss" scoped></style>
