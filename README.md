# ぼたんの酒手帖

《上伊那ぼたん、酔へる姿は百合の花》的非官方日文酒款图鉴。Astro + TypeScript + 原生 CSS，完全静态生成，预设 GitHub Pages 地址为 https://icytail176.github.io/botan-sake/ 。第四轮已完成本地发布准备并初始化 main 仓库；首次公开发布等待用户确认，尚未创建远程仓库、推送或部署。旧 image-host 未改动。

## 日常更新（首次发布完成后）

1. 把同编号商品图和截图加入第N巻/products、scenes，更新该卷 info.txt 的名称与商品链接。
2. 需要时在 data/manual.json 确认识别或修改参数及证据；新增卷、酒款无需修改页面组件。
3. 执行一次 `npm run verify`，检查导入报告和本地预览。
4. `git add .` → `git diff --cached --stat` → `git commit -m "Update sake archive"` → `git push origin main`。
5. GitHub Actions 自动构建、发布。首次部署或关键改动后运行 `npm run test:online` 验收实际线上网站。

当前完整发布检查与待确认素材范围见 [发布准备记录](reports/release-preflight.md)。

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

## 已检查的本地资料

实际目录为 `第1巻/`（日文「巻」）。商品图与作品截图均为 `1` 至 `10`，包含 `.jpg`、`.jpeg`、`.png`、`.webp`。原文字并不在卷目录，而在根目录的 macOS `已粘贴 2026-10-11 上午11.06.17.textClipping`。第一轮已一次性提取其 UTF-8 文本；第二轮将 `第1巻/info.txt` 整理为纯文本。原剪辑保留不变，仅作为历史备份，任何导入命令都不会用它覆盖维护用资料。

导入按资料中的编号对应图片。`info.txt` 现在按 001–010 排列，删除了 size/url/img/center 的 BBCode、旧图床图片 URL、对齐空格及过时的不确定备注；完整名称和商品信息 URL 保持原样。旧图床链接仅在原始剪辑与历史资料中保留，不用于页面或资源。

当前导入 10 款酒、10 个登场记录、10 张商品图和 10 张作品截图。用户已人工确认全部 10 款，`data/manual.json` 中 v01-001 至 v01-010 全部为 `confirmed`；第 4 款旧备注已清除，分类仍留空。确认状态仅表示作品内的銘柄对应关系，不表示图片来源或版权已确认。所有资料未提供话数或页码，均留空。分类来自名称中明确的酒类词或已检查的官方商品页面，依据单独保存在 `data/manual.json`。第三轮已在商品层补充经过来源核对的规格；不编造口味、价格或饮用建议，无法核实的数值留空。详情只显示登场卷数，永久 ID、话数/页码出处仍在数据层保留。

## 目录与数据职责

```text
第1巻/                       按卷维护，原始图片不改名、不删除、不覆盖
  products/                  商品原图
  scenes/                    作品截图
  info.txt                   可编辑原始文字资料
第2巻/                       未来添加真实资料时再创建
scripts/archive.mjs          扫描、解析、验证、缩略图与去重
scripts/import.mjs           导入命令入口
scripts/clean-info.mjs       可选纯文本整理，不读取历史剪辑
scripts/validate-build.mjs    构建数据、链接、资源、原图完整性检查
data/imported.json           自动导入快照（不要手工编辑）
data/manual.json             人工修订（导入脚本永不写入）
data/catalog.json            自动合并后的最终数据（不要手工编辑）
data/site.json               作品信息、可选公开邮箱与 GitHub Issues 入口
public/images/originals/     原图的内容哈希副本（不重新压缩）
public/images/thumbs/        800 × 800 WebP 派生图
reports/import-report.md     可读的检查清单
reports/import-report.json   文件库存、哈希、编号和详细问题
reports/original-checksums.json  初始原图/剪辑校验基准
reports/DELIVERY.md           最新本地交付报告
src/                         Astro 页面、组件、样式
.github/workflows/deploy.yml GitHub Pages 工作流
```

