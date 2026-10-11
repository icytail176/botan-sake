# 内容与素材维护

日常入口见 [README](../README.md)，规格与文章见 [资料考据规范](RESEARCH_GUIDE.md)，验证及发布见 [部署说明](DEPLOYMENT.md)。新增真实酒款或卷无需修改页面组件。

## 维护入口与当前资料

原始素材在第1巻/products和scenes，名称与商品链接在第1巻/info.txt，人工覆盖在data/manual.json。原始macOS textClipping备份保留根目录，任何导入命令都不会读取它覆盖维护用文本。

现有10款、10次登场均confirmed，10张商品原图与10张作品截图。第4款维护目标已按用户授权对齐Dragee NV商品，分类ワイン；不独立证明漫画图片的全部批次细节。确认状态只表示作品内銘柄照合，不表示版权已确认。详情只显示卷数，内部ID、话数/页码保留在数据层。

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
reports/DELIVERY.md           第五轮已发布交付记录
reports/round6-maintenance.md  本轮本地整理记录
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

在 `data/manual.json` 填写需覆盖的字段。人工文件不会被任何导入命令改写。自动来源变化时，已填写的人工值仍优先；删除某个字段才重新使用自动值。名称不可为空；商品的 `url`、`category`、`notes`，以及登场的 `source`、`notes` 可填 `null` 显式清空。

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


## 永久ID与回归基准

`v01-004`等永久ID不随名称或排序改变；商品ID和登场ID可以不同。新增卷的同编号不会继承confirmed，明确确认后才修改appearances状态。跨卷关联必须由人工证据指定productId，不能凭名称相似合并。

原图/剪辑完整性基准为[original-checksums.json](../reports/original-checksums.json)。第五轮基准[round5-before.json](../reports/round5-before.json)、[NV维护基准](../reports/round5-nv-baseline.json)、[NV修订前快照](../reports/round5-nv-before.json)有测试依赖，保留原位。新增酒款不会要求重写历史基准；有意更正原10款时，先记录新证据和用户授权，再审查相关基准，不关闭测试或静默重写。
