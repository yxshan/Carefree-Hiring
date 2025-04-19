# 项目名称

[项目简介] 基于 Vue.js 的前端项目，包含任务管理、合同处理、消息系统、个人中心等模块。

---

## 🚀 功能特性

- **用户系统**：登录/注册、实名认证、身份切换
- **任务管理**：任务搜索/详情查看、企业任务源展示
- **合同管理**：合同进度跟踪、详情查看
- **消息中心**：系统消息/对话消息双模式
- **人才库**：人才信息浏览与详情展示
- **个人中心**：账户管理、简历维护、收藏夹

---

## 📂 项目结构

```bash
├── assets/                          # 静态资源
│   ├── img/                        # 图片资源
│   │   └── icon/                   # 图标类图片（建议按尺寸细分 24x24/48x48）
│   └── css/                        # 样式资源
│       └── style.scss              # 全局公用样式（建议拆分为 variables/mixins 等）
│
├── components/                     # 公共组件库
│   ├── list/                       # 列表组件集合
│   │   ├── TaskList.vue           # 任务列表组件（建议抽象通用列表组件）
│   │   ├── ContractList.vue       # 合同列表组件
│   │   ├── MessageList.vue        # 消息列表组件
│   │   └── TalentList.vue         # 人才列表组件
│   └── FooterTabbar.vue           # 底部导航栏组件（建议增加路由联动）
│
├── api/                            # 接口服务层
│   ├── user.ts                    # 用户认证接口（登录/注册/权限）
│   ├── task.ts                    # 任务模块接口（任务CRUD）
│   ├── contract.ts                # 合同模块接口（合同状态管理）
│   ├── message.ts                 # 消息模块接口（站内信/系统通知）
│   ├── my.ts                      # 个人中心接口（账户/简历/收藏）
│   └── talent.ts                  # 人才模块接口（人才库管理）
│
├── router/                         # 路由配置
│   └── index.ts                   # 路由管理中心（建议拆分模块化路由）
│
└── views/                          # 页面视图层
    ├── login/                      # 登录认证模块
    │   ├── index.vue              # 登录页（集成第三方登录入口）
    │   ├── serviceAgree.vue       # 服务协议页（建议使用富文本渲染）
    │   └── privacyPolicy.vue      # 隐私政策页
    │
    ├── task/                       # 任务模块
    │   ├── index.vue              # 任务列表主页（含筛选条件）
    │   ├── search.vue             # 任务搜索页（历史记录功能）
    │   ├── details.vue            # 任务详情页（状态流转按钮）
    │   └── companySource.vue      # 公司任务聚合页
    │
    ├── contract/                  # 合同模块
    │   ├── index.vue             # 合同管理主页（状态分类导航）
    │   ├── details.vue           # 合同详情页（电子签名区域）
    │   └── progress.vue          # 合同进度追踪页（时间轴展示）
    │
    ├── message/                   # 消息中心
    │   ├── index.vue             # 消息总览页（分系统/对话Tab）
    │   ├── system.vue            # 系统消息列表（批量操作）
    │   ├── systemDetails.vue     # 系统消息详情页（富文本展示）
    │   └── talk.vue              # 即时对话页（集成WebSocket）
    │
    ├── my/                        # 个人中心
    │   ├── index.vue             # 个人主页（快捷入口导航）
    │   ├── user/                 # 用户身份管理
    │   │   ├── index.vue         # 个人信息页（头像/昵称编辑）
    │   │   ├── authReal.vue      # 实名认证页（OCR识别）
    │   │   ├── certified.vue     # 认证完成页（展示认证信息）
    │   │   └── identitySwitch.vue # 身份切换页（企业/个人）
    │   ├── set/                  # 系统设置
    │   │   └── index.vue         # 设置主页（通知/缓存管理）
    │   ├── feedback/             # 用户反馈
    │   │   └── index.vue         # 反馈提交页（上传附件）
    │   ├── account/              # 账户管理
    │   │   ├── index.vue         # 账户总览（余额/交易记录）
    │   │   ├── advance.vue       # 提现申请页（绑定银行卡）
    │   │   ├── coinExplain.vue   # 虚拟币说明页（使用规则）
    │   │   └── depositExplain.vue # 押金说明页（退还流程）
    │   ├── resume/               # 简历管理
    │   │   ├── index.vue         # 简历列表（在线编辑入口）
    │   │   └── preview.vue       # 简历预览页（PDF导出）
    │   └── collect/              # 收藏管理
    │       └── index.vue         # 收藏聚合页（分类筛选）
    │
    └── talent/                    # 人才库模块
        ├── index.vue             # 人才搜索列表（高级筛选）
        └── details.vue           # 人才详情页（联系入口）
