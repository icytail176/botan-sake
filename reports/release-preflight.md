# 第四轮首次公开发布准备记录

检查日期：2026-10-11。状态：**本地准备完成，等待用户确认首次公开发布。尚未创建远程、提交、推送、启用 Pages 或部署。**

## 目标与 GitHub 只读检查

- 目标：公开仓库 icytail176/botan-sake；预期网站 https://icytail176.github.io/botan-sake/ 。该地址尚不是本轮已验收的线上成果。
- gh 现有认证账户为 icytail176，支持 repo/workflow 操作；没有在文档中保存 token、认证文件或私人邮箱。
- GraphQL 仓库查询未找到目标；REST GET repos/icytail176/botan-sake 返回 HTTP 404。发布前须再查一次，若出现已有内容需确认目标，不能覆盖或 force push。
- 本地原先不是 Git 仓库，已 git init -b main。使用已核实公开账号 ID 对应的 GitHub noreply 作为仓库局部提交身份；没有修改全局配置。当前没有提交和 remote。
- 旧 icytail176/image-host 没有写入、删除或其他变更。

## 数据准确性

第4款 v01-004 的当前商品链接统一为 https://www.dragee.co.jp/fs/dragee/W-SK18070901 。第1巻/info.txt 为维护入口；人工层原先无 URL 覆盖。指定页面 GET 为200、CP932编码，商品编号一致，但标题明确为 Brut Nature NV；未找到 Reserva 证明或明确酒精度。

页面列出生产者ボデガス・ロペス・モレナス、葡萄マカベオ/パレリャーダ、スペイン、DOカヴァ，仅适用于该销售条目。未取得原 Reserva 版本的对应或共同属性证据，不导入这些规格。原名称、confirmed、空分类/规格保持；39条已有规格未减少。详见 specification-research.md 第四轮增量记录。

round4-preservation.json 逐字段比较第三轮基准：其他9款完整商品对象相同，全部登场记录/图片关联相同，第4款仅 URL 与未核实原因改变。连续两次导入最终数据相同，人工JSON与维护文本字节不变。历史旧链接保留于研究报告、快照、原剪辑，当前网站/data/catalog.json 不引用它。

## 本地验收

- npm run verify：11项测试通过；导入、类型检查、构建、数据/链接校验通过。Astro 0 errors / warnings / hints。
- npm run build：独立构建通过。13个HTML页面，12条sitemap URL，271个站内引用，30个页面图片引用；10款酒与10个confirmed，9款有39条规格。
- 导入唯一提示为第4款未分类，属于有意保留的资料缺项，不阻止构建。
- Chrome / Playwright：375、390、768、1440px 每个屏宽访问全部10个详情、首页、关于页、404；图片加载、白底1:1商品图、原始比例截图、长名称与参数表格均无横向溢出。
- 搜索、类别/卷筛选、空结果重置、返回恢复筛选、前后导航、Lightbox原寸/滚动/Esc/遮罩/关闭按钮与焦点管理通过。
- 商品资料URL与目录数据一致；参数值/来源对应正确；详情没有内部编号、话数、页码、confirmed标签或空参数行。
- canonical 与 sitemap 指向预期 /botan-sake/；真实缺失路由返回自定义404，404为noindex且可返回首页。没有旧图床或旧Roger商品地址出现在正式页面。
- 本地报告 browser-validation.json 明确标记 scope=local，截图在 reports/screenshots/local/（不提交）。online-validation.json 尚未生成，**尚未执行任何实际线上验收**。未声称 Actions/Pages 成功。

## Pages 与反馈入口

保留现有官方部署方案。2026-10-11复核 [Astro官方文档](https://docs.astro.build/en/guides/deploy/github/) 和 [withastro/action@v6源码](https://github.com/withastro/action/blob/v6/action.yml)：checkout@v7 / withastro/action@v6 / deploy-pages@v5，Node24，main推送及手动dispatch，contents:read、pages:write、id-token:write，deploy依赖build成功。

仅移除冗余 package-manager:npm 输入，改由 package-lock.json 自动识别；官方 action 的显式输入分支不会设置LOCKFILE变量，而自动检测分支会设置，避免 setup-node 缓存依赖路径缺失。官方安装命令是 npm install，正常使用已提交锁文件；没有虚称其执行 npm ci。本地安装命令仍推荐 npm ci。build-cmd继续 npm run verify。

site=https://icytail176.github.io，base=/botan-sake，完整静态输出。仓库创建后需 Settings → Pages → Source=GitHub Actions，等待build/deploy成功，再运行 npm run test:online；该命令使用真实网站、独立输出线上报告与截图。

关于页已保留作品/图片权利归属及非官方声明。data/site.json 保持 contactEmail=null，增加新仓库的 GitHub Issues 入口，明确投稿公开；该入口需仓库创建并启用 Issues 后才可使用。没有编造或公开私人邮箱。

## 待公开文件与素材范围（需要用户明确确认）

已审查并暂存99个文件，约15.9MB（其中50个图片文件）；git diff --cached --check通过。完整候选清单见 release-files.txt；最终准备推送前应再次检查 git diff --cached --stat。

1. 第1巻/products 的10张商品原图（原文件名、原字节保留）。
2. 第1巻/scenes 的10张漫画截图（原文件名、原比例、原字节保留）。
3. public/images/originals 的20个原图内容哈希副本，以及 public/images/thumbs 的10个800×800 WebP缩略图。仓库合计50个图片文件；其中漫画原文件及网站副本都会公开、可下载。
4. Astro源码、维护用info.txt、人工数据和自动数据、原图校验基准、导入/构建/测试脚本、依赖锁文件、配置、Actions工作流、README及交付/研究报告。
5. 历史研究/数据快照和原始textClipping备份会随源码公开，其中保留旧商品与图床URL，网站不使用它们。

.gitignore排除 node_modules、dist、.astro/.cache/.vite、测试截图/报告目录、coverage、日志、.DS_Store、.env、私钥文件及编辑器目录。候选文本和剪辑检查未发现凭证模式、私人邮箱或用户目录路径；20张原图元数据检查未发现GPS、邮箱、用户目录路径或凭证模式。截图UserComment仅为Screenshot标记。元数据原值不写入报告。无压缩、修改、覆盖原始素材；初始21个原文件SHA-256全部保持。

**需要用户确认：是否允许将以上源码、历史资料、10张商品图及10张漫画截图连同其副本/缩略图公开到 icytail176/botan-sake，并通过 GitHub Pages 展示；是否已确认或接受处理这些图片的来源、权利及未来纠错/删除请求，并使用 GitHub Issues作为公开反馈入口。** 本地检查与非官方声明本身不构成图片发布授权。

## 确认后的执行与验收

获确认后再次检查远程是否存在 → 创建/连接目标公开仓库（不覆盖无关内容）→ 本地提交main → 正常推送（不force）→ 设置Pages Source为Actions → 等待/触发工作流 → 核实build及deploy实际成功 → 访问正式网站并运行 test:online → 更新交付/发布记录。GitHub权限或设置如无法通过现有认证完成，准确说明手工步骤，不报告虚假成功。

线上验收需单独确认全部10个详情、关于页、404、所有图片和来源链接、Lightbox、筛选导航、四种屏宽及canonical/sitemap。此次截至确认阶段，以上线上项目全部待执行。

## 日常维护

添加卷目录图片 → 更新该卷info.txt → 必要时在manual.json确认或补规格/来源 → npm run verify → 检查git暂存文件 → commit并push main → Actions自动更新。无需修改页面组件或建立后台。