报告、自动数据和必要的 `public` 图片都可跟随源代码提交。`dist/`、`node_modules/`、`.astro/` 不提交。浏览器验收截图建议保留在本地，避免仓库膨胀。

## 如何新增一款酒

1. 在对应卷目录的 `products/` 加入商品图片，如 `011.jpg`。
2. 在 `scenes/` 加入同编号截图，如 `011.png`。
3. 在卷目录 `info.txt`（或 `.md`、`.markdown`）加入带编号的名称与已有信息。
4. 执行 `npm run verify`，一次完成导入、图片处理、数据回归测试、类型检查、构建与链接校验，再阅读 `reports/import-report.md`。新增记录默认待人工确认。

编号 `1` 和 `001` 都能读取，推荐以后统一用三位数字。ID 为 `v01-011`，不随排序变化。已有原图不需要为了统一命名而重命名。

### 图片命名

支持 JPG、JPEG、PNG、WebP，扩展名不区分大小写。文件名需为纯数字或「数字-序号」「数字_序号」。

```text
products/001.jpg
scenes/001-01.png
scenes/001-02.jpg
scenes/001-03.webp
```

同一酒可有多张截图，按后缀序号排列。也支持多张商品图；无后缀文件优先，其次按序号作为首页主图，详情显示全部。

同一目录出现 `1.jpg` 和 `001.png`，都代表同一个主图编号，会报告冲突并阻止更新最终索引和构建。相同截图序号也视为冲突，不会随意择一。无法解析的文件名报告为 `unmatched-file`，不匹配到商品；缺图时显示占位。`.DS_Store` 等隐藏系统文件忽略。

### 文字资料格式

推荐一条记录以编号开头，各字段独占一行：

```text
001. 你已经确认的日文酒名
URL: https://example.com/product
分類: 日本酒
出典: 第○話 p.○（仅填写可靠资料）
識別: 未確認
備考: 你的原始备注

002. 第二款真实酒名
```

当前第 1 卷使用同样的「三位编号＋名称、URL」格式；分类、出典和备注只在有可靠资料时填写。不必把确认状态重复写入 info.txt，推荐统一由 `data/manual.json` 管理。

上述是格式说明，不是新建的真实酒款数据。不要将示例 URL 或虚构资料直接加入实际卷目录。

支持 `1. [名称](https://...)`、Markdown 标题及原资料的 `[size=20]1.[url=...]名称[/url][/size]`。`[img]` 标签内内容不导入。编号开头的名字是名称；后续无标签的纯文本作为备注。链接仅接受 HTTP(S)。分类只接受 `ビール / 日本酒 / 焼酎 / ウイスキー / ワイン / その他`，未知值报告并留空；未提供分类时不会自动根据图片推测。

识别状态支持 `確定 / 确定 / confirmed`、`不确定 / 不確定 / 未確定 / 要確認 / 推定 / uncertain`、`未確認 / unreviewed`。名称后写「不确定」也会记录不确定状态。没有标记时保持 `unreviewed`，绝不自动标记确定。出典只读取明确字段，图片编号不会当成话数。

## 人工修订与再次导入

在 `data/manual.json` 填写需覆盖的字段。人工文件不会被任何导入命令改写。自动来源变化时，已填写的人工值仍优先；删除某个字段才重新使用自动值。名称不可为空；`url`、`category`、`notes`、`source` 可填 `null` 显式清空。

```json
{
  "products": {
    "v01-001": {
      "name": "人工核对后的准确名称",
      "url": "https://example.com/product",
      "category": "ワイン",
      "categorySource": "分类依据：资料文件或核对过的官方页面",
      "notes": "商品层面的人工备注"
    }
  },
  "appearances": {
    "v01-001": {
      "status": "confirmed",
      "source": "人工核对的卷、话、页信息",
      "notes": "这一次登场的识别备注"
    }
  }
}
```

