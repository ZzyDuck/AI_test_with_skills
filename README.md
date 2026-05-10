# AI_test_with_skills

> AI驱动的自动化测试项目，专为亚信科技统一身份认证与访问管理系统（IAM）设计。

## 核心功能

- **测试自动化**：基于Playwright的端到端测试，支持自动生成、执行、修复和报告
- **功能点提取**：爬取网站功能点，支持导出到飞书
- **AI集成**：基于GLM 5.1大模型，实现智能测试用例生成

## 技术栈

- 测试框架：Playwright + TypeScript
- AI模型：GLM 5.1
- 后端：Java（端口9432）
- 工具脚本：Python

## 项目结构
├── .trae/skills/ # 技能模块（4个Skill）
├── playwright-tests/ # 测试代码
├── playwright-output/ # 测试输出
├── playwright-report/ # 测试报告
├── main.py # 功能点提取
├── feishu_service.py # 飞书集成
└── playwright.config.ts # Playwright配置


## 快速开始

```bash
# 安装依赖
pip install -r requirements.txt
npm install
npx playwright install

# 运行测试
npx playwright test

# 功能点提取
python main.py
测试覆盖模块
首页视图 | 用户中心 | 认证中心 | 访问控制 | 应用资源

工作流程
规划 → 生成 → 执行 → 修复 → 报告

作者
张子怡 (ZzyDuck)
