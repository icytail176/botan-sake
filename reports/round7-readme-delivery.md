# 第七轮：双语README与第六轮成果发布

2026-10-11。用户明确授权本轮与第六轮成果一并正常提交、推送和发布，无需再次确认。开始时main与origin/main均为51f7ecd6e456b9328267882adb4f27398ea52371，fetch后差异0/0。第六轮未提交文件保留，AGENTS、三份docs、Skill、三份记录及维护测试没有重建或丢弃。

## README设计与截图

166行，公共区为居中日文标题、中日副标题、Astro/TypeScript/Pages徽章和真实deploy.yml/main动态状态、显著网站链接及语言跳转。中文在前、日文在后，均含简介、预览、功能、技术栈、本地运行、文档和权利说明。网站UI仍为日文，不新增双语页面功能、不虚构产品能力、不声明不存在的许可证。

真实截图见[截图记录](round7-screenshots.json)：正式首页1440×1340与390×1290，秩父錦純米大吟醸详情完整页面1440×2935。保存为docs/assets三张WebP，总223656字节（约218.4KiB），质量90。截图使用独立Chrome，加载字体/原图后捕获，无DOM或网站内容修改；首页裁剪停在完整商品组之后。三张最终文件已目视检查，原商品/作品素材不变。

桌面首页常显，手机/详情放在原生details内，日文链接到同一组预览，避免重复渲染大图。相对路径在仓库内，原生GitHub支持的HTML仅用于居中、徽章、折叠及手机图宽度，无自定义CSS。版权声明包含非官方关系、各自权利归属、来源与Issues反馈；公开仓库不等于自由再许可。

## 本地验证与保留

npm run verify通过18项测试、导入0警告、Astro0错误/警告，13页面构建正常。维护链接测试增加对Markdown语言锚点及HTML href/src的检查，保留原A/B/C临时场景，不关闭任何测试。相对图片、docs、Skill链接和实际workflow文件通过。

[发布前验收](round7-preflight.json)：121个需要保留的已有/第六轮文件逐字节不变，46个dist文件与变更前一致。10confirmed、54规格、10介绍/9风味/6背景，原图哈希和关联不变。源页面、样式、人工数据、导入脚本和部署工作流无修改。127个待版本管理文件已检查，无私人路径/凭证或忽略缓存/调试截图。第六轮Skill在当前会话技能目录中已被列出，正文保持原样。

## 发布状态

第六轮维护体系与第七轮README已一并提交、正常推送到main：`c708be3aaac598e4eb4857b8a8216056ea099a18`。没有force push，未操作旧icytail176/image-host。

[GitHub Actions 38117562282](https://github.com/icytail176/botan-sake/actions/runs/38117562282)已完成，build与deploy均success，headSha与上述提交一致。发布记录见[release-round7-2026-10-11.json](release-round7-2026-10-11.json)。

[实际GitHub仓库首页](https://github.com/icytail176/botan-sake)已用Chrome/Playwright在1440px和390px验收：标题与真实passing徽章正常，中日语言跳转、日文预览跳转、折叠预览、三张截图及五份文档入口均正常，无横向溢出。[检查记录](round7-github-validation.json)保存实际HTTP结果；标题区和预览均已目视检查。连续请求一度触发GitHub 429，降低访问频率并以正常浏览器页面导航重试后，全部文档返回200；没有将限流结果判为通过。

[正式网站](https://icytail176.github.io/botan-sake/)线上13个HTML和33个静态资源全部200、哈希与本地构建一致，含30张图片、CSS、favicon及sitemap，脚本内联于已核对HTML；无旧图床依赖。见[线上资源验证](round7-site-validation.json)。

[线上浏览器验证](round7-website-browser.json)：390px下首页、10款详情的名称/商品链接/图片、NV第4款、搜索、酒类与卷数筛选、Lightbox与Escape关闭、标题返回、关于页、真实404均通过，无横向溢出或脚本错误。没有将本地结果替代线上结果。本轮未改页面设计，未重复不同系统/浏览器的兼容性验收；实际环境为Chrome。

本次验收与发布记录另作正常提交，随main推送；其工作流结果在最终交付时核对。README、原始资料、人工数据、网站产物与第六轮维护体系保持上述已验收状态。无需用户手工配置权限或再次确认发布。
