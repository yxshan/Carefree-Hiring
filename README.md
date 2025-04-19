# 静态资源
assets                      
  img                       图片资源
    icon                    icon图标类图片
  css                       样式资源
    style.scss              公用样式
 
# 公共组件
components
  list                      列表组件
    TaskList.vue            任务文件
    ContractList.vue        合同列表
    MessageList.vue         消息列表
    TalentList.vue          人才列表
  FooterTabbar.vue          底部导航栏

# api接口
api
  user.ts                   登录模块
  task.ts                   任务模块 
  contract.ts               合约模块
  meseage.ts                消息模块
  my.ts                     我的模块
  talent.ts                 人才模块

# 路由
router
  index.ts                  路由管理页面

# 项目页面结构
views 
  login
    index.vue               登录页 
    serviceAgree.vue        服务协议
    privacyPolicy.vue       隐私政策
  task
    index.vue               任务主页
    search.vue              任务搜索
    details.vue             任务详情
    companySource.vue       公司任务主页
  contract
    index.vue               合同主页
    details.vue             合同详情
    progress.vue            合同进度
  message       
    index.vue               消息主页
    system.vue              系统消息列表
    systemDetails.vue        系统消息详情
    talk.vue                对话消息
  my
    index.vue               我的主页
    user                    用户中心
      index.vue             个人信息主页
      authReal.vue          实名认证
      certified.vue         已完成实名认证
      identitySwitch.vue    切换身份
    set                     设置
      index.vue             设置主页
    feedback                意见反馈
      index.vue             反馈主页
    account                 我的账户
      index.vue             账户主页
      advance.vue           账户提现
      coinExplain.vue       无忧币说明
      depositEXplain.vue    押金说明
    resume                  我的简历
      index.vue             简历主页
      preview.vue           简历预览
    collect                 我的收藏
      index.vue             收藏主页
  talent
    index.vue               人才主页
    details.vue             人才详情# Carefree-Hiring
