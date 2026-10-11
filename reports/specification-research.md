# 第三轮：商品规格资料核对报告

查询日期：2026-10-11。基于当前前 10 款真实素材。数值只录入可追溯的具体商品资料；原名称、URL、10 个 confirmed 和全部图片关联保留。官方未列、访问失败或精确版本不明的字段保持 null，维护原因存入 specificationGaps。

9 款补充资料，39 条非空规格。制造者地址以「蔵元所在地／ブルワリー所在地」表示，不能视为原料产地；葡萄收获地另列。当前规格是来源注明的产品资料，不证明作品出现时的生产年份。未采集口感、价格、评价或饮用建议。

## 秩父ワイン 源作印 巨峰 ロゼ

维护键：`v01-001`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| 製造元（`manufacturer`） | 有限会社秩父ワイン | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| 種類（`style`） | ロゼワイン | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| ブドウ品種（`grapeVariety`） | 巨峰 | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| ブドウ収穫地（`grapeOrigin`） | 山梨県 | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |
| 醸造年（`vintage`） | ノンヴィンテージ | [秩父ワイン公式 — 源作印 巨峰 720ml](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/) |

版本与来源处理：

- 公式掲載のノンヴィンテージ品。ブドウ収穫地は製造元所在地とは異なります。（[来源](https://chichibuwine.co.jp/product/%E6%BA%90%E4%BD%9C%E5%8D%B0%E3%80%80%E5%B7%A8%E5%B3%B0%E3%80%80720ml/)）

待补／未采用：

- `abv`：官方具体商品页面未列酒精度；不使用其他源作印酒款的数值。

## 秩父麦酒 ペールエール 華熊

维护键：`v01-002`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| ブルワリー（`brewery`） | 秩父麦酒（合同会社 BEAR MEET BEER） | [BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html) |
| ビアスタイル（`style`） | American Pale Ale | [秩父麦酒公式ショップ — 華熊 American Pale Ale](https://chichibubeer.shop-pro.jp/?pid=151056744)；[BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html) |
| ブルワリー所在地（`origin`） | 埼玉県秩父市下吉田 | [BEAR MEET BEER公式発表 — 秩父麦酒・既存商品の紹介](https://prtimes.jp/main/html/rd/p/000000001.000105909.html) |

版本与来源处理：

- 年齢確認画面の商品名を確認。仕様本文は取得できませんでした。（[来源](https://chichibubeer.shop-pro.jp/?pid=151056744)）
- 華熊の名称・スタイル、醸造所と会社情報を参照。本文の5.0%は別商品「彩の熊のラガー」の値です。（[来源](https://prtimes.jp/main/html/rd/p/000000001.000105909.html)）

待补／未采用：

- `abv`：官方店年龄门限未返回规格；品牌发布中5.0%属于彩の熊のラガー，未套用。
- `ibu`：检索到评价网站的25/50等不同值，无足够可靠的同版本官方证据。

## 秩父錦 純米大吟醸

维护键：`v01-003`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| 製造元（`manufacturer`） | 株式会社矢尾本店 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 蔵元所在地（`origin`） | 埼玉県秩父市 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 特定名称（`designation`） | 純米大吟醸 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 精米歩合（`ricePolishingRatio`） | 50% | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| 原料米（`riceVariety`） | 美山錦 | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |
| アルコール度数（`abv`） | 16% | [秩父錦公式 — 純米大吟醸](https://chichibunishiki.com/meishu/#a03) |

版本与来源处理：

- 「純米大吟醸 1.8L/720ml」の欄を参照。特選大吟醸・大吟醸・純米吟醸の値は使用していません。現行公式掲載仕様です。（[来源](https://chichibunishiki.com/meishu/#a03)）

待补／未采用：

- `sakeMeterValue`：官方该商品条目未提供日本酒度。
- `acidity`：官方该商品条目未提供酸度。

## ヴィーニャ･アデライダ カバ ブリュット・ナチュール レセルバ

维护键：`v01-004`（只用于内部维护，详情不显示）。

精确版本未得到可靠资料，没有收录商品规格；基本信息区域不会生成。

待补／未采用：

- `identityVersion`：原链接 Roger Goulart 无法读取，品牌路径与 Viña Adelaida 不一致；可靠零售条目为 Brut Nature NV，未证实名称中的 Reserva 版本。保留用户已确认名称、状态、原URL与分类，不套用近似型号。
- `manufacturer`：尚未核实精确 Reserva 版本的生产者。
- `origin`：尚未核实精确 Reserva 版本的产区。
- `grapeVariety`：近似 Brut Nature NV 的葡萄资料未套用。
- `abv`：搜索结果不同版本出现11.5%/12.5%，未确定对应版本，留空。
- `aging`：未找到精确 Reserva 版本的明确熟成规格，不从法定分类推定。

## アサヒスーパードライ

维护键：`v01-005`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| ブルワリー（`brewery`） | アサヒビール | [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html) |
| アルコール度数（`abv`） | 5% | [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html) |
| 原材料（`ingredients`） | 麦芽、ホップ、米、コーン、スターチ | [アサヒビール公式 — アサヒスーパードライ 商品情報](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html) |

版本与来源处理：

- 日本向け通常品の現行商品情報。ドライクリスタル等の別製品は対象外です。画像の製造時期は特定していません。原材料の製造国の割合表示は変更される場合があります。（[来源](https://www.asahibeer.co.jp/products/beer/superdry/superdry.html)）

待补／未采用：

- `style`：官方此商品页未明确具体啤酒风格，不自行填入 Pilsner。
- `ibu`：官方商品页未列 IBU。
- `origin`：未将麦芽原料产地误当作成品原产地。

## 百年の孤独

维护键：`v01-006`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| 製造元（`manufacturer`） | 株式会社黒木本店 | [黒木本店公式 — 会社情報](https://www.kurokihonten.co.jp/company/) |
| 蔵元所在地（`origin`） | 宮崎県児湯郡高鍋町 | [黒木本店公式 — 会社情報](https://www.kurokihonten.co.jp/company/) |
| 種類（`style`） | 麦焼酎 | [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/) |
| 原材料（`ingredients`） | 麦、麦麹 | [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/) |
| アルコール度数（`abv`） | 40% | [黒木本店公式 — 百年の孤独](https://www.kurokihonten.co.jp/shochu/) |

版本与来源处理：

- 通常の「百年の孤独」720mlを参照。別欄の「百年のボトル」とは区別しています。（[来源](https://www.kurokihonten.co.jp/shochu/)）

待补／未采用：

- `aging`：所查官方商品页未列明熟成年数与桶种；不从风味中的オーク字样推断桶种。

## 塩田酒造 芋焼酎 六代目百合

维护键：`v01-007`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| 製造元（`manufacturer`） | 塩田酒造株式会社 | [鹿児島県酒造組合 — 六代目百合・蔵元情報](https://www.honkakushochu.or.jp/product/1547/) |
| 蔵元所在地（`origin`） | 鹿児島県薩摩川内市里町里 | [鹿児島県酒造組合 — 六代目百合・蔵元情報](https://www.honkakushochu.or.jp/product/1547/) |
| 原材料（`ingredients`） | 黄金千貫、米麹 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |
| 種類（`style`） | 芋焼酎 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |
| 蒸留方式（`distillationMethod`） | 常圧蒸留 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |
| 麹（`koji`） | 黒麹 | [正規特約店・登酒店 — 六代目百合 25度／35度](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html) |

版本与来源处理：

- 25度・35度の通常品は、原材料・麹・蒸留方式の記載が共通です。画像の度数は特定できないため、アルコール度数は掲載していません。原酒「風に吹かれて」とは区別しています。（[来源](https://www.nobori-sake.com/shouhin/syoutyuu/siota/siotasyuzou.html)）

待补／未采用：

- `abv`：可信酒商显示25度与35度产品；现有图片不能可靠辨读度数，不选择其中一值。

## 喜久盛酒造 タクシードライバー 純米生原酒

维护键：`v01-008`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| 製造元（`manufacturer`） | 喜久盛酒造株式会社 | [日本酒造組合中央会 — 喜久盛酒造・タクシードライバー](https://japansake.or.jp/sakagura/jp/iwate/kikuzakari-shuzou/) |
| 蔵元所在地（`origin`） | 岩手県北上市 | [日本酒造組合中央会 — 喜久盛酒造・タクシードライバー](https://japansake.or.jp/sakagura/jp/iwate/kikuzakari-shuzou/) |
| 特定名称（`designation`） | 純米酒 | [高橋酒店 — タクシードライバー 純米生原酒 R6BY 仕込9号](https://takahashi-sake.ocnk.net/product/4656) |
| 種類（`style`） | 生原酒 | [高橋酒店 — タクシードライバー 純米生原酒 R6BY 仕込9号](https://takahashi-sake.ocnk.net/product/4656) |

版本与来源处理：

- 参照先はR6BY・仕込9号・720ml（2025年7月瓶詰め）。掲載画像の年度・仕込号との一致は未確認のため、米・精米歩合・度数・日本酒度・酸度は採用していません。（[来源](https://takahashi-sake.ocnk.net/product/4656)）

待补／未采用：

- `ricePolishingRatio`：链接中55%只核实为R6BY仕込9号；图中批次不明，留空。
- `riceVariety`：链接中かけはし只核实为R6BY仕込9号；图中批次不明，留空。
- `abv`：链接中17度只核实为R6BY仕込9号；图中批次不明，留空。
- `sakeMeterValue`：链接中+2.8对应R6BY仕込9号，不套用到未知批次。
- `acidity`：链接中1.6对应R6BY仕込9号，不套用到未知批次。

## Bovet La Valote Absinthe Émeraude 50cl

维护键：`v01-009`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| 蒸溜所（`distillery`） | Absinthe Bovet La Valote | [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/) |
| 原産国・地域（`origin`） | スイス・Môtiers（Val-de-Travers） | [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/) |
| 種類（`style`） | アブサン（ヴェルト） | [AbsintheMarket — Émeraude 50cl](https://www.absinthemarket.com/produit/emeraude-bovet-la-valote-50cl/) |
| アルコール度数（`abv`） | 77% | [Absinthe Bovet La Valote公式 — Émeraude](https://absinthe-bovet.ch/)；[AbsintheMarket — Émeraude 50cl](https://www.absinthemarket.com/produit/emeraude-bovet-la-valote-50cl/) |

版本与来源处理：

- Émeraudeの77% vol.を参照。同じ77%のSeptante7、54%や65%の別製品とは区別しています。（[来源](https://absinthe-bovet.ch/)）
- 50cl製品の銘柄、蒸溜所、77°、Absinthes vertes分類を照合。（[来源](https://www.absinthemarket.com/produit/emeraude-bovet-la-valote-50cl/)）

待补／未采用：

- `ingredients`：品牌系列的十种植物说明未明确逐款配方，不作为Émeraude完整原料表。

## ブリュードッグ パンクIPA

维护键：`v01-010`（只用于内部维护，详情不显示）。

| 参数 | 已核实值 | 具体来源 |
| --- | --- | --- |
| ブルワリー（`brewery`） | BREWDOG | [BREWDOG日本公式 — PUNK IPA](https://www.brewdog.jp/lineup/) |
| ビアスタイル（`style`） | インディアペールエール（IPA） | [BREWDOG日本公式 — PUNK IPA・ブランド紹介](https://www.brewdog.jp/story/) |
| アルコール度数（`abv`） | 5.5% | [BREWDOG日本公式 — PUNK IPA](https://www.brewdog.jp/lineup/) |

版本与来源处理：

- 日本公式のPUNK IPA 5.5%。提供商品画像のラベルもAlc.5.5%。他地域・別時期の度数や別銘柄の数値は採用していません。（[来源](https://www.brewdog.jp/lineup/)）
- PUNK IPAのビアスタイルを参照。ブランドの創業地は、この画像の製品の製造地域を保証するものではありません。（[来源](https://www.brewdog.jp/story/)）

待补／未采用：

- `ibu`：日本公式の商品条目未列 IBU；不采用其他时期配方或其他产品的苦味值。
- `origin`：未核实本图对应产品的具体生产地域，不将品牌起源自动等同产地。

## 额外核对但未作为产品规格采用的资料

- 第 4 款原始 [Roger Goulart 链接](http://www.rogergoulart.ne.jp/lineup/#brut) 经 HTTP/HTTPS 尝试均未能读取；链接按用户要求原样保存，访问有效性尚未确认。检索到[ドラジェ的 Viña Adelaida Brut Nature NV](https://item.rakuten.co.jp/tamaki-web/18070901/)、[2018 品鉴条目](https://www.gilbertgaillard.com/en/resultats/cava-vina-adelaida-brut-nature-233988)及不同年份零售资料，无法确认与名称中的 Reserva 一致；没有采用其制造者、葡萄、ABV、熟成或分类值。分类仍 null，识别状态仍 confirmed。
- 华熊的官方店只能取得年龄门限及具体商品名，点击年龄确认未返回规格正文。品牌发布稿中的 5.0% 属于「彩の熊のラガー」，不套用。评价/聚合网站 IBU 存在25与50差异，不作为可靠证据；「ベルギーの華熊」和 Harvest Brew 也与当前商品不同。
- タクシードライバー 官方网站 https://kikuzakari.jp/ 及 HTTP 入口均未能读取，使用中央会的酒蔵资料核对制造者与所在地。原高橋酒店链接明确是 R6BY、仕込9号、2025年7月瓶詰め：精米55%、米かけはし、17度、日本酒度+2.8、酸度1.6。现有图片未提供年度/仕込号，以上数值全部不写入规格。
- 六代目百合的酒造组合资料确认制造者与所在地；正規特約店分别列25度与35度，原材料、黒麹、常圧蒸留一致，可收录共同字段。图片区分不了度数，因此 ABV 留空。
- PUNK IPA 商品图可读 Alc.5.5%，与日本公式的5.5%一致。品牌故事中的创立地不作为这瓶酒的生产地域；没有采用其他时期或市场的数值。

## 数据存储与追溯边界

所有采用值、逐字段 sourceIds、来源 title/url/checkedAt/versionNote 和未核实原因均在 `data/manual.json.products`，导入时合并进入 catalog；自动生成文件不是人工入口。来源查询记录不是网页内容存档；外部网页可能更新，后续核对应同时保存适用版本并更新日期。结构检查不会代替人工事实核查。


## 第四轮链接与版本复核（2026-10-11）

以下为对第三轮记录的增量更新；上文旧 URL 与当时的访问结论作为历史证据保留。

- 酒款：`v01-004`，名称继续为「ヴィーニャ･アデライダ カバ ブリュット・ナチュール レセルバ」，作品识别继续 confirmed。
- 现行商品资料链接：[Dragee — W-SK18070901](https://www.dragee.co.jp/fs/dragee/W-SK18070901)。已更新第1巻/info.txt；人工层原先没有 URL 覆盖字段，因此无需添加重复覆盖。
- 访问验证：直接 HTTP GET、跟随重定向后 HTTP 200，最终 URL 与指定地址一致。网页使用 CP932 编码；检索工具的 Unicode 解码错误不代表网站拒绝访问。已按实际编码读取商品标题及规格表。
- 页面商品编号 W-SK18070901；标题明确为「カヴァ ヴィーニャ・アデライダ ブリュット・ナチュレ NV 白」，即 Brut Nature NV。未见 Reserva / レセルバ 标记，未在该页找到可归属本款的酒精度。

| 新页面可核实内容 | 页面明确记载 | 本项目采用范围 |
| --- | --- | --- |
| 生产者 | ボデガス・ロペス・モレナス | 仅确认该 NV 条目；不写入原 Reserva 商品规格 |
| 葡萄品种 | マカベオ / パレリャーダ | 同上，不能自动视为不同版本共通配方 |
| 国家 | スペイン | 同上，未建立精确 Reserva 版本对应关系 |
| 原产地名称 | DOカヴァ | 不是制造地点证明；不推断具体地区 |
| 年份 | NV | 该销售条目明确非年份款；不等于证明 Reserva 不可能为 NV |
| Reserva / 熟成 | 未找到明确标记或熟成时间 | 保持空值 |
| 酒精度 | 未找到明确数值 | 保持空值；不采纳近似款的 11.5% / 12.5% |

相同编号的 [销售条目（Yahoo Shopping）](https://store.shopping.yahoo.co.jp/dragee-wine/w-sk18070901.html) 也将产品标为 NV，可作标题的交叉核对；没有提供足以证明漫画中的 Reserva 与当前 NV 条目完全一致的证据。NV 与 Reserva 描述的维度不同，二者不能仅凭其中一个词就判定等同或互斥。

结论：指定商品链接保留，原名称与 confirmed 均不变，分类及所有规格继续为空。未取得跨版本公共属性的直接证据，所以此次不新增参数。`data/manual.json.products.v01-004.specificationGaps.identityVersion` 已记录复核结论。其他 9 款资料、39 条规格、来源和图片关联全部保持不变。旧 Roger Goulart URL 仅保留于历史研究/快照/原剪辑，正式页面和当前导入数据不再引用。
