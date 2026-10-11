# 第五轮发布与第4款NV修订 — 2026-10-11

用户已明确授权正式推送和发布。本地第五轮资料/UI全部保留，第4款对齐Dragee W-SK18070901的NV版本。本地验收、正常提交推送、GitHub Actions构建部署及实际线上验收均已完成。正式网站已显示第五轮资料与第4款NV修订。

历史记录：[第四轮发布](round4-delivery.md)、[第五轮本地交付](round5-local-delivery.md)。资料：[第五轮研究](specification-research-round5.md)、[第4款NV补充](specification-research-round5-nv.md)。

第4款名称为「カヴァ ヴィーニャ・アデライダ ブリュット・ナチュレ NV」，分类ワイン；11条规格、1段介绍、1条销售商风味、1条制造者背景均有来源。全站总54条规格、10段介绍、9条风味、6条背景。原39条值及其他9款全部资料、10confirmed与图像关联保持。语义为记录对齐用户指定销售产品，不独立证明漫画版本的全部细节。

Dragee本店CP932正文已读取；两条Rakuten地址连接超时，未读。紀伊国屋リカーズ同商品码的Yahoo店正文证实NV的11.5%、90/10、9个月、750ml与シャンパーニュ製法；明确标注酒商销售规格和未列批号的范围。背景采用制造者官方1943年历史。甘辛、残糖、ドザージュ及实际生产批号尚未核实。

Header精简、标题首页链接与焦点反馈、卷筛选箭头右18px/垂直居中、右padding48px全部保留。网站仍使用本仓库本地图片，旧image-host未操作。

发布前仓库检查：main，远程与HEAD均为461bde244385c9ebce61c6c7ade6e85763ffcd3e，无新增远程提交。使用已有gh账户与Pages workflow来源，不重新建仓。已在本地验收及文件审查后正常提交推送，无force。

本地npm run verify（14项测试）、独立npm run build、npm run test:browser均通过。13页面、10confirmed、54规格、10/9/6文章模块、21原素材哈希保持。375/390/768/1440px的全10详情、搜索、NV搜索与葡萄酒筛选、Lightbox、导航及来源锚点均通过，0脚本错误、0非预期失败请求，手机/桌面NV截图已查看。新增参数使作品截图超出初始懒加载范围，浏览器测试已改为实际滚动后解码，而不是在滚动前无限等待；网站懒加载逻辑未改。111个版本文件预审未发现凭证、私人路径、无关缓存或未忽略截图；git diff --check通过。

## 正式发布结果

内容提交：`7a905b882452f699dff54f49e5f3172a7f1a7b09`，已推送origin/main。[Actions 38115688354](https://github.com/icytail176/botan-sake/actions/runs/38115688354)的headSha与该提交完全一致，build和deploy均success，部署完成时间2026-10-11 05:43:47 UTC。Pages来源为GitHub Actions，HTTPS已启用，无需用户手工设置权限。

- 正式网站：https://icytail176.github.io/botan-sake/
- 源码仓库：https://github.com/icytail176/botan-sake
- 第4款详情：https://icytail176.github.io/botan-sake/sake/v01-004/

部署后再次执行npm run test：14项全通过。npm run test:online实际访问HTTPS正式网站，375/390/768/1440px均通过，全10详情、NV名称与11规格、第五轮介绍/风味/背景及其来源锚点、原始截图、搜索、酒类和卷筛选、Lightbox、前后导航、标题返回首页、关于页、404、canonical和sitemap均正常，无横向溢出，0脚本错误、0非预期失败请求。实际线上375px/1440px的NV详情及1440px首页截图已目视检查。截图只保存在被忽略的本地目录，不提交。

独立线上HTTP与SHA-256检查：13个HTML、33个资源（30图片、1 CSS、favicon及sitemap）全部200且与本地dist逐字节相同；各页内联JavaScript包含在HTML哈希核验中，无额外外部JS文件、无旧图床或旧Roger Goulart产品依赖。缺失路由实际返回自定义404。

机器记录：[发布记录](release-round5-2026-10-11.json)、[线上浏览器](online-validation.json)、[线上资源](online-assets.json)。第四轮旧线上证据归档至round4-online-validation.json和round4-online-assets.json，保留历史。此次上线后的文档与验收记录另行正常提交推送，页面代码与已验收内容不变。

原生select方向键提交在macOS自动化中的已知限制保留；Tab焦点和点击选择可测，Windows/Safari/手机真机未覆盖。日常维护命令仍为npm run verify，确认变更后git commit与git push origin main，发布后npm run test:online。
