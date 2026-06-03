# AI_test_with_skills

> AI驱动的自动化测试项目，专为亚信科技统一身份认证与访问管理系统（IAM）设计。

## 核心功能

- **测试自动化**：基于Playwright的端到端测试，支持自动生成、执行、修复和报告
- **功能点提取**：爬取网站功能点，支持导出到飞书
- **AI集成**：基于GLM 5.1大模型，实现智能测试用例生成


## 项目结构
├── .trae/skills/ # 技能模块（4个Skill）
├── playwright-tests/ # 测试代码
├── playwright-output/ # 测试输出
├── playwright-report/ # 测试报告
├── main.py # 功能点提取
├── feishu_service.py # 飞书集成
└── playwright.config.ts # Playwright配置
