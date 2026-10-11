# 项目协作规则

- Astro + TypeScript + 原生CSS，GitHub Pages子路径 `/botan-sake/`；源代码在 `src/`，配置/锁文件和 `.github/workflows/` 保持现有架构。
- 酒款新增/修订、商品URL、图片/截图、规格考据、介绍/风味/背景、新卷和跨卷关联任务，先使用 [.agents/skills/update-sake-catalog/SKILL.md](.agents/skills/update-sake-catalog/SKILL.md)。普通CSS修改、文档错字不必执行完整酒款流程。
- 原始素材在 `第N巻/products/`、`scenes/`，基础文字在 `info.txt`；人工覆盖及确认状态在 `data/manual.json`，网站说明在 `data/site.json`。
- `data/catalog.json`、`imported.json`及 `public/images/` 是派生输出，不能作为唯一人工入口；合并修改，不覆盖其他商品或未提交工作。
- 不重新压缩、覆盖、重命名或删除原始图、截图、textClipping备份；研究/发布历史和原图哈希、回归基准保留，先查引用再整理。
- 永久ID不随名称/排序改动。新记录保持unreviewed，不自动确认；confirmed仅由用户明确核对，不能因资料链接存在就确认作品识别。
- 产品与登场分别维护；跨卷productId必须明确核实，不按相似名称自动合并。
- 规格、简介、风味和背景需实际可核实的具体来源、日期及版本；不混用年份/NV/Reserva/批次，未核实留空，冲突记录在研究报告。
- 不编造酒款、登场、数值或试饮评价；分类需categorySource，风味需来源归属。
- 内容变更至少运行 `npm run verify`，重要可见变更在可用时做本地浏览器验收。文档整理检查相对链接和Skill格式；不得关闭测试或静默改写历史基准。
- 默认本地工作；未经用户明确授权对应动作，不自动commit、git push或部署。已有覆盖当前工作的明确授权无需重复确认；发布必须正常推送，核对Actions提交SHA和实际线上结果。
- 不force push，不git reset --hard/git clean -fd，不修改或删除旧 `icytail176/image-host` 仓库。

详细规则按需读取 [内容](docs/CONTENT_GUIDE.md)、[考据](docs/RESEARCH_GUIDE.md)、[部署](docs/DEPLOYMENT.md)。
