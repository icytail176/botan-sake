# 第五轮：深度考据与恢复记录

查询日期：2026-10-11。第一阶段研究完成后才写入人工数据；下文保留最初本地研究过程。第五轮现已正式发布，第4款目标已按用户要求改为NV，见[补充研究](specification-research-round5-nv.md)及[发布交付](DELIVERY.md)。

## 中断恢复核对

恢复时 main 与 origin/main 对齐；工作区仅有未跟踪 reports/round5-before.json，暂存区为空。不存在第五轮研究报告；manual.json 未含介绍/风味/背景，详情组件未含新模块。因此此前完成的是研究与基准快照，数据、UI、回归测试尚待实施。保留快照及第三、四轮报告，不重跑已完成的全部检索。

## 判定与证据

A：官方/权威且商品或明确背景对应；B：可靠但版本未对应，只公开共同事实或注明适用范围；C：不足/冲突只留研究记录。搜索摘要不能作为唯一证据。下列新增文字均为日文概括，风味归属于来源机构，不是本站试饮。所有旧39条参数的值、来源键保持，新旧差异见下表。

## v01-001 — 秩父ワイン 源作印 巨峰 ロゼ

A：巨峰720ml・NVの公式本文を再利用。甘口を追加。同名系列の源作印・ロゼ（甲州／マスカット・ベーリーA、辛口）は別商品として除外。公式の料理例も確認したが、今回の公開文は商品・風味に絞った。ABV不明。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| 製造元 (`manufacturer`) | 有限会社秩父ワイン | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| 種類 (`style`) | ロゼワイン | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| ブドウ品種 (`grapeVariety`) | 巨峰 | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| ブドウ収穫地 (`grapeOrigin`) | 山梨県 | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| 醸造年 (`vintage`) | ノンヴィンテージ | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |

### 候选更新与展示决定

- 规格 `sweetness`：甘辛 = 甘口；来源键 official。建议展示。
- `description`：山梨県で収穫された巨峰を用いる、源作印の甘口ロゼ。醸造年を限定しないノンヴィンテージのワインで、蔵元は巨峰らしい甘い香りと、フレッシュで果実を思わせる味わいを紹介しています。；来源键 official。建议展示。
- `tastingNotes`：巨峰の甘い香りと、みずみずしい果実感を備えた甘口のロゼとして紹介されています。；来源键 official。归属：秩父ワインによる説明。建议展示。

### 来源、日期及适用范围

- `official` [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/)；查询 2026-10-11；公式掲載のノンヴィンテージ品。ブドウ収穫地は製造元所在地とは異なります。

### 尚未核实

- `abv`：官方具体商品页面未列酒精度；不使用其他源作印酒款的数值。

## v01-002 — 秩父麦酒 ペールエール 華熊

