<template>
    <div class="school" v-loading="loading">
      <!--行程列表-->
      <div class="school-page">
        <h2>行程列表</h2>
        <div class="school-page-send">
          <el-button
            @click="addNewJourney"
            icon="el-icon-plus"
            round size="small">新增行程
          </el-button>
        </div>
        <div class="school-page-item">
          <div v-for="(item, index) in initData"
               :key='index'
               @click="showDetail"
               :class="[stateClass[item.state],'school-page-item-list']">
            <i @click="deleteCurrent(index)" class="iconfont icon-delete"></i>
            <h2>{{ item.aboutTime }}<span>{{ state[item.state] }}</span></h2>
            <strong>{{ item.schoolName }}</strong>
            <h5>精彩在线的宣讲会将继续与大家见面</h5>
            <div>
              <span><i class="iconfont icon-didi"></i>{{ item.preachCity }}</span>
              <span><i class="iconfont icon-ximi"></i>{{ item.total }}人</span>
            </div>
          </div>
        </div>
      </div>
      <!--行程详情-->
      <div class="school-detail animated" :class="[isShowDetail ? 'show fadeInDown':'']">
        <i @click="closeDetail" class="el-icon-close"></i>
        <h2>广州美术学院宣讲会<span class="not-start">未开始</span></h2>
        <div class="school-detail-item">
          <div>宣讲城市：<span>武汉</span></div>
          <div>学校名称：<span>武汉大学</span></div>
          <div>详细地址：
            <span v-if="isEdit">武汉大学1楼食堂</span>
            <el-input v-else
                      placeholder="请输入内容"
                      v-model="editItem.detailAddress"
                      size="small"
                      style="width: 180px"
                      clearable>
            </el-input>
          </div>
          <div>宣讲时间：
            <span v-if="isEdit">2018/08/23</span>
            <el-date-picker v-else
              v-model="editItem.aboutTime"
              type="date"
              size="small"
              style="width: 180px"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div>简历截止：<span>2018/08/23</span></div>
          <div>线上笔试：<span>2018/08/23</span></div>
          <div>面试时间：<span>2018/08/23</span></div>
        </div>
        <div class="school-detail-row">
          <span>宣讲内容：</span>
          <div>卫宁健康科技集团股份有限公司(Winning Health Technology Group Co.,Ltd.)成立于1994年，是国内专注于医疗健康信息化的上市公司，致力于提供医疗健康卫生信息化解决方案，不断提升人们的就医体验和健康水平。卫宁健康通过持续的技术创新，自主研发适应不同应用场景的产品与解决方案，业务覆盖智慧医院、区域卫生、基层卫生、公共卫生、医疗保险、健康服务等领域，是中国医疗健康信息行业提供整体产品、解决方案与服务供应商。</div>
        </div>
        <div class="school-detail-list">
          <p>报名名单：</p>
          <el-table
            :data="listData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="IDCard"
              label="身份证">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--新增行程-->
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
              <el-form-item label="宣讲城市" prop="preachCity">
                <el-input v-model="journeyForm.preachCity"></el-input>
              </el-form-item>
              <el-form-item label="学校名称" prop="schoolName">
                <el-input v-model="journeyForm.schoolName"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" prop="detailAddress">
                <el-input v-model="journeyForm.detailAddress"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="宣讲时间" prop="aboutTime">
                    <el-date-picker type="date"
                                    placeholder="宣讲时间"
                                    style="width: 100%"
                                    value-format="yyyy/MM/dd"
                                    v-model="journeyForm.aboutTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="简历截止" prop="resumeStop">
                    <el-date-picker type="date"
                                    placeholder="简历截止"
                                    style="width: 100%"
                                    value-format="yyyy/MM/dd"
                                    v-model="journeyForm.resumeStop">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="线上笔试" prop="writtenTime">
                    <el-date-picker type="date"
                                    placeholder="线上笔试"
                                    style="width: 100%"
                                    value-format="yyyy/MM/dd"
                                    v-model="journeyForm.writtenTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="面试时间" prop="interviewTime">
                    <el-date-picker type="date"
                                    placeholder="面试时间"
                                    style="width: 100%"
                                    value-format="yyyy/MM/dd"
                                    v-model="journeyForm.interviewTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="宣讲内容" prop="preachContent">
                <el-input type="textarea"
                          v-model="journeyForm.preachContent"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="releaseJourney('journeyForm')"
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
export default {
  data() {
    return {
      loading: false,
      initData: [],
      state: ['进行中', '未开始', '已结束'],
      stateClass: ['under-way', 'not-start', 'fineshed'],
      listData: [
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
        {
          name: '黄婉如',
          IDCard: '340405199307120022',
          phone: 15150588385,
          email: '250734615@qq.com',
        },
      ],
      isShowDetail: false,
      isEdit: true,
      editItem: {
        detailAddress: '武汉',
        aboutTime: '2018/08/23',
      },
      journeyVisible: false,
      journeyForm: {
        preachCity: '',
        schoolName: '',
        detailAddress: '',
        aboutTime: '',
        resumeStop: '',
        writtenTime: '',
        interviewTime: '',
        preachContent: '',
      },
      rules: {
        preachCity: [
          { required: true, message: '请输入宣讲城市', trigger: 'blur' },
        ],
        schoolName: [
          { required: true, message: '请输入学校名称', trigger: 'blur' },
        ],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        aboutTime: [
          { required: true, message: '请输入宣讲时间', trigger: 'blur' },
        ],
        resumeStop: [
          { required: true, message: '请选择简历截止时间', trigger: 'blur' },
        ],
        writtenTime: [
          { required: true, message: '请选择线上笔试时间', trigger: 'blur' },
        ],
        interviewTime: [
          { required: true, message: '请选择面试时间', trigger: 'blur' },
        ],
        preachContent: [
          { required: true, message: '请输入宣讲内容', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.fetchPageDataAsync();
    });
  },
  methods: {
    // 请求数据
    fetchPageDataAsync() {
    },
    // 新增行程
    addNewJourney() {
      this.journeyVisible = true;
    },
    // 发布行程
    releaseJourney(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _form = this.journeyForm;
          this.initData = [{
            aboutTime: _form.aboutTime,
            state: 0,
            schoolName: _form.schoolName,
            preachCity: _form.preachCity,
            total: 88,
          }].concat(this.initData);
          this.journeyVisible = false;
        } else {
          this.$notify.error({
            title: '错误',
            message: '带星（*）为必填项',
          });
          return false;
        }
      });
    },
    // 显示行程详情
    showDetail() {
      this.isShowDetail = true;
    },
    // 删除数据
    deleteCurrent(index) {
      this.initData.splice(index, 1);
      this.$message.success('删除成功');
    },
    // 关闭弹窗
    closeDetail() {
      this.isShowDetail = false;
    },
  },
  computed: {
  },
  watch: {
  },
  filters: {
  },
  components: {},
};
</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  // 状态颜色: 进行中，未开始，已结束
  $underWay:#1DB7AE;
  $notStart:#F29B2C;
  $fineshed:#B2B2B2;
  @mixin stateTag($color,$backColor,$borderColor){
    margin-left: 10px;
    padding: 0 6px;
    font-size: 12px;
    color: $color;
    background: $backColor;
    border-radius: 2px;
    font-weight: normal;
    border: 1px solid $borderColor;
  }
  .school{
    position: relative;
    .school-page{
      >h2{
        margin-left: 2%;
        padding: 20px 0px;
        font-size: 18px;
        color: #333333;
        @include bold;
      }
      .school-page-send{
        margin-right: 3%;
        margin-bottom: 20px;
        text-align: right;
        /deep/ .el-button{
          margin-left: 10px;
          color: #fff;
          background: #57C3EB;;
          border: 1px solid #57C3EB;;
        }
      }
      .school-page-item{
        display: flex;
        flex-wrap: wrap;
        margin-left: 3%;
        .school-page-item-list{
          position: relative;
          flex:0 0 31%;
          height: 230px;
          margin-right: 2%;
          margin-bottom: 2%;
          box-shadow: 0 0 6px 0 rgba(196,213,247,0.50);
          border-radius: 4px;
          border:1px solid transparent;
          &:nth-child(3n){
            margin-right: 0px;
          }
          &:hover{
            cursor: pointer;
            box-shadow: 0 0 16px 0 rgba(153,185,250,0.50);
            i.iconfont{
              visibility: visible;
            }
          }
          >i{
            &.iconfont{
              position: absolute;
              right: 15px;
              top:15px;
              color: #ccc;
              visibility: visible;
              border:5px solid transparent;
            }
          }
          &.under-way{
            >h2{
              margin: 20px 0 0 20px;
              font-size: 13px;
              color: #1F9D95;
              font-weight: normal;
              span{
                @include stateTag($underWay,#EDF9F9,#C1EFE8)
              }
            }
            >strong,>h5{
              display: block;
              text-align: center;
              color: $underWay;
            }
            >strong{
              margin-top: 46px;
              font-size: 24px;
            }
            >h5{
              margin-top: 15px;
              font-size: 13px;
            }
            >div{
              margin-top:49px ;
              text-align: center;
              font-size: 13px;
              color: #666666;
              span{
                i{
                  display: inline-block;
                  line-height: 1;
                  vertical-align: baseline;
                  font-size: 14px;
                }
                &:last-child{
                  margin-left: 43px;
                }
              }

            }
          }
          &.not-start{
            >h2{
              margin: 20px 0 0 20px;
              font-size: 13px;
              color: #F29B2C;
              font-weight: normal;
              span{
                @include stateTag($notStart,#F9F5ED,#EFDAC1)
              }
            }
            >strong,>h5{
              display: block;
              text-align: center;
              color: $notStart;
            }
            >strong{
              margin-top: 46px;
              font-size: 24px;
            }
            >h5{
              margin-top: 15px;
              font-size: 13px;
            }
            >div{
              margin-top:49px ;
              text-align: center;
              font-size: 13px;
              color: #666666;
              span{
                i{
                  display: inline-block;
                  line-height: 1;
                  vertical-align: baseline;
                  font-size: 14px;
                }
                &:last-child{
                  margin-left: 43px;
                }
              }

            }
          }
          &.fineshed{
            >h2{
              margin: 20px 0 0 20px;
              font-size: 13px;
              color: #B2B2B2;
              font-weight: normal;
              span{
                @include stateTag($fineshed,#F0F0F0,#D0D0D0);
              }
            }
            >strong,>h5{
              display: block;
              text-align: center;
              color: $fineshed;
            }
            >strong{
              margin-top: 46px;
              font-size: 24px;
            }
            >h5{
              margin-top: 15px;
              font-size: 13px;
            }
            >div{
              margin-top:49px ;
              text-align: center;
              font-size: 13px;
              color: #666666;
              span{
                i{
                  display: inline-block;
                  line-height: 1;
                  vertical-align: baseline;
                  font-size: 14px;
                }
                &:last-child{
                  margin-left: 43px;
                }
              }
            }
          }
        }
      }
    }
    .school-detail{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      padding: 60px 100px;
      background: #fff;
      display: none;
      &.show{
        display: block;
      }
      i{
        position: absolute;
        right: 20px;
        top: 20px;
        color: #ccc;
        font-size: 20px;
        cursor: pointer;
        transition: all ease-in .5s;
        border:5px solid transparent;
        &:hover{
          transform: rotate(180deg);
        }
      }
      h2{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        span{
          &.under-way{
            @include stateTag($underWay,#EDF9F9,#C1EFE8)
          }
          &.not-start{
            @include stateTag($notStart,#F9F5ED,#EFDAC1)
          }
          &.fineshed{
            @include stateTag($fineshed,#F0F0F0,#D0D0D0);
          }
        }
      }
      .school-detail-item{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 50px;
        >div{
          flex: 0 0 25%;
          font-size: 13px;
          color: #666666;
          margin-bottom: 20px;
          span{
            margin-left: 5px;
            color: #333333;
          }
        }
      }
      .school-detail-row{
        display: flex;
        margin-bottom: 50px;
        >span{
          font-size: 13px;
          color: #666666;
        }
        >div{
          flex: 1;
          font-size: 13px;
          color: #333333;
          line-height: 24px;
        }
      }
      .school-detail-list{
        p{
          margin-bottom: 20px;
          font-size: 13px;
          color: #666666;
        }
      }
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