修改实际文件时保留已有其他条目，示例内容只用于说明。写分类时必须同时填写可复核的 `categorySource`；人工字段拼写错误、未知分类、不安全 URL 会导致验证失败。原资料分类自带文字文件来源。不要仅凭商品名或信息网页，就把作品内照合状况标为确认。

### 日常人工维护速查

- 改名称、商品链接、商品备注：修改 `data/manual.json` 中对应 `products.ID` 的 `name`、`url`、`notes`；基础文字资料也可直接编辑卷内 info.txt，已有人工覆盖字段仍优先。
- 确认新记录：在 `appearances.ID` 合并写入 `"status": "confirmed"`。保留该条已有的 `productId`、`source` 和有意义的 `notes`。
- 清除旧登场备注：仅在确实过时时把该条 `notes` 设为 `null`；不要顺带清除其他记录的备注。
- 如需内部考据，可继续维护 `appearances.ID.source` 的话数/页码；详情页不显示此字段，只显示卷数。登场层面的有效备注放在 `appearances.ID.notes`。
- 人工确认只作用于写明的 ID；下一卷的同编号不会继承 confirmed。
- 维护后执行 `npm run verify`，检查报告，再 `npm run dev` 本地预览。浏览器验收另开终端运行 `npm run test:browser`，需先启动构建预览。

当前已确认记录不显示常规「確認済み」标签或确认状态行；只有真正待确认的记录才提示其照合状态。分类缺失仍可在首页「未分類」筛选中找到，详情不显示空分类标签。

## 商品规格与来源的长期维护

规格只编辑 `data/manual.json` 的 `products.商品ID`，不要手工修改自动生成的 `catalog.json` 或 `imported.json`。`specifications` 是按字段键保存的对象，可根据酒种增减；字段显示顺序就是 JSON 的填写顺序。每个非空参数必须有 `label`、带单位的 `value`、至少一个 `sourceIds`。下例摘自当前真实的秩父錦资料：

```json
"v01-003": {
  "specifications": {
    "ricePolishingRatio": {
      "label": "精米歩合",
      "value": "50%",
      "sourceIds": ["official"]
    },
    "abv": {
      "label": "アルコール度数",
      "value": "16%",
      "sourceIds": ["official"]
    },
    "acidity": null
  },
  "specificationSources": [
    {
      "id": "official",
      "title": "秩父錦公式 — 純米大吟醸",
      "url": "https://chichibunishiki.com/meishu/#a03",
      "checkedAt": "2026-10-11",
      "versionNote": "純米大吟醸 1.8L/720ml の商品欄。現行公式仕様。"
    }
  ],
  "specificationGaps": {
    "acidity": "官方该商品条目未提供酸度。"
  }
}
```

实际维护时**合并到现有商品条目**，保留其名称、分类、URL、备注以及其他规格和来源，不能用整个示例覆盖现有 JSON。

