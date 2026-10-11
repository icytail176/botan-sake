# 第四轮交付 — 链接更新与正式发布准备

**本地准备及验收完成，按用户要求停在首次公开发布确认阶段。GitHub仓库尚未创建；尚未提交、push、部署或执行线上验收。旧image-host未改动。**

第4款v01-004的商品URL已改为 [Dragee W-SK18070901](https://www.dragee.co.jp/fs/dragee/W-SK18070901)，维护入口为第1巻/info.txt，重复导入保持新链接。manual.json原先无URL覆盖，仅更新未核实版本原因；导入生成catalog/imported后，详情正确使用新URL。原名称及confirmed保留。

新页面HTTP200，商品编号吻合，明确标为Brut Nature NV。生产者、葡萄、Spain/DO Cava仅确认该销售条目，未取得Reserva对应或共通属性的可靠证据；未见明确酒精度，不套用NV参数。其他9款资料、全部登场记录/图片关联、39条规格及来源不变。旧Roger链接保留历史可追溯记录，正式页面不再引用。

| 本地检查 | 结果 |
| --- | --- |
| npm run verify | 11项测试、导入、类型、构建、链接校验通过 |
| npm run build | 独立构建通过，13HTML / 12sitemap / 271内部引用 |
| 数据与图片 | 10款 / 10confirmed / 39规格；21原文件哈希不变；连续导入不覆盖人工数据 |
| Chrome四种屏宽 | 375 / 390 / 768 / 1440px通过；10详情、关于页、404、图片、筛选、Lightbox、导航无溢出或错误 |
| 商品链接与来源 | 当前URL正确，其他9款未变；逐行参数/来源通过 |
| GitHub | 登录icytail176可用；目标查询返回404；仅初始化本地main，使用GitHub noreply身份 |
| GitHub Actions / Pages | 官方方案已复核，本地满足部署条件；未实际执行 |
| 线上网站 | 预期 https://icytail176.github.io/botan-sake/ ，尚未部署及线上验收 |

变更文件：第1巻/info.txt、data/manual.json、data/site.json、关于页、构建/浏览器检查、package.json、.gitignore、工作流的小幅锁文件自动识别修正及README/研究/发布报告。未重做首页或图片。

关于页已保留非官方/权利声明，增加GitHub Issues公开反馈入口；无私人邮箱。新仓库创建后入口才生效。

- [完整发布检查与待确认素材范围](release-preflight.md)
- [待公开文件清单](release-files.txt)
- [第四轮版本研究记录](specification-research.md)
- 数据回归：round4-preservation.json；浏览器：browser-validation.json（local）；构建：build-validation.json；元数据：image-metadata-audit.json。
- 上轮交付保留为round3-delivery.md。原剪辑与历史快照仅作追溯，不参与网站图片链接。

待人工确认：允许公开代码/历史资料、10张商品图、10张漫画截图及其网站副本/缩略图，并接受以GitHub Issues接收公开纠错/删除请求。确认后才创建/连接远程、提交main、推送、配置Pages、等待Actions、执行实际线上四种屏宽验收。没有以本地结果替代线上结果。

今后更新只需添加图片、维护info.txt和必要人工资料，执行 npm run verify，再正常commit/push main；Actions自动发布。发布后可执行 npm run test:online验证正式网站。完整操作见README。
