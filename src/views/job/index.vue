<template>
  <div class="resume">
    <div class="resume-search">
      <el-input
        size="small"
        placeholder="请输入内容"
        clearable
        @keyup.enter.native="handleSearch"
        v-model="search">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button
      class="small-button"
      icon="el-icon-plus"
      round size="small"
      @click="journeyVisible = true">发布新职位
      </el-button>
    </div>
    <!--简历收件箱-->
    <div class="resume-table" v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleTab">
        <el-tab-pane label="在线中职位" name="first">
          <ResumeTable @rowOperate="rowOperates" :tableData="onlineData" :tabIndex="activeName"/>
        </el-tab-pane>
        <el-tab-pane label="已下线职位" name="second">
          <ResumeTable @rowOperate="rowOperates" :tableData="offlineData"  :tabIndex="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--详细信息-->
    <div class="resume-detail animated fadeInDown"></div>
    <!--新增职位-->
    <div class="school-journey">
      <el-dialog
        width="30%"
        :visible.sync="journeyVisible">
        <div class="school-journey-form">
          <el-form ref="journeyForm"
                   :model="journeyForm"
                   :rules='rules'
                   label-width="80px"
                   size="small">
            <el-form-item label="职位名称" prop="name">
              <el-input v-model="journeyForm.name"></el-input>
            </el-form-item>
            <el-form-item label="工作地点" prop="place">
              <el-input v-model="journeyForm.place"></el-input>
            </el-form-item>
            <el-form-item label="招聘类型" prop="recruitType">
              <template v-for="item in recruitType">
                <el-radio
                  :key="item.id"
                  v-model="journeyForm.recruitType"
                  :label="item.id">{{item.description}}</el-radio>
              </template>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学历要求" prop="education">
                  <el-select v-model="journeyForm.education" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in educationType"
                      :key="index"
                      :label="item.description"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作类型" prop="jobType">
                  <el-select v-model="journeyForm.jobType" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in jobType"
                      :key="index"
                      :label="item.description"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘人数" prop="recruitCount">
                  <el-input
                  v-model="journeyForm.recruitCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作年限" prop="workLife">
                  <el-input v-model="journeyForm.workLife"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="工作职责" prop="duty">
              <el-input type="textarea"
                        v-model="journeyForm.duty"></el-input>
            </el-form-item>
            <el-form-item label="工作要求" prop="requirement">
              <el-input type="textarea"
                        v-model="journeyForm.requirement"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="postJob('journeyForm')"
                     icon="iconfont icon-faso" size="small">发布
          </el-button>
          <el-button type="danger"
                     @click="journeyVisible = false"
                     size="small">取消
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
import { mapGetters } from 'vuex';
import ResumeTable from '@/components/resume/ResumeTable.vue';

export default {
  name: 'job',
  data() {
    return {
      loading: false,
      activeName: 'first',
      search: '',
      onlineData: [],
      offlineData: [],
      journeyVisible: false,
      journeyForm: {
        name: '',
        place: '',
        workLife: '',
        education: '',
        jobType: '',
        recruitType: '',
        recruitCount: '',
        duty: '',
        requirement: '',
        attachment: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
        ],
        place: [
          { required: true, message: '请输入工作地点', trigger: 'blur' },
        ],
        workLife: [
          { required: true, message: '请选择工作经验要求', trigger: 'blur' },
        ],
        education: [
          { required: true, message: '请选择学历要求', trigger: 'blur' },
        ],
        jobType: [
          { required: true, message: '请选择简历截止时间', trigger: 'blur' },
        ],
        recruitType: [
          { required: true, message: '请选择职位性质', trigger: 'blur' },
        ],
        recruitCount: [
          { required: true, message: '请填写招聘人数', trigger: 'blur' },
        ],
        duty: [
          { required: true, message: '请填写职责', trigger: 'blur' },
        ],
        requirement: [
          { required: true, message: '请填写招聘人数', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      educationType: 'handleEducationType',
      recruitType: 'handleRecruitType',
      jobType: 'handleJobType',
    }),
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.getJobList();
    },
    getJobList() {
      this.loading = true;
      this.$store.dispatch('job/')
    },
    handleTab(tab) {
      console.log(tab);
    },
    handleSearch() {
    },
    rowOperates(str) {
      console.log(str);
    },
    postJob(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return this.$message.error('请确实格式！');
        }
        this.$store.dispatch('job/postJob', this.journeyForm).then((res) => {
          if (res.state) {
            this.$message.success(res.tip);
            this.journeyVisible = false;
          }
        });
      });
    },
  },
  watch: {
  },
  filters: {
  },
  components: { ResumeTable },
};
</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  .resume{
    position: relative;
    height: 100%;
    .small-button {
      padding: 0px 15px;
    }
    .resume-search{
      position: absolute;
      display: flex;
      top:20px;
      right: 20px;
      z-index: 10;
      /deep/ .el-button{
        margin-left: 10px;
        color: #fff;
        background: #57C3EB;;
        border: 1px solid #57C3EB;;
      }
    }
    .resume-table{
      padding: 10px;
      /deep/ .el-tabs__active-bar{
        background-color: #508FD8;
      }
      /deep/ .el-tabs__item{
        width: 108px;
        color: #666666;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        &.is-active{
          height:3px;
          color: #508FD8;
        }
      }
      /deep/ .el-tabs__nav-wrap::after{
        height: 0px;
      }
    }
    .resume-detail{
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      transition: all ease-in .3s;
      @include test;
      background: #fff;
      z-index: 10;
      display: none;
    }
    .school-journey{
      .school-journey-form{
      }
      /deep/ .dialog-footer{
        i {
          font-size: 14px;
          color: #fff;
          vertical-align: baseline;
          display: inline-block;
        }
        .el-button--warning{
          border-color: #57C3EB;
          background: #57C3EB;
        }
      }
    }
  }
</style>
