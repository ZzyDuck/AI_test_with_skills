# AI_test_with_skills

AI驱动的自动化测试项目设计。

## 核心功能

- **测试自动化**：基于Playwright的端到端测试，支持自动生成、执行、修复和报告
- **功能点提取**：爬取网站功能点，支持导出到飞书
- **AI集成**：基于GLM 5.1大模型，实现智能测试用例生成


## 4个核心skill：
- **function-analyzer**
- **menu-crawler**
- **playwright-test**
- **test-case-design**

## 使用方法：
和trae直接对话，推荐用GLM-5.1
.env中进行url、用户名、密码、飞书资源等等配置

- **1、用menu-crawler skill生成菜单目录，输出为文件menu_tree.json**
- **2、根据menu_tree.json，调用function-analyzer skill分析功能点，生成function_analysis.json（飞书表格）**
- **3、根据function_analysis.json，调用test-case-design skill生成对应测试用例（test-case-design内，飞书表格）**
- **4、根据测试用例调用test-case-design skill，生成对应代码和报告**
