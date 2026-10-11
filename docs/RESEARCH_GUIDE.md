# 商品资料考据规范

数据位置和图像关联见 [内容维护](CONTENT_GUIDE.md)。规格和文章属于商品products，不属于漫画登场appearances。

## 证据与版本

优先使用生产商/品牌官网、官方商品技术表、酒类协会等权威资料，再采用可靠酒商的具体商品正文。读取实际页面并保存具体URL；搜索摘要、未能读取的页面、同品牌近似型号均不能充当已核实证据。网络不可用时保留原资料、记录缺项，不虚构检索结果。

核对完整名称、商品码、年份/NV、容量、酒精度、限定版本及批次。Reserva不能直接套用Brut Nature NV，Brut不能替代Brut Nature；日本酒仕込号、烧酎原料版本也分别记录。不得根据法定精米歩合上限、通用Cava法规或酒名猜出本款实际数值。日本酒度、酸度、IBU、熟成时间等数值均须对应具体产品来源。

遇到冲突先分清版本、查询时间和来源权威性。A类官方准确版本可采用；B类具体专业销售资料仅在产品对应且适用范围清楚时采用并注明限制，版本有争议时只采用共同属性；C类无法验证的候选保留在研究记录，字段留空。已有值不要无依据改写，更不能任选一个不同批次的数值。

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


## 商品介绍、风味与背景

继续只编辑 `data/manual.json` 的 `products.ID`。自动导入文件不是人工入口。三个新字段都属于商品；漫画登场、confirmed 和跨卷关联仍在 `appearances`，两者独立。

```json
"description": {
  "text": "根据已读商品正文撰写的简短日文介绍。",
  "sourceIds": ["official"],
  "note": "必要时说明适用版本。"
},
"tastingNotes": [{
  "text": "概括生产商或可靠专业资料的风味描述。",
  "sourceIds": ["official"],
  "attribution": "蔵元による説明"
}],
"background": [{
  "text": "已经核实的沿革或名称由来。",
  "sourceIds": ["company"],
  "scope": "brand"
}]
```

这是结构示例，不能把示例文字加入真实商品。`description` 可留 `null`，`tastingNotes`、`background` 可留空数组或省略；没有内容就不显示模块。`text`、`sourceIds` 不可为空，风味必须写来源归属 `attribution`，背景 `scope` 必须为 `brand`（蔵元・品牌）或 `product`（具体銘柄）。`note` 为可选日文版本说明，会显示在对应段落下。

- 每个 `sourceIds` 必须引用同商品 `specificationSources` 的已存在 ID；新增来源填写标题、真实 HTTP(S) URL、查询日期 `checkedAt`，并用 `versionNote` 标明年份、仕込号、市场或资料范围。来源池同时供规格和文章使用。
- 规格的新增/修改仍在 `specifications`，保留字段单位和证据。未核实字段留 `null`，原因写 `specificationGaps`。如果已有值和新版冲突，先保留旧值，写明其适用版本，并以另一个缺项键（例如 `ingredientsVersion`）记录争议；不要把不同年份参数混成一个规格。
- 资料核对结果写入对应研究报告；新研究可新增 `reports/` 文档，不改写历史结论。证据分级和冲突处理按本文上方规则。
- 修改后运行 `npm run verify`；缺项不产生空白段落，人工数据不被重新导入清除。
- 可见内容的浏览器检查按 [部署说明](DEPLOYMENT.md) 执行。


## 当前资料与研究历史

第五轮已发布54条规格、10段介绍、9条风味、6条背景，原39条规格保留。第三轮的39条记录是历史状态，当前第4款有11条NV规格，不再显示过时Reserva缺项。数值、资料来源和争议分别见[第三轮研究](../reports/specification-research.md)、[第五轮研究](../reports/specification-research-round5.md)、[NV补充](../reports/specification-research-round5-nv.md)。

风味必须注明生产商或销售商描述的归属，不能写成本站试饮；商品介绍用简洁自然日文概括，不复制整段销售文字，不编造香气、评价、价格或饮用建议。品牌背景不能当作该产品的葡萄产地或独有工艺。
