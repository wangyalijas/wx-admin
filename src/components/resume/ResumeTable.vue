<template>
  <div class="resume-inner">
    <el-table
      ref="multipleTable"
      :data="tableDatas"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="姓名"
        width="120">
        <template slot-scope="scope">
          <div class="resume-table-name">
            {{ scope.row.name }}
            <i :class="[scope.row.sex === '男' ? 'icon-nan':'icon-nv','iconfont']"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="jobTile"
        label="职位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="workPlace"
        label="工作地"
        show-overflow-tooltip
        width="95">
      </el-table-column>
      <el-table-column
        prop="phone"
        width="120"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="education"
        width="60"
        label="学历">
      </el-table-column>
      <el-table-column
        prop="school"
        label="院校"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        width="270"
        label="附件">
        <template slot-scope="scope">
          <div class="resume-table-enclosure">
            <i :class=" [scope.row.enclosure? 'icon-fuji':'','iconfont']"></i>
            <div>
              <el-tooltip effect="dark" content="收藏" placement="bottom">
                <i @click.prevent="handleCollect(scope.row)" class="iconfont icon-shou"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="下载" placement="bottom">
                <i class="iconfont icon-xiza"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="转发" placement="bottom">
                <i class="iconfont icon-zhfa"></i>
              </el-tooltip>
              <el-tooltip v-show="tabIndex === 'second'" effect="dark" content="调配" placement="bottom">
                <i class="iconfont icon-tipe"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="bottom">
                <i class="iconfont icon-shch"></i>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="delayTime"
        label="投递时间">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="100"
        :filters="[{ text: '已读', value: '0' }, { text: '未读', value: '1' }, { text: '已转', value: '2' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="['info', '', 'danger'][scope.row.state]"
            close-transition>{{['已读', '未读', '已转'][scope.row.state]}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="resume-inner__pagination">
      <div class="resume-inner__pagination--button">
        <el-button type="primary" size="small">下载</el-button>
        <el-button @click="transpondEmail" type="primary" size="small">转发至邮箱</el-button>
        <el-button v-if="tabIndex === 'first'" type="primary" size="small">收藏至人才库</el-button>
        <el-button v-else-if="tabIndex === 'second'" type="primary" size="small">调配</el-button>
        <el-button type="primary" size="small">删除</el-button>
      </div>
      <el-pagination
        background
        :page-size= "pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--详细信息-->
    <div class="resume-inner__dialog">
      <el-dialog
        width="50%"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <div class="detail">
          <div class="detail-header clearfix">
            <div class="detail-header__img"></div>
            <div class="detail-header__info">
              <h2>UI设计师<i class="iconfont icon-shou" title="点击收藏"></i></h2>
              <ul>
                <li>投递时间：2018/09/01  17:00<strong>该简历已转发至: 25083223@qq.com</strong></li>
                <li>
                  <i class="iconfont icon-ximi"></i>
                  <span>黄宛如</span>
                  <span>男</span>
                  <span>8年工作经验</span>
                  <span>合肥</span>
                </li>
                <li><i class="iconfont icon-zhwe"></i>UI设计师</li>
                <li><i class="iconfont icon-dihu"></i>13500362237</li>
                <li><i class="iconfont icon-yoji"></i>273098839@qq.com</li>
              </ul>
            </div>
          </div>
          <el-scrollbar class="detail-main">
            <div>
              <!--工作经历-->
              <div class="detail-main__item">
                <h2><i class="iconfont icon-gozu"></i>工作经历</h2>
                <div v-for="(item, index) in experie"
                     :class="['detail-main__item--row', { active: index == 0 }]"
                     :key="index">
                  <span>{{ item.date }}</span>
                  <span>{{ item.company}}</span>
                  <span>{{ item.major }}</span>
                  <span>{{ item.diploma }}</span>
                </div>
              </div>
              <!--教育经历-->
              <div class="detail-main__item">
                <h2><i class="iconfont icon-jiyu"></i>教育经历</h2>
                <div v-for="(item, index) in education"
                     :class="['detail-main__item--row', { active: index == 0 }]"
                     :key="index">
                  <span>{{ item.date }}</span>
                  <span>{{ item.school }}</span>
                  <span>{{ item.major }}</span>
                  <span>{{ item.diploma }}</span>
                </div>
              </div>
              <!--相关附件-->
              <div class="detail-main__item">
                <h2><i class="iconfont icon-fuji"></i>相关附件</h2>
                <div class="detail-main__item--row">
                  <i class="detail-main__item--row--file">个人简历-黄宛如.doc</i>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
                     icon="iconfont icon-download" size="small">下载
          </el-button>
          <el-button type="warning" @click="dialogVisible = false"
                     icon="iconfont icon-trnspond" size="small">转发
          </el-button>
          <el-button type="danger" @click="dialogVisible = false"
                     icon="iconfont icon-delete" size="small">删除
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
export default {
  name: 'ResumeTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
    tabIndex: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 11,
      multipleSelection: '',
      dialogVisible: false,
      experie: [
        {
          date: '2011/09/01 - 2014/07/01',
          company: '卫宁健康科技',
          major: 'WEB前端工程师',
          diploma: '全职',
        },
        {
          date: '2011/09/01 - 2014/07/01',
          company: '中国电信集团',
          major: '视觉传达',
          diploma: '全职',
        },
        {
          date: '2011/09/01 - 2014/07/01',
          company: '中国电信集团',
          major: '视觉传达',
          diploma: '全职',
        },
      ],
      education: [
        {
          date: '2011/09/01 - 2014/07/01',
          school: '合肥工业大学',
          major: '视觉传达',
          diploma: '研究生',
        },
        {
          date: '2011/09/01 - 2014/07/01',
          school: '合肥八中',
          major: '视觉传达',
          diploma: '本科',
        },
      ],
    };
  },
  created() {
    this.$nextTick((_) => {
    });
  },
  methods: {
    /* 条件过滤
       *@method 方法名
       *@for 所属类名
       *@param{参数类型}参数名 参数说明
       *@return {返回值类型} 返回值说明
      */
    filterTag(value, row) {
      return row.state === value;
    },
    // 全选
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      console.log(selection);
    },
    // 修改当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 收藏
    handleCollect(val) {
      alert('收藏消息');
      console.log(val);
      event.cancelBubble = true;
    },
    // 行内双击
    handleRowClick(row, event, column) {
      this.dialogVisible = true;
      console.log(column);
    },
    /* 按钮操作
       *@method 方法名
       *@for 所属类名
       *@param{参数类型}参数名
       *@return {返回值类型} 返回值说明参数说明
      */
    transpondEmail() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: `你的邮箱是: ${value}`,
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入',
        });
      });
    },
    // 关闭弹窗
    handleClose(done) {
      done();
    },
  },
  computed: {
    tableDatas() {
      const _range = this.currentPage - 1;
      return this.tableData.slice(_range * this.pageSize, _range * this.pageSize + this.pageSize);
    },
    total() {
      return this.tableData.length;
    },
  },
  watch: {
    message() {
    },
  },
  filters: {
    subString() {
    },
  },
  components: {},
};
</script>
<!--CSS-PAGE-->
<style lang="scss">
  $iconColor: #FF853B;
  .resume-inner{
    .el-table{
      min-height: 686px;
      th{
        padding: 6px 0;
        border-bottom: none;
        font-size: 14px;
        color: #666666;
      }
      td{
        padding: 4px 0;
        border-bottom: none;
        font-size: 13px;
        color: #333333;
        .cell{
          .resume-table-name{
            i{
              margin-left: 5px;
              &.icon-nan{
                color: #38A2EC;
              }
              &.icon-nv{
                color: #F097C8;
              }
            }
          }
          .resume-table-enclosure{
            display: flex;
            >i{
              margin-right: 20px;
            }
            div{
              visibility: hidden;
              flex: 1;
              text-align: right;
              i{
                margin-right: 15px;
                color: #505DD8;
                cursor: pointer;
              }
            }
          }
        }
      }
      .el-table__row:hover td{
        background: #E1EEFF;
      }
    }
    @include e(pagination){
      padding: 20px 10px;
      text-align: right;
      background: #fff;
      @include m(button){
        float: left;
        .el-button--small{
          padding: 8px 26px;
          background: #508FD8;
          border-radius: 2px;
          border-color: #508FD8;
          font-size: 14px;
        }
      }
    }
    @include e(dialog){
      .el-dialog__body{
        padding: 20px 30px;
        .detail{
          .detail-header{
            @include e(img){
              float: left;
              width:150px ;
              height: 180px;
              margin-right: 30px;
              border-radius: 4px;
              background: url("../../assets/images/man.png") no-repeat;
            }
            @include e(info){
              float: left;
              h2{
                margin-bottom: 5px;
                font-size: 24px;
                color: #333333;
                i{
                  margin-left: 10px;
                  color: #505DD8;
                  font-size: 20px;
                  line-height: 1.6;
                }
              }
              ul{
                li{
                  margin-bottom: 10px;
                  font-size: 14px;
                  color: #333333;
                  strong{
                    margin-left: 19px;
                    font-size: 14px;
                    color: #989898;
                  }
                  span{
                    position: relative;
                    margin-right: 15px;
                    &:after{
                      position: absolute;
                      content: '';
                      top: 4px;
                      right: -10px;
                      height: 60%;
                      border-right: 1px solid #979797;
                    }
                    &:last-child{
                      &:after{
                        height: 0;
                      }
                    }
                  }
                  i{
                    margin-right: 9px;
                    color:#666 ;
                    font-size: 16px;
                    &.icon-yoji{
                      font-size: 12px;
                    }
                  }
                  &:last-child{
                    margin-bottom: 0;
                  }
                }
              }
            }
          }
          .detail-main{
            height:385px;
            margin-top: 30px;
            @include e(item){
              margin-top: 80px;
              h2{
                margin-bottom: 25px;
                font-size: 16px;
                color: #333333;
                @include bold;
                i{
                  margin-right: 8px;
                  color: $iconColor;
                  font-size: 16px;
                  font-weight: normal;
                  vertical-align: bottom;
                }
              }
              @include m(row){
                display: flex;
                line-height: 3;
                text-align: center;
                color: #666666;
                span{
                  width: 25%;
                  font-size: 13px;
                }
                &.active span{
                  color: #333333;
                }
                @include modifier(file){
                  color: #505DD8;
                  font-size: 13px;
                  font-style: normal;
                  line-height: 15px;
                  border-bottom: 1px solid #505DD8;
                }
              }
            }
          }
        }
      }
      .dialog-footer{
        i{
          font-size: 14px;
          color: #fff;
          vertical-align: baseline;
          display: inline-block;
        }
        .el-button--warning{
          background-color:#50B3D8;
          border-color: #50B3D8;
        }
      }
    }
  }
</style>
