# 构建、验证与发布

本项目已正式发布：[网站](https://icytail176.github.io/botan-sake/)、[仓库](https://github.com/icytail176/botan-sake)。本地main跟踪origin/main；Pages来源为GitHub Actions，HTTPS已启用。无需重新初始化或创建仓库。

## 发布授权

默认只完成本地维护。Codex仅在用户明确授权相应Git提交、推送和发布时执行；已有覆盖本次变更的授权可直接继续，无需重复确认。内容修改不等于发布授权。不要force push，也不对旧icytail176/image-host执行任何写入/删除操作。

## 本地使用

使用 Node.js 22.12+（推荐 24 LTS）与 npm，在项目根目录执行：

```sh
npm ci
npm run dev
```

打开终端输出的 `http://127.0.0.1:4321/botan-sake/`。`dev` 会先扫描素材、更新数据和缩略图。浏览器可在没有 JavaScript 时阅读全部卡片与详情；即时筛选与弹窗需启用 JavaScript。

```sh
npm run import   # 仅更新导入数据、图片和报告
npm run clean:info # 可选：幂等整理维护用 info.txt，不读取历史剪辑
npm run check    # Astro / TypeScript 类型检查
npm run test     # 素材解析与数据安全测试
npm run build    # 导入 + 类型检查 + 静态构建 + 数据/路由/资源检查
npm run verify   # 单元测试 + 完整构建（CI 使用）
npm run preview # 预览已构建的 dist
```

Astro 的遥测在项目命令中关闭，避免向项目之外写配置。所有页面与资源路径经过统一 base 帮助函数，开发和发布均使用 `/botan-sake/`。


## 测试与报告

`npm run test` 当前包含18项测试：原14项数据/发布回归和4项第六轮维护验证。覆盖纯文本 / BBCode / Markdown、序号识别、手工字段验证、两卷重复商品关联、多张截图、人工数据保护、去重、派生恢复、白边、原图完整性、冲突/缺失报告，以及清理幂等性。发布回归测试在临时目录复制真实第1卷资料，连续导入并验证10个confirmed持久、历史剪辑不覆盖文本、新卷仍为unreviewed。规格检查来源引用、日期、空值和安全URL；维护测试模拟链接修改、已有真实精米歩合补充及下一卷素材关联，并检查文档链接。不会在正式资料中创建示例商品。

`npm run build` 额外检查数据引用、唯一 ID、800×800 缩略图、每个详情路由、所有内部 href/src、锚点、base 路径、所有页面 canonical、12 条 sitemap URL、旧图床引用、日文页面、全部图片编号关联、public/dist 原图副本和初始 21 个原始文件的 SHA-256；同时检查详情无可见内部编号/话数/页码、卷数存在、规格行数及来源锚点、无规格时不生成基本信息区域；结果为 `reports/build-validation.json`。

浏览器测试可在本机已安装 Google Chrome 的情况下执行：

```sh
npm run build
npm run preview
# 在另一个终端：
npm run test:browser
```

测试使用独立临时浏览器配置，覆盖 375 / 390 / 768 / 1440px，在深色偏好环境中验证网站保持正确的浅色对比度、2/3/4 列布局、方形白底图、无横向溢出、图片加载、日文搜索、分类与卷筛选、零结果重置、浏览器返回恢复筛选、所有详情路由、图片源对应、详情隐藏内部编号、卷数显示、每条规格标签/值/来源锚点、无空参数行、手机表格无横向溢出、前后导航、截图弹窗的遮罩/Esc/关闭按钮、键盘打开与焦点循环。本地截图输出在 `reports/screenshots/local/`，结果在 `reports/browser-validation.json`（明确标记 local）；`npm run test:online` 访问真实 Pages，输出独立的 `reports/online-validation.json` 和 `reports/screenshots/online/`。两者不能相互代替。测试还检查商品链接、canonical、sitemap、关于页反馈入口和真实缺失路由的 404。这是本机 Chrome 测试，未代表 Safari、Firefox 或真实 iOS/Android 全部通过。


## GitHub Pages 发布

参考 [Astro 官方 Pages 文档](https://docs.astro.build/en/guides/deploy/github/)。配置为 `site: https://icytail176.github.io`、`base: /botan-sake`。工作流复用 checkout@v7、withastro/action@v6、deploy-pages@v5，Node 24；由 package-lock.json 自动识别 npm，按锁文件安装，并执行 npm run verify。build 失败会阻止 deploy；main 推送和 workflow_dispatch 均可触发。

**首次发布完成（2026-10-11）。** 用户已明确确认公开范围。公开仓库 [icytail176/botan-sake](https://github.com/icytail176/botan-sake) 已创建，main 已提交并正常推送；Pages Source 为 GitHub Actions，HTTPS 已启用。[首次构建与部署](https://github.com/icytail176/botan-sake/actions/runs/38112645236) 均成功，线上四种屏宽与全部详情/交互已验收通过。没有需要用户手工完成的 GitHub 权限设置。

本地 main 已跟踪 origin/main，提交身份使用 GitHub noreply。不要重复 git init、创建同名仓库或 remote add，也不要 force push。关于页保留非官方/图片权利声明；公开反馈入口 [GitHub Issues](https://github.com/icytail176/botan-sake/issues) 已启用，contactEmail 仍为 null。发布前素材范围和99个文件的审查记录保留用于追溯。

本次 Git 推送遇到默认解析地址连接异常，使用经公共 DNS 核实的可连接地址作为单次命令参数后成功；未修改系统 DNS、全局 Git 配置或保存固定 IP。以后若普通 git push 超时，应先检查网络/DNS，而不是永久固定此次地址。仓库认证、Pages 和 Actions 权限已经配置完成。

正式地址为 https://icytail176.github.io/botan-sake/ 。部署完成后可执行：

```sh
npm run test:online
```

该命令无需本地服务器，直接测试正式地址在 375 / 390 / 768 / 1440px 的页面、全部详情、图片、搜索/筛选、Lightbox、导航、商品与参数链接、canonical、sitemap 和 404。需本机安装 Google Chrome。只有产生标记 online 的通过报告，才能声称线上验收通过。

公开源码中保留维护资料与历史报告；旧商品 URL 可在历史记录中出现，网站构建不再引用它们。旧 icytail176/image-host 不参与新站资源、部署或任何写操作，不能在本轮删除。


## 提交与确认上线

仅在获得发布授权后执行以下步骤：

1. 检查 `git status`、分支和 `git diff`，保留已有未提交修改。读取 `git remote -v`，确认目标为icytail176/botan-sake。
2. `git fetch origin main` 后比较 `git log --oneline HEAD..origin/main` 与 `git log --oneline origin/main..HEAD`。有远程更新时检查并妥善合并，冲突不靠强推处理。
3. `npm run verify`；可见内容的重要变化完成本地浏览器检查。确认没有凭证、私人文件、缓存、dist、node_modules或测试截图待提交；原素材公开范围变动时按用户要求确认。
4. 按本次修改范围显式 `git add <文件路径>`，再检查 `git diff --cached`、`git diff --cached --check`。正常 `git commit -m "Update sake archive"`，`git push origin main`。此处路径占位符不能原样执行。
5. `git rev-parse HEAD` 保存实际提交SHA；`gh run list --repo icytail176/botan-sake --commit <SHA>` 查对应运行，`gh run watch <运行ID> --repo icytail176/botan-sake --exit-status` 等待结果。没有gh时在仓库Actions页面核对提交。
6. `gh run view <运行ID> --repo icytail176/botan-sake --json headSha,status,conclusion,jobs,url` 确认headSha一致、build和deploy均success；不要只凭push成功宣称部署完成。
7. 再运行 `npm run test` 与 `npm run test:online`，访问真实站点检查修改内容、图片和资源路径。线上浏览器报告会更新，先保留需要追溯的上一版证据。文档或测试限制应如实写入交付记录。

## 常见故障

| 症状 | 检查与处理 |
| --- | --- |
| 图片或内部链接404 | 检查所有资源/路由使用 `/botan-sake/`，对照build-validation报告，不改成根路径。 |
| 新资料未出现 | 检查manual覆盖优先级、info编号、导入报告；确认Actions实际SHA与部署job，必要时等待缓存更新再读页面。 |
| 构建失败 | 查看第一个失败步骤；修正数据、来源或编号冲突，不跳过验证。 |
| push连接超时 | 检查网络/DNS及GitHub状态，重试前确认远程状态；不要固定历史IP或改全局配置。 |
| 认证/Pages权限不足 | 使用现有登录，检查仓库写权限及Settings → Pages → Source为GitHub Actions；需要人操作时给出准确步骤。 |

首次发布和第五轮上线记录保留于[第四轮交付](../reports/round4-delivery.md)、[第五轮交付](../reports/DELIVERY.md)、[第五轮发布记录](../reports/release-round5-2026-10-11.json)。最近内容提交7a905b8，后续交付记录提交51f7ecd；历史结果不代表未来改动自动上线。

macOS Chrome自动化未能验证原生select方向键提交（无样式select也复现）；Tab焦点及点击筛选已测，方向键/Enter需人工确认。Windows、Safari与手机真机未实测。Header精简与下拉箭头18px属于现有页面设计，本轮维护文档不改变它们。