- 新增精米歩合：在对应商品的 `specifications` 增加 `ricePolishingRatio`，填写已核实的实际值。50% 是本款官网商品规格，不能因为名称含大吟醸便使用法定上限。
- 修改酒精度：编辑 `specifications.abv.value`，同时更新其证据来源、查询日及版本说明；不要只改数值。若原先在 `specificationGaps.abv` 记录未核实原因，确认后删除该原因。`specificationSources` 在此商品内统一维护。
- 新增来源：在 `specificationSources` 追加唯一的 `id`（小写字母/数字/连字符）、具体页面的 `title`、HTTP(S) `url` 和 `checkedAt`（YYYY-MM-DD）。参数的 `sourceIds` 指向这个 ID；来源 ID 可在不同商品中重复，但同一商品不能重复。表格的 [1] 等仅是当前页面的参考资料序号。
- 同一数值有多来源时，把它们全部列入该行的 `sourceIds`。`note` 可放在单个参数对象中，显示该数值的具体适用版本；来源的 `versionNote` 放在参考链接下显示。明确的版本差异必须说明，无法确认对应版本时，不任选一个数值。
- 无法核实：将该规格设为 `null`（或暂时不添加），并在 `specificationGaps` 用相同字段键记录原因。此维护记录不显示在网站，也不会生成空表格行；没有任何非空参数时，整个「基本情報」不生成。不要将猜测或「未確認」文本当作已核实的参数值。
- 灵活字段：日本酒可用 `designation`、`ricePolishingRatio`、`riceVariety`、`abv`、`sakeMeterValue`、`acidity`；啤酒可用 `brewery`、`style`、`ibu`；烧酎可用 `ingredients`、`koji`、`distillationMethod`；葡萄酒可用 `grapeVariety`、`grapeOrigin`、`vintage`。未来威士忌/琴酒可添加 `distillery`、`age`、`caskType`、`botanicals` 等字段，键使用小写开头的英文驼峰，显示名称在 `label` 中定义。不要求各酒种统一字段。
- 酒厂所在地用「蔵元所在地／ブルワリー所在地」标签，葡萄收获地用「ブドウ収穫地」，不要把公司地址、原料产地与产品产地混为一谈。

商品资料（名称、图片、URL、规格及其来源）属于 `products`；每一次作品登场（卷数、卷内编号、截图、照合状态与内部考据）属于 `appearances`。同款跨卷关联仍通过 `appearances.ID.productId` 指向同一个商品，规格无需复制到每次登场。

执行 `npm run import` 会读取基础 TXT/Markdown，再合并人工商品与登场数据；人工文件本身不会被写回。规格默认空对象/空来源列表，已填写的人工规格整体保留；重新运行 `npm run verify` 或从零恢复自动输出不会清除人工数据。来源缺失、空字符串、不安全 URL、无效日期、同一字段同时标为已核实/未核实，均会阻止验证。校验只能保证结构和引用，网页事实仍需要人工按具体版本复核。

当前核对结果为 **9 款、39 条有来源的规格**。第 4 款精确 Reserva 版本未核实，没有显示基本信息空块。逐条值、来源 URL、版本处理和待补字段见 [规格资料核对报告](reports/specification-research.md)。你今后仍只需收集图、名称、商品链接并确认识别；规格可以独立逐步补充，没有在线后台。

## 如何新增第 2 卷

创建 `第2巻/` 或 `第2卷/`，置入真实资料：

```text
第2巻/
  products/001.jpg
  scenes/001-01.png
  scenes/001-02.png
  info.txt
```

执行 `npm run import` 和 `npm run build`。脚本自动扫描根目录中 `第数字巻` / `第数字卷` 文件夹，编号可跨卷重复，新记录 ID 为 `v02-001`。卷筛选自动增加「第2巻」，无需改页面组件。不要同时创建 `第2巻` 和 `第2卷`，这会引发卷号冲突。

如果同一商品再次出现，先给新卷记录保留卷内 ID，再在人工登场数据中明确关联：

```json
"v02-001": { "productId": "v01-001", "source": "已核对的出处" }
```

这样商品只显示一张图鉴卡片，详情增加第二次登场，两个卷筛选都可找到该商品。商品资料集中编辑 `products.v01-001`。关联需要人工明确指定，脚本不会凭名称相似自动合并。合并后重复原图按内容哈希去重；同商品使用首次登场资料为自动基准、后续商品图作为补充。

若新资料是 macOS `.textClipping`，只在该卷还没有 `info.txt` 时进行一次性提取；已有维护用文本时，不得再次提取覆盖。普通 TXT/Markdown 无需转换。可使用 macOS 系统的 `plutil -p 文件.textClipping` 查看文本，或 Python 的 `plistlib` 读取 `UTI-Data.public.utf8-plain-text`。原剪辑请保留。如需统一资料格式，可运行 `npm run clean:info`。该命令只整理各卷已有 info.txt，重复执行不会重复记录；不会修改人工 JSON，也不会确认新记录。只有已有人工 confirmed 的记录会去掉旧的自动不确定标记，其余待确认信息和有意义的备注继续保留。

