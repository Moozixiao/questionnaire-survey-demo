# 软件开发需求收集系统

## 项目概述

软件开发需求收集系统是一个面向项目启动阶段的交互式前端应用，旨在系统化捕获业务和技术需求。系统通过动态分支问卷引擎实现灵活问答，支持必填验证、跳过逻辑、进度追踪，并在最终生成摘要报告与可视化分析。

## 技术栈

- **前端框架**：SvelteKit
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **测试**：Vitest
- **图表库**：Apache ECharts
- **状态管理**：Svelte Store

## 功能特性

### 动态问卷引擎
- **分节管理**：问卷分为项目核心、技术层面、后勤规划三个逻辑模块
- **分支逻辑**：根据回答显示不同的后续问题
- **必填验证**：未回答必填问题无法进入下一步
- **跳过逻辑**：可选问题允许跳过，系统自动标记为“待定/待定义”

### 进度追踪
- **模块级进度**：显示当前模块的完成度
- **整体进度条**：显示整个问卷的完成百分比

### 报告生成与可视化
- **摘要视图**：按模块汇总答案，并标记“待定/需澄清”问题
- **可视化分析**：
  - 技术复杂度：雷达图
  - 功能分布：饼图
  - 风险等级：柱状图
- **导出功能**：支持PDF/Excel导出报告

## 项目结构

```
/src
  /components
    /layout
      - SideNavBar.svelte        # 侧边导航栏
      - TopNavBar.svelte         # 顶部导航栏
      - MobileNavBar.svelte      # 移动端底部导航栏
      - ProgressBar.svelte       # 进度条组件
    /questionnaire
      - QuestionCard.svelte      # 问题卡片组件
      - QuestionNavigator.svelte # 问题导航组件
      - ValidationMessage.svelte # 验证消息组件
    /report
      - ReportGenerator.svelte   # 报告生成组件
      - ChartComponents.svelte   # 图表组件
    /common
      - Loading.svelte           # 全局加载组件
      - Button.svelte            # 按钮组件
      - Card.svelte              # 卡片组件
  /stores
    - answerStore.ts             # 答案存储
    - navigationStore.ts         # 导航状态存储
    - userStore.ts               # 用户状态存储
    - loadingStore.ts            # 加载状态存储
  /lib
    - questionnaireLogic.ts      # 问卷逻辑
    - chartUtils.ts              # 图表工具
    - api.ts                     # API调用
  /routes
    - /dashboard                 # 仪表盘
    - /questionnaire             # 问卷页面
      - /project-core            # 项目核心模块
      - /technical               # 技术层面模块
      - /logistics               # 后勤规划模块
    - /report                    # 报告页面
  /types
    - index.ts                   # 类型定义
  /data
    - questions.ts               # 问卷数据
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run check
```

## 核心组件

### 布局组件
- **SideNavBar**：侧边导航栏，显示模块列表和用户信息
- **TopNavBar**：顶部导航栏，显示应用标题和主要导航项
- **MobileNavBar**：移动端底部导航栏，适配小屏幕设备
- **ProgressBar**：进度条组件，显示问卷完成进度

### 问卷组件
- **QuestionCard**：问题卡片组件，支持多种问题类型
- **QuestionNavigator**：问题导航组件，处理问题切换和分支逻辑
- **ValidationMessage**：验证消息组件，显示表单验证错误

### 报告组件
- **ReportGenerator**：报告生成组件，汇总答案并生成可视化报告
- **ChartComponents**：图表组件，使用ECharts实现各种可视化图表

### 通用组件
- **Loading**：全局加载组件，提供统一的加载状态反馈
- **Button**：按钮组件，提供统一的按钮样式
- **Card**：卡片组件，提供统一的卡片样式

## 状态管理

- **AnswerStore**：管理问卷答案、进度和版本历史
- **NavigationStore**：管理导航状态、当前问题和分支逻辑
- **UserStore**：管理用户信息和偏好设置
- **LoadingStore**：管理全局加载状态

## API调用

系统使用统一的API调用规范，封装在`src/lib/api.ts`中，包括：

- **questionnaireApi**：问卷相关API
- **reportApi**：报告相关API
- **userApi**：用户相关API
- **systemApi**：系统相关API

## 开发规范

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 组件命名使用PascalCase
- 变量和函数命名使用camelCase
- 常量命名使用UPPER_CASE

### 模块化设计
- 组件化开发，每个组件职责单一
- 逻辑与UI分离，核心逻辑封装在lib目录
- 状态管理集中化，使用Svelte Store

### 文档管理
- 代码注释清晰明了
- README.md提供项目基本信息和使用说明
- 详细的task任务文档，明确开发范围和验收标准

## 测试

使用Vitest进行单元测试，测试覆盖率目标：
- 核心逻辑组件 ≥ 80%
- UI渲染/交互组件 ≥ 70%

## 部署

系统可以部署到任何支持SvelteKit的托管平台，如Vercel、Netlify、GitHub Pages等。

## 许可证

MIT License