<template>
  <div class="resume-inner">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="name"
        label="职位名称">
      </el-table-column>
      <el-table-column
        prop="place"
        label="工作地点">
      </el-table-column>
      <el-table-column
        prop="workLife"
        label="工作年限"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="education"
        label="学历">
      </el-table-column>
      <el-table-column
        prop="jobType"
        label="院校"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{handleJobType(scope.row.jobType)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
          type="primary"
          size="small"
          @click="putJobState(scope.row.id)">
            {{tabIndex=== '1' ? '下线' : '上线'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="resume-inner__pagination">
      <div class="resume-inner__pagination--button">
        <el-button
        type="primary"
        size="small"
        >
          {{tabIndex=== '1' ? '下线' : '上线'}}
        </el-button>
      </div>
      <el-pagination
        background
        :page-size="pageSizeAlias"
        :current-page="currentPageAlias"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="totalAlias">
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
import { mapGetters } from 'vuex';

export default {
  name: 'JobTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
    tabIndex: String,
    total: Number,
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      multipleSelection: '',
      dialogVisible: false,
      totalAlias: null,
      currentPageAlias: null,
      pageSizeAlias: null,
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
  watch: {
    total(val) {
      this.totalAlias = val;
    },
    currentPage(val) {
      this.currentPageAlias = val;
    },
    pageSize(val) {
      this.pageSizeAlias = val;
    },
  },
  created() {
    this.$nextTick(() => {
      this.initData();
    });
  },
  methods: {
    initData() {
      this.currentPageAlias = this.currentPage;
      this.pageSizeAlias = this.pageSize;
    },
    handleJobType(id) {
      return this.jobTypeObject[id].description;
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      // console.log(selection);
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val);
    },
    handleRowClick() {
      // this.dialogVisible = true;
    },
    putJobState(id) {
      this.$emit('putJobState', id);
    },
    handleClose(done) {
      done();
    },
  },
  computed: {
    ...mapGetters({
      jobTypeObject: 'handleJobTypeObject',
    }),
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