## 图片处理与恢复

商品缩略图使用 Sharp，处理流程为 EXIF 方向纠正、透明背景合成纯白、等比 contain 缩放到 800×800、白色填充、WebP 输出。没有裁切、拉伸、去背景或删除标签的处理。原图已有的非白背景或图中文字会完整保留。首页图片容器也为纯白正方形、`object-fit: contain`。

作品图片保持原始比例，原图副本不重新编码。弹窗可看完整图、纵向滚动、切换原寸；支持关闭按钮、Esc、点击遮罩；打开后聚焦关闭按钮，Tab/Shift+Tab 在弹窗内循环，关闭后恢复到触发图片的链接。禁用 JavaScript 时链接仍可打开原图。

派生图片文件名采用完整 SHA-256，同内容只生成一份。可以删除 `public/images/`、`data/imported.json`、`data/catalog.json`，然后 `npm run import` 完整恢复。请勿删除原始卷目录、`data/manual.json`。导入脚本不会清理历史派生图片，以避免误删；如需去除旧输出，可手动删除 **仅 `public/images/`** 后重新导入。

发生编号冲突时会写报告、保留上次最终 `catalog.json`，返回失败并停止构建。错误修复后重新导入。缺少名称的真实素材不会伪造品牌，页面明确显示「名称未登録」并列出需确认记录。

## 测试与报告

`npm run test` 当前包含 11 项测试，覆盖纯文本 / BBCode / Markdown、序号识别、手工字段验证、两卷重复商品关联、多张截图、人工数据保护、去重、派生恢复、白边、原图完整性、冲突/缺失报告，以及清理幂等性。发布回归测试在临时目录复制真实第 1 卷资料，连续导入并验证 10 个 confirmed 持久、无旧备注或 BBCode、历史剪辑不覆盖文本，模拟第 2 卷记录仍为 unreviewed。新增规格回归检查来源引用、日期、空值与安全 URL，验证手动修改数值后，自动文字变化与跨卷关联不会覆盖人工规格。不会在正式资料中创建示例商品。

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

**当前停在首次公开发布确认阶段。** Git 本地 main 已初始化、提交身份使用 GitHub noreply，尚无提交或远程。GitHub 登录账户 icytail176 可用；2026-10-11 只读查询目标仓库返回 404。不得重复初始化、force push、覆盖其他仓库或操作旧 image-host。

首次公开前：阅读发布准备记录及待提交文件清单，确认是否允许公开 10 张商品图、10 张漫画截图、它们的网站副本与缩略图。确认识别不等于确认图片权利；非官方声明已保留，关于页计划使用新仓库的 GitHub Issues 接收纠错/删除请求。未填写或公开私人邮箱。Issues 内容公开，入口在目标仓库创建后生效。

获得明确确认后，再创建或连接 **icytail176/botan-sake**（公开、不要额外初始化 README），提交当前文件到 main 并正常推送；在仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。随后等待 deploy 工作流成功；必要时在 Actions → Deploy to GitHub Pages → Run workflow 手动触发。实际成功后才将交付记录改为已发布。

正式地址预期为 https://icytail176.github.io/botan-sake/ 。部署后执行：

```sh
npm run test:online
```

该命令无需本地服务器，直接测试正式地址在 375 / 390 / 768 / 1440px 的页面、全部详情、图片、搜索/筛选、Lightbox、导航、商品与参数链接、canonical、sitemap 和 404。需本机安装 Google Chrome。只有产生标记 online 的通过报告，才能声称线上验收通过。

公开源码中保留维护资料与历史报告；旧商品 URL 可在历史记录中出现，网站构建不再引用它们。旧 icytail176/image-host 不参与新站资源、部署或任何写操作，不能在本轮删除。
