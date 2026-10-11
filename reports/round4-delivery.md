# 首次正式发布交付 — 2026-10-11

**「ぼたんの酒手帖」已成功发布，实际线上验收通过。无需用户手工设置 GitHub 权限。旧 icytail176/image-host 没有任何写入或删除。**

- 正式网站：[https://icytail176.github.io/botan-sake/](https://icytail176.github.io/botan-sake/)
- 公开仓库：[icytail176/botan-sake](https://github.com/icytail176/botan-sake)
- [首次 Actions 构建和部署](https://github.com/icytail176/botan-sake/actions/runs/38112645236)：push 触发，build 与 deploy 均 success。
- 初次发布提交：f60fe619a7f5a6f4dbebbf5b2e05908a22e44644；main，正常推送，无 force。
- Pages 来源：GitHub Actions（build_type=workflow）；HTTPS启用。仓库Issues已启用，关于页反馈链接生效；未公开私人邮箱。

## 发布前检查

用户明确确认公开范围后，再检查暂存的99个文件与此前清单一致，无不应公开的缓存、构建产物、日志、截图、凭证模式、私人邮箱或用户目录路径。21个原素材/剪辑哈希全部核对未变。原图没有重压缩或覆盖；50个图片文件包括20张源图、20个网站原图副本、10张派生缩略图。

第4款链接由维护用第1巻/info.txt导入，当前为 [Dragee W-SK18070901](https://www.dragee.co.jp/fs/dragee/W-SK18070901)。网页确认为Brut Nature NV，未取得Reserva对应证据，原名称与confirmed不变，未套用NV参数。其他9款资料、图片关系、39条规格/来源保持；历史旧链接只作研究追溯，正式网站不引用。

本地 npm run verify（11项测试）及独立 npm run build 已通过；导入唯一提示为第4款未分类的资料缺项。首次远程Actions也实际运行verify并成功构建/上传完整静态资源，之后deploy成功。

本机首次Git HTTPS连接遇到默认DNS地址连接异常，单次命令使用经公共DNS验证的可连接GitHub地址后推送成功，保持TLS验证与gh认证；没有更改系统DNS或全局Git配置，没有存储固定IP/凭证。未需要用户操作GitHub页面。

## 实际线上验收

测试直接访问正式HTTPS地址，未使用本地服务器。Chrome / Playwright的375、390、768、1440px全部通过，并查看桌面首页与手机第4款详情截图确认实际布局。

| 项目 | 线上结果 |
| --- | --- |
| 页面 | 首页、全部10详情、关于页、直接404页面均可访问；未知路由返回自定义404；日语标题和内容正常 |
| 图片 | 商品原图/缩略图/漫画截图全部正常，1:1白底实物图与原始截图比例保留 |
| 搜索与筛选 | 日文搜索、类别/卷数筛选、无结果重置、浏览器返回恢复筛选通过 |
| Lightbox | 打开、原寸切换/滚动、关闭按钮/Esc/遮罩、键盘焦点管理通过 |
| 导航 | 首页/返回图鉴/前后酒款/关于页/404返回链接正常 |
| 商品与参数 | 第4款为新Dragee链接；其他9款链接及39行参数/来源与当前数据一致 |
| 详情显示 | 不展示内部编号、话数、页码或confirmed标签；登场卷数正确；无空参数行 |
| 响应式 | 四种屏宽全部页面/参数表格无水平溢出，长名称正常换行 |
| 运行与路径 | 所有屏宽0运行错误、0非预期失败请求；资源均在/botan-sake/下，没有旧图床或旧Roger商品地址依赖 |
| 静态资源 | 独立HTTP检查33个资源全为200：30个图片、1个CSS、favicon及sitemap；全部SHA-256与本地验收构建一致 |
| JavaScript | 当前脚本内联在HTML，无外部JS文件；线上搜索/筛选/Lightbox行为正常，无脚本运行错误 |
| canonical / sitemap | 13页面canonical正确，12条sitemap URL均为正式域名和/botan-sake/路径；404为noindex |

外部商品/规格链接检查的是与维护数据及参考锚点的对应；未声称此次重新访问每个外部来源页面。Safari、Firefox、真实iOS/Android设备未覆盖，四种屏宽为桌面Chrome模拟视口。

证据：online-validation.json（scope=online）、online-assets.json、release-2026-10-11.json。线上截图在reports/screenshots/online/，本地保留并由Git忽略。browser-validation.json仍保留上一轮local结果，未将其替换成线上证据。

## 日后维护

把商品图和截图加入第N巻目录，更新info.txt；必要时在data/manual.json确认识别或维护参数与来源，然后：

```sh
npm run verify
git add .
git diff --cached --stat
git commit -m "Update sake archive"
git push origin main
```

Actions自动更新网站；等待成功后可执行 npm run test:online验收真实线上网站。新增酒款/卷不需要改页面组件。网络正常时无需再次设置Pages、创建仓库或登录；若push连接超时，先检查本机网络/DNS。

详细维护流程见README；版本考据见specification-research.md，首推前范围见release-preflight.md和release-files.txt（历史清单）。
