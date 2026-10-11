# 第六轮：项目与Skill整理（本地）

2026-10-11。开始时main跟踪origin/main，HEAD为51f7ecd6e456b9328267882adb4f27398ea52371，工作区和暂存区干净。本轮不提交、不推送、不触发Actions、不重新发布；第五轮已发布交付报告和线上验收历史保持原位。

## 文件清单与处理

初始114个跟踪文件、无未跟踪文件。分类详见[round6-inventory.json](round6-inventory.json)：A人工原始24、B代码/配置/入口文档27、C可再生输出35、D历史研究/验证28、E已确认临时文件0。根目录全部条目包含在清单中。

未删除或移动任何已有文件。node_modules、dist、.astro及本地测试截图是有效的忽略输出，保留供运行和验收，不为美观重装或清理。未发现需要删除的未忽略日志或系统缓存，也没有用途不明的文件需要人工确认。

所有卷内原图/截图/info.txt、manual.json、site.json、textClipping、30派生图片和全部历史报告保留原位。original-checksums由构建脚本读取；round5-before、round5-nv-baseline、round5-nv-before由回归测试读取，不能移动或随意重写。

README由320行变为98行；复杂说明按职责迁移到[内容](../docs/CONTENT_GUIDE.md)、[考据](../docs/RESEARCH_GUIDE.md)、[部署](../docs/DEPLOYMENT.md)。旧分类为空/39条为当前总数等过时说明已改为现行NV、ワイン、54条；原研究历史未覆盖。保留命名、文本格式、JSON、跨卷关联、图片处理/恢复、来源约束、测试和发布细节。

## AGENTS与Skill

根[AGENTS.md](../AGENTS.md)16行，规定维护入口、素材/ID/人工数据保护、确认权限、来源与版本、验证及发布边界。普通CSS/文档任务不强制完整酒款流程。

[update-sake-catalog](../.agents/skills/update-sake-catalog/SKILL.md)具有name和description的有效YAML，位于项目.agents/skills目录；按需引用docs，复用现有脚本。自动匹配保留默认，不修改全局配置。符合[官方技能发现规范](https://learn.chatgpt.com/docs/build-skills)。

在本项目中可输入：`使用 $update-sake-catalog 更新第1巻第4款的商品URL，仅本地验证，不发布。` 也可自然语言描述新增酒款、截图、规格或卷数。Codex按description匹配；若界面未出现，重新打开项目任务/重启Codex并检查技能选择器。格式和路径验证不等于本会话UI已动态加载，未宣称自动触发行为已由独立模型证明。

## 验证方式与状态

现有Skill Creator quick_validate用于完整YAML/命名/未完成占位校验。所用Python缺少PyYAML，依赖仅装在临时目录，不修改项目依赖。运行命令和结果见[机器验收记录](round6-validation.json)。

新增tests/maintenance.test.mjs：A在临时副本同步修改info及manual URL并连续导入；B移除再补回已核实秩父錦50%精米歩合并检查真实来源/无效引用拒绝；C用现有真实素材在临时下一卷模拟两张截图，检查同名不自动合并、手工productId关联和unreviewed保持。所有fixture结束自动删除，只导入临时副本，无网络/Git/发布动作，不向正式图鉴新增虚构酒款或参数。

第四项测试解析README/docs/AGENTS/Skill相对文件链接，检查npm命令存在和AGENTS对Skill引用。Skill发布边界经人工审阅：默认只本地，只有用户明确授权相应动作才提交/推送/发布；已有授权不重复确认。本轮没有调用任何远程写工具。此次是流程模拟和结构验证，未运行独立模型自动触发评估。

完整npm run verify通过：18项测试全通过，导入0警告，Astro0错误/警告；静态构建13页面、282内部链接、12个sitemap URL与30图片引用正常。10款全部confirmed、54规格、10介绍/9风味/6背景，21原始图/剪辑完整。整理前后113个已有跟踪文件（除README）逐字节不变，全部46个dist文件SHA-256完全一致，证明网页内容、样式和功能代码未改变。人工数据、图像关联、工作流、脚本和全部历史报告/基准不变。

README/docs/AGENTS/Skill/本记录的43个相对链接全部可解析；Skill Creator格式验证通过，AGENTS引用正确。没有渲染变化，因此没有重跑浏览器或线上验收；第五轮既有四宽浏览器证据保留，不能把本次文档验证称作新线上部署。HEAD不变，暂存区未修改，无commit/push/Actions或旧仓库操作。无需人工确认清理项目；将来发布这些维护文件需另行明确授权。