A：公式目录中の通常華熊の風味のみ。具体商品页有年龄确认，正文未取得；ABV・IBU・ホップ品種は保留。Harvest Brew特別版や小熊5%を通常品に流用しない。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| ブルワリー (`brewery`) | 秩父麦酒（合同会社 BEAR MEET BEER） | [BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html) |
| ビアスタイル (`style`) | American Pale Ale | [秩父麦酒公式ショップ — 華熊 American Pale Ale](https://chichibubeer.shop-pro.jp/?pid=151056744)；[BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html) |
| ブルワリー所在地 (`origin`) | 埼玉県秩父市下吉田 | [BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html) |

### 候选更新与展示决定

- `description`：秩父麦酒の華熊は、アメリカン・ペールエールとして紹介される一本。ブルワリーの説明では、ホップの苦味を控えめにし、華やかな香りと飲み続けやすい全体のバランスを大切にしています。；来源键 official-catalog。建议展示。
- `tastingNotes`：ホップの香りを前に出しながら、苦味は穏やかに。香りと飲みやすさの釣り合いを重視したペールエールです。；来源键 official-catalog。归属：秩父麦酒による説明。建议展示。

### 来源、日期及适用范围

- `official-shop` [秩父麦酒公式ショップ — 華熊 American Pale Ale](https://chichibubeer.shop-pro.jp/?pid=151056744)；查询 2026-10-11；年齢確認画面の商品名を確認。仕様本文は取得できませんでした。
- `brand-release` [BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html)；查询 2026-10-11；華熊の名称・スタイル、醸造所と会社情報を参照。本文の5.0%は別商品「彩の熊のラガー」の値です。
- `official-catalog` [秩父麦酒公式 — 華熊 商品ラインナップ](https://chichibubeer.shop-pro.jp/?cbid=2610569&csid=0&mode=cate&sort=p)；查询 2026-10-11；通常の華熊 American Pale Ale の説明。Harvest Brew 限定版や他銘柄の数値は採用していません。

### 尚未核实

- `abv`：官方店年龄门限未返回规格；品牌发布中5.0%属于彩の熊のラガー，未套用。
- `ibu`：检索到评价网站的25/50等不同值，无足够可靠的同版本官方证据。

## v01-003 — 秩父錦 純米大吟醸

A：50%美山錦16度を維持、自家精米・長期低温発酵とやや辛口を追加。B：酒造組合本文は日本酒度2・酸度1.4。C：検索の5.0／1.7は日本酒ガイドの本文が403で未読、年度対応も不明。どちらの値も固定仕様には追加しない。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| 製造元 (`manufacturer`) | 株式会社矢尾本店 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 蔵元所在地 (`origin`) | 埼玉県秩父市 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 特定名称 (`designation`) | 純米大吟醸 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 精米歩合 (`ricePolishingRatio`) | 50% | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 原料米 (`riceVariety`) | 美山錦 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| アルコール度数 (`abv`) | 16% | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |

### 候选更新与展示决定

- 规格 `brewingMethod`：製法 = 自家精米・長期低温発酵；来源键 official。建议展示。
- 规格 `sweetness`：甘辛 = やや辛口；来源键 official。建议展示。
- `description`：美山錦を自家精米で50%まで磨き、長期の低温発酵で醸す純米大吟醸。蔵元は吟醸香と米のうまみを特徴に挙げています。やや辛口の分類ながら、米の風味を引き出したふくらみのある酒として紹介されています。；来源键 official。建议展示。
- `tastingNotes`：吟醸香に米のうまみが重なり、ふくよかさを感じさせる味わい。蔵元の甘辛分類は「やや辛口」です。；来源键 official。归属：矢尾本店による説明。建议展示。

### 来源、日期及适用范围

- `official` [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03)；查询 2026-10-11；「純米大吟醸 1.8L/720ml」の欄を参照。特選大吟醸・大吟醸・純米吟醸の値は使用していません。現行公式掲載仕様です。
- `association` [埼玉県酒造組合 — 秩父錦 純米大吟醸](https://saisake.com/products/秩父錦　純米大吟醸/)；查询 2026-10-11；16度・精米50%。日本酒度2、酸度1.4の掲載はあるものの、製造年度の対応が未確認のため数値は保留。

### 尚未核实

- `sakeMeterValue`：酒造组合网页列2；其他检索线索列5.0，但正文访问403且年份不明。无法证明图片版本，继续留空。
- `acidity`：酒造组合网页列1.4；其他检索线索列1.7，但正文访问403且年份不明。无法证明图片版本，继续留空。

## v01-004 — ヴィーニャ･アデライダ カバ ブリュット・ナチュール レセルバ（本轮最初核对的历史目标）

**后续已变更：用户明确要求与指定Dragee NV商品对齐，现名「カヴァ ヴィーニャ・アデライダ ブリュット・ナチュレ NV」。下文保留原Reserva研究过程，不再代表当前缺项。当前来源、11条规格与介绍/风味/背景见 [NV补充报告](specification-research-round5-nv.md)。**

C：Dragee商品W-SK18070901の本文はBrut Nature NV。ボデガス・ロペス・モレナス、マカベオ／パレリャーダ、スペイン／DOカヴァを記載。Reserva・ABV・熟成月数の証拠なし。NVとReservaは同一と確定できず、全スペック・紹介・風味を保留。名称、URL、confirmedを維持。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| — | 留空，不套用NV | — |

### 候选更新与展示决定

- 介绍、风味、背景、技术参数均未通过精确版本核实，不展示占位模块。

### 来源、日期及适用范围


### 尚未核实

- `identityVersion`：2026-10-11 核对指定 Dragee W-SK18070901 商品页：明确为 Brut Nature NV，未见 Reserva 标记。其生产者、葡萄品种与 DO Cava 资料仅确认该 NV 条目，尚无跨版本共同属性证据；不套用至原 Reserva 酒款。保留原名称、confirmed、空分类及空规格。旧 Roger Goulart URL 仅在历史资料中保留。
- `manufacturer`：尚未核实精确 Reserva 版本的生产者。
- `origin`：尚未核实精确 Reserva 版本的产区。
- `grapeVariety`：近似 Brut Nature NV 的葡萄资料未套用。
- `abv`：搜索结果不同版本出现11.5%/12.5%，未确定对应版本，留空。
- `aging`：未找到精确 Reserva 版本的明确熟成规格，不从法定分类推定。

## v01-005 — アサヒスーパードライ

A：1987年発売、2022年初刷新、2026年5月発表・8月上旬製造分から二度目刷新。B：写真の製造日不明、辛口という共通概念と歴史だけ掲載。麦芽比率増加や2026固有ホップ配合は写真へ適用しない。5%・原材料は既存公式商品情報を維持。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| ブルワリー (`brewery`) | アサヒビール | [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html) |
| アルコール度数 (`abv`) | 5% | [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html) |
| 原材料 (`ingredients`) | 麦芽、ホップ、米、コーン、スターチ | [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html) |

### 候选更新与展示决定

- `description`：辛口を軸にしたアサヒのビール。飲みごたえと、飲んだ後のすっきりしたキレをブランドの特徴として掲げています。1987年の登場以来、辛口という考え方を受け継ぎながら、時代に合わせて処方を更新してきた銘柄です。；来源键 brand, renewal-2026。版本：ブランドの特徴を紹介しています。掲載画像の製造時期は未確認です。。建议展示。
- `tastingNotes`：メーカーは、さらりとした飲み口と後味のキレを「辛口」の核として説明しています。；来源键 renewal-2026。归属：アサヒビールによる説明。版本：ブランド共通のコンセプトです。2026年刷新品に固有の香りや麦芽比率は、画像の製品には適用していません。。建议展示。
- `background`：1987年に発売。2022年2月中旬以降製造分で初の全面刷新を行い、2026年は8月上旬以降製造分から二度目の処方変更を進めると発表しています。；来源键 renewal-2022, renewal-2026。范围：product。版本：発売・改良の歴史であり、写真の製品がどの処方かを示すものではありません。。建议展示。

### 来源、日期及适用范围

- `official` [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html)；查询 2026-10-11；日本向け通常品の現行商品情報。ドライクリスタル等の別製品は対象外です。画像の製造時期は特定していません。原材料の製造国の割合表示は変更される場合があります。
- `brand` [アサヒビール公式 — スーパードライ](https://www.asahibeer.co.jp/superdry/)；查询 2026-10-11；辛口というブランドのコンセプトを参照。画像の製造時期は未確認。
- `renewal-2022` [アサヒグループ公式 — 2022年フルリニューアル](https://www.asahigroup-holdings.com/newsroom/detail/20220121-0301.html)；查询 2026-10-11；2022年2月中旬以降製造分の処方変更。旧製品の製法を保証する情報ではありません。
- `renewal-2026` [アサヒビール公式 — 2026年スーパードライ3.0](https://www.asahibeer.co.jp/news/2026/0529_3.html)；查询 2026-10-11；2026年5月29日発表、8月上旬以降製造分から切り替え。画像の旧製品に新処方を適用していません。

### 尚未核实

- `style`：官方此商品页未明确具体啤酒风格，不自行填入 Pilsner。
- `ibu`：官方商品页未列 IBU。
- `origin`：未将麦芽原料产地误当作成品原产地。

## v01-006 — 百年の孤独

A：公式の通常百年の孤独720ml・40%欄と風味。百年のボトルや中々を除外。オーク香から樽種・熟成年数は推定しない。会社情報の明治18年は蔵元背景だけ。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| 製造元 (`manufacturer`) | 株式会社黒木本店 | [黒木本店公式 — 会社情報](https://www.kurokihonten.co.jp/company/) |
| 蔵元所在地 (`origin`) | 宮崎県児湯郡高鍋町 | [黒木本店公式 — 会社情報](https://www.kurokihonten.co.jp/company/) |
| 種類 (`style`) | 麦焼酎 | [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/) |
| 原材料 (`ingredients`) | 麦、麦麹 | [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/) |
| アルコール度数 (`abv`) | 40% | [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/) |

### 候选更新与展示决定

- `description`：麦と麦麹を原料とする黒木本店の麦焼酎で、公式商品情報の度数は40%。蔵元は麦の香ばしさに、オークやココナッツを思わせる風味が重なると説明し、凝縮感と滑らかな口当たりを特徴に挙げています。；来源键 official。建议展示。
- `tastingNotes`：オークやほのかなシガーを思わせる香りに、ココナッツと香ばしい麦の風味が重なるとの説明です。口当たりは滑らかで、味わいには凝縮感があるとされています。；来源键 official。归属：黒木本店による説明。建议展示。
- `background`：黒木本店は明治18年設立。宮崎県高鍋町に蔵を構えています。；来源键 company。范围：brand。版本：蔵元の沿革です。「百年の孤独」の発売年や熟成年数を表す情報ではありません。。建议展示。

### 来源、日期及适用范围

- `official` [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/)；查询 2026-10-11；通常の「百年の孤独」720mlを参照。別欄の「百年のボトル」とは区別しています。
- `company` [黒木本店公式 — 会社情報](https://www.kurokihonten.co.jp/company/)；查询 2026-10-11；具体商品或已注明的品牌背景资料。

### 尚未核实

- `aging`：所查官方商品页未列明熟成年数与桶种；不从风味中的オーク字样推断桶种。

## v01-007 — 塩田酒造 芋焼酎 六代目百合

A：酒造組合の鹿の子百合由来と風味。B：登酒店の通常25/35度欄は黄金千貫・米麹／黒麹／常圧。勝鬨酒販の2024新焼酎25度は四品種と黒麹ゴールド。版が異なるため旧値は維持し通常品資料という注記を追加。画像度数・年度不明。活動資料のシロユタカ単独の具体URLは未特定で未読、確定事実と扱わない。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| 製造元 (`manufacturer`) | 塩田酒造株式会社 | [鹿児島県酒造組合 — 六代目百合・蔵元情報](https://www.honkakushochu.or.jp/product/1547/) |
| 蔵元所在地 (`origin`) | 鹿児島県薩摩川内市里町里 | [鹿児島県酒造組合 — 六代目百合・蔵元情報](https://www.honkakushochu.or.jp/product/1547/) |
| 原材料 (`ingredients`) | 黄金千貫、米麹 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |
| 種類 (`style`) | 芋焼酎 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |
| 蒸留方式 (`distillationMethod`) | 常圧蒸留 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |
| 麹 (`koji`) | 黒麹 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |

### 候选更新与展示决定

- `description`：甑島の塩田酒造が造る芋焼酎。通常品の販売資料では、黒麹と常圧蒸留による造りが紹介されています。鹿児島県酒造組合は、蒸し芋を思わせる香りと、丸みのある旨味や甘みをこの銘柄の特徴に挙げています。；来源键 association, authorized-retailer。版本：写真の度数・製造年は未確認。原料芋の品種は製品や年度ごとの資料で確認する必要があります。。建议展示。
- `tastingNotes`：蒸し芋を思わせる香りに、丸みのある甘みと旨味が重なる芋焼酎として紹介されています。；来源键 association。归属：鹿児島県酒造組合による説明。建议展示。
- `background`：「百合」は甑島に咲く鹿の子百合に由来します。酒造組合の紹介では、塩田酒造はひとつの銘柄に力を注ぐ「一蔵一銘柄」の考え方を貫いています。；来源键 association。范围：product。建议展示。

### 来源、日期及适用范围

- `association` [鹿児島県酒造組合 — 六代目百合・蔵元情報](https://www.honkakushochu.or.jp/product/1547/)；查询 2026-10-11；具体商品或已注明的品牌背景资料。
- `authorized-retailer` [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html)；查询 2026-10-11；25度・35度の通常品は、原材料・麹・蒸留方式の記載が共通です。画像の度数は特定できないため、アルコール度数は掲載していません。原酒「風に吹かれて」とは区別しています。

### 尚未核实

- `abv`：可信酒商显示25度与35度产品；现有图片不能可靠辨读度数，不选择其中一值。
- `ingredientsVersion`：登酒店通常品は黄金千貫。勝鬨酒販2024新焼酎は黄金千貫・シロサツマ・シロユタカ・みちしずく。画像年度不明で上書きしない。組合活動資料のシロユタカの具体URLは未特定。

## v01-008 — 喜久盛酒造 タクシードライバー 純米生原酒

A：中央会の1894年設立と蔵元情報。B：高橋酒店のR6BY仕込9号720ml、2025-07-14瓶詰のみ55%・かけはし・17度・日本酒度+2.8・酸度1.6・アミノ酸度2.0・麹菌黎明平泉・酵母ゆうこの想い。写真の仕込に対応せず公開数値には追加しない。風味・ラベル映画由来は裏付け不足で保留。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| 製造元 (`manufacturer`) | 喜久盛酒造株式会社 | [日本酒造組合中央会 — 喜久盛酒造・タクシードライバー](https://japansake.or.jp/sakagura/jp/iwate/kikuzakari-shuzou/) |
| 蔵元所在地 (`origin`) | 岩手県北上市 | [日本酒造組合中央会 — 喜久盛酒造・タクシードライバー](https://japansake.or.jp/sakagura/jp/iwate/kikuzakari-shuzou/) |
| 特定名称 (`designation`) | 純米酒 | [高橋酒店 — タクシードライバー 純米生原酒 R6BY 仕込9号](https://takahashi-sake.ocnk.net/product/4656) |
| 種類 (`style`) | 生原酒 | [高橋酒店 — タクシードライバー 純米生原酒 R6BY 仕込9号](https://takahashi-sake.ocnk.net/product/4656) |

### 候选更新与展示决定

- `description`：岩手県北上市の喜久盛酒造が手がける純米生原酒。タクシードライバーは日本酒造組合中央会の蔵元紹介にも掲載される銘柄です。販売資料では年度と仕込号を区別しており、米や度数などは個別の仕込みごとに確認する必要があります。；来源键 association, retailer。版本：参照した商品はR6BY仕込9号。写真の年度・仕込号と一致する証拠は得られていません。。建议展示。
- `background`：喜久盛酒造は1894年設立。日本酒造組合中央会は、岩手県北上市の蔵元として、喜久盛や鬼剣舞とともにタクシードライバーを紹介しています。；来源键 association。范围：brand。建议展示。

### 来源、日期及适用范围

- `association` [日本酒造組合中央会 — 喜久盛酒造・タクシードライバー](https://japansake.or.jp/sakagura/jp/iwate/kikuzakari-shuzou/)；查询 2026-10-11；具体商品或已注明的品牌背景资料。
- `retailer` [高橋酒店 — タクシードライバー 純米生原酒 R6BY 仕込9号](https://takahashi-sake.ocnk.net/product/4656)；查询 2026-10-11；参照先はR6BY・仕込9号・720ml（2025年7月瓶詰め）。掲載画像の年度・仕込号との一致は未確認のため、米・精米歩合・度数・日本酒度・酸度は採用していません。

### 尚未核实

- `ricePolishingRatio`：链接中55%只核实为R6BY仕込9号；图中批次不明，留空。
- `riceVariety`：链接中かけはし只核实为R6BY仕込9号；图中批次不明，留空。
- `abv`：链接中17度只核实为R6BY仕込9号；图中批次不明，留空。
- `sakeMeterValue`：链接中+2.8对应R6BY仕込9号，不套用到未知批次。
- `acidity`：链接中1.6对应R6BY仕込9号，不套用到未知批次。
- `yeast`：R6BY仕込9号为ゆうこの想い，照片批次未对应，留空。
- `kojiMold`：R6BY仕込9号为黎明平泉，照片批次未对应，留空。

## v01-009 — Bovet La Valote Absinthe Émeraude 50cl

A：フランス語の蒸溜所Émeraude専用本文をHTTP200で読み、植物による緑色／植物的風味／苦味／77%／50clを照合。B：専門店の同名50cl本文は植物浸漬の自然着色、これのみ方法として採用。他銘柄の十種植物配合や通用製法をこの商品へ転記しない。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| 蒸溜所 (`distillery`) | Absinthe Bovet La Valote | [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/) |
| 原産国・地域 (`origin`) | スイス・Môtiers（Val-de-Travers） | [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/) |
| 種類 (`style`) | アブサン（ヴェルト） | [AbsintheMarket — Émeraude 50cl](https://www.absinthemarket.com/produit/emeraude-bovet-la-valote-50cl/) |
| アルコール度数 (`abv`) | 77% | [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/)；[AbsintheMarket — Émeraude 50cl](https://www.absinthemarket.com/produit/emeraude-bovet-la-valote-50cl/) |

### 候选更新与展示决定

- 规格 `coloringMethod`：着色方法 = 植物の浸漬による自然着色；来源键 official-product, retailer。建议展示。
- `description`：スイスのMôtiersで造られる、植物由来の緑色を持つアブサン。Émeraudeの公式度数は77%で、50clのボトルも案内されています。蒸溜所は、植物的な香味に苦味が加わることを、この銘柄の特徴として紹介しています。；来源键 official-product, official。建议展示。
- `tastingNotes`：植物を思わせる香味と、それに重なる苦味が特徴とされています。；来源键 official-product。归属：Absinthe Bovetによる説明。建议展示。

### 来源、日期及适用范围

- `official` [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/)；查询 2026-10-11；Émeraudeの77% vol.を参照。同じ77%のSeptante7、54%や65%の別製品とは区別しています。
- `retailer` [AbsintheMarket — Émeraude 50cl](https://www.absinthemarket.com/produit/emeraude-bovet-la-valote-50cl/)；查询 2026-10-11；50cl製品の銘柄、蒸溜所、77°、Absinthes vertes分類を照合。
- `official-product` [Absinthe Bovet公式 — Émeraude](https://absinthe-bovet.ch/fr/produits/absinthe-emeraude/)；查询 2026-10-11；Émeraude 77% vol.、50cl/10cl。植物由来の緑色と植物的な風味を明記。

### 尚未核实

- `ingredients`：品牌系列的十种植物说明未明确逐款配方，不作为Émeraude完整原料表。

## v01-010 — ブリュードッグ パンクIPA

A：日本公式5.5%商品の風味とブランド創業。B：英語公式trade頁のPUNK IPA5.2%は英国市場の別資料。ABV5.5%を維持、IBU・具体ホップ品種・画像の製造国は保留。

### 原有规格复核

| 字段 | 保留值 | 具体来源 |
| --- | --- | --- |
| ブルワリー (`brewery`) | BREWDOG | [BREWDOG日本公式 — PUNK IPA](https://www.brewdog.jp/lineup/) |
| ビアスタイル (`style`) | インディアペールエール（IPA） | [BREWDOG日本公式 — PUNK IPA・ブランド紹介](https://www.brewdog.jp/story/) |
| アルコール度数 (`abv`) | 5.5% | [BREWDOG日本公式 — PUNK IPA](https://www.brewdog.jp/lineup/) |

### 候选更新与展示决定

- `description`：BREWDOGの出発点となったIPA。日本公式では、新世界のホップを使う黄金色のビールとして紹介されています。果実を思わせる香りにキャラメルのニュアンスが重なり、最後にシャープな苦味が残るという説明です。；来源键 official。建议展示。
- `tastingNotes`：グレープフルーツやパイナップル、ライチを思わせる香りに、キャラメルの香りが重なるとの説明です。後味には明確な苦味が残るとされています。；来源键 official。归属：BREWDOG日本公式による説明。版本：日本公式の5.5%版を参照。別市場・別時期の処方は適用していません。。建议展示。
- `background`：BREWDOGは2007年、スコットランドでジェームズ・ワットとマーティン・ディッキーが創業。日本公式はPUNK IPAを、ブランドが生まれるきっかけとなったビールと位置づけています。；来源键 official-story, official。范围：brand。建议展示。

### 来源、日期及适用范围

- `official` [BREWDOG日本公式 — PUNK IPA](https://www.brewdog.jp/lineup/)；查询 2026-10-11；日本公式のPUNK IPA 5.5%。提供商品画像のラベルもAlc.5.5%。他地域・別時期の度数や別銘柄の数値は採用していません。
- `official-story` [BREWDOG日本公式 — PUNK IPA・ブランド紹介](https://www.brewdog.jp/story/)；查询 2026-10-11；PUNK IPAのビアスタイルを参照。ブランドの創業地は、この画像の製品の製造地域を保証するものではありません。

### 尚未核实

- `ibu`：日本公式の商品条目未列 IBU；不采用其他时期配方或其他产品的苦味值。
- `origin`：未核实本图对应产品的具体生产地域，不将品牌起源自动等同产地。

## 补充交叉验证与访问限制

- [Dragee W-SK18070901](https://www.dragee.co.jp/fs/dragee/W-SK18070901)：工具解码失败，直连HTTP200并按CP932读取正文；只证明NV。
- [López Morenas 2018奖项](https://bodegaslopezmorenas.com/en/bodegas-lopez-morenas-es-beneficiario-del-fondo-feder-copy-copy-copy/)：原厂英语/西语页面提及Viña Adelaida Cava的获奖酒，但没有Brut Nature Reserva的精确技术证据，不能填Reserva资料。
- [日本酒ガイド](https://sake-guide.com/sake/detail/2121)：网页工具cache miss，直连403；仅搜索线索5.0/1.7，未取得正文，不作为已核实事实。酒造组合2/1.4正文确已读，但同样无年度对应。
- [勝鬨酒販 2024新焼酎](https://katidoki.com/2025/02/01/monthry-liquor-02/)：网页工具cache miss；直连HTTP200读取正文，确认四品种。版本与登酒店通常品不同，仅研究、补缺项，未替换原料。
- [BREWDOG 英语官方贸易资料](https://brewdog.com/pages/sales-enquiries)：本文PUNK IPA为5.2%，与日本官方5.5%市场资料不同，不覆盖日本版本。
- 華熊具体商品页停留在年龄确认；官方类别目录的华熊段正文可读。特別Harvest Brew資料不適用通常品。
- Bovet专用页网页工具cache miss，但直连HTTP200读到正文；蒸溜所通用植物/地下蒸馏历史不用于推断Émeraude完整配方。

## 阶段一结论

候选新增4条规格、9段商品介绍、8条风味、5条背景，共26条资料。原有39条参数不改值；六代目百合原料字段仅增加版本注记。Viña Adelaida保持空白模块。所有参数和文字通过来源键关联到具体URL。

## 恢复后实施与验证

数据已写入manual.json，新增字段有来源引用校验，风味有归属、背景区分品牌/商品。详情按图/规格/介绍/风味/背景/卷数/截图/参考顺序显示，缺项模块不输出。Header精简重复链接，卷筛选背景SVG右侧18px、垂直居中。

npm run verify（13项测试）与独立npm run build通过；原39值/原来源键、10confirmed、全部名称URL和图片关系保持，21原素材哈希未变。重新导入保留新增资料。

本地Chrome/Playwright的375/390/768/1440px、10详情及原有交互通过，新增文本/来源对应和无空模块/无溢出通过；四宽截图已查看，0非预期资源失败、0脚本错误。导航hover/focus另有UI记录。macOS自动化原生select的ArrowDown/Enter提交无法验证，在未加样式最小select和有窗口Chrome也复现；只确认Tab焦点与点击筛选，不声称键盘提交已通过。需真实浏览器人工复核；Windows/Safari/真机未测试。

未提交、推送或部署，线上第四轮历史证据未修改。完整交付及限制见DELIVERY.md。
