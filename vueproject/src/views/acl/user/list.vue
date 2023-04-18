<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <transition name="slide-fade">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryParams.roleName" placeholder="请输入角色名称" clearable style="width: 240px"
            @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="queryParams.roleKey" placeholder="请输入权限字符" clearable style="width: 240px"
            @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="角色状态" clearable style="width: 240px">
            <el-option key="0" label="未启用" value="0" />
            <el-option key="1" label="已启用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </transition>
    <!-- 按钮部分 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
      <el-col :span="1.5" @queryTable="getList">
        <el-button type="button" icon="el-icon-search" size="mini" circle @click="showSearch = !showSearch"></el-button>
        <el-button type="button" icon="el-icon-refresh" size="mini" circle @click="getList()"></el-button>
      </el-col>
    </el-row>
    <!-- 表单部分 -->
    <el-table v-loading="loading" :data="roleList">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="角色编号" prop="roleId" width="140" />
      <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="170" />
      <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="170" />
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-value="1" inactive-value="0"
            @change="handleStatusChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="queryParams.pageNum" :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" />
      <!-- 弹窗部分 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item prop="roleKey">
            <span slot="label">
              <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
              权限字符
            </span>
            <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio label="0">未启用</el-radio>
              <el-radio label="1">已启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm()">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 搜索框
      showSearch: true,
      loading: true,
      // 选中数组
      ids: [],
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      // 数据列表
      roleList: [],
      // 总条数
      total: 2,
      // 当前页
      currentPage: 1,
      // 查询参数
      queryParams: {
        pageNum: ["10", "20"],
        pageSize: 10,
        roleName: '',
        roleKey: '',
        status: '',
      },
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    // 搜索
    handleQuery() {
      this.currentPage = 1;
      this.getList();
    },
    // 重置搜索
    resetQuery() {
      this.queryParams.roleName = ''
      this.queryParams.roleKey = ''
      this.queryParams.status = ''
    },
    /** 导出按钮操作 */
    handleExport() {
      alert('导出')
    },
    async getList() {
      const result = await this.$API.user.getPageList(this.currentPage, this.queryParams)
        .then((res) => {
          this.roleList = res.data.data.rows;
          this.loading = false;
        });
    },
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加角色";
    },
    async handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.roleName + '"用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$API.user.changeUserStatus(row).then((res) => {
          console.log(res.data);
        })
      }).catch((err) => {
        row.status = row.status === "0" ? "1" : "0";
        console.log(err);
      });
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    // 删除
    async handleDelete(data) {
      this.$confirm('确认要删除' + data.roleName + '"用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async()=>{
        await this.$API.user.removeUser(data.roleId).then((res) => {
          this.getList();
        });
      }).catch((err) => {
          console.log(err);
      });
    },
    async handleUpdate(row) {
      const roleId = row.roleId
      await this.$API.user.getUser(roleId).then(res => {
        this.form = res.data.data[0],
          this.open = true;
        this.title = "修改角色";
      })
    },
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.$API.user.upDateUser(this.form).then(res => {
            this.getList()
            this.open = false;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      setTimeout(() => {
        this.reset();
      }, 150)
    },
    // 重置
    reset() {
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        status: "0",
        remark: undefined
      };
      if (this.$refs.form !== undefined) this.$refs.form.resetFields()
    },
  }
};
</script>
<style lang="scss" scoped>
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
      transform: translateY(-10px);
      opacity: 0;
    }
</style>
