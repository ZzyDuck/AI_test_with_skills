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

- **1、用menu-crawler生成菜单目录，输出为文件menu_tree.json**
- **2、根据menu_tree.json，调用function-analyzer分析功能点，生成function_analysis.json**
- **3、根据function_analysis.json，调用test-case-design生成对应测试用例（test-case-design内）**
- **4、根据测试用例调用test-case-design，生成对应代码和报告**
