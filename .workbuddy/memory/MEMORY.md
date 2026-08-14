# Digital & Gear 项目记忆

## 项目概况
- 域名：digitalandgear.com
- 类型：亚马逊联盟落地页网站 (Amazon Associates)
- 技术栈：纯静态 HTML/CSS/JS，无框架无 CMS
- 联盟 ID：dahao8778-20 (Amazon Associates tag)
- 主要品类：空气净化器 (Air Purifiers)（2026-08-13 已彻底删除全部 5 个 Coming Soon 空分类 Audio/Computers/Robot Vacuums/Smart Home/Home Appliances，旧 URL 全部 301 至 Air Purifiers）
- **网站定位：focused editorial website specializing in indoor air quality**（首页 title/hero/meta 已全部聚焦 Air Purifiers）
- 页面数量：约 34 个 HTML 页面
- 社交：~~Pinterest (digitalandgear)~~（2026-08-14 已彻底移除全站所有 Pinterest 关联）
- **内容定位：Research-based**（不使用 "Tested/Lab" 声明，合规 Pinterest Spam 政策）

## 2026-08-06 网站评测
- 综合评分：6.9/10
- 强项：SEO 基础设施 (9.0)、联盟合规 (8.5)、转化优化 (8.0)
- 短板：性能 (4.5)、代码质量 (5.5)、内容深度/E-E-A-T (6.0)
- 关键问题：
  - P0: images/pin/ 下 19 张 Pinterest 图片共 58.7MB 未压缩
  - P1: 首页 174 处内联 style=""，应迁移至 CSS
  - P2: 多个 HTML 文件头部有 2-3 个重复 UTF-8 BOM
  - P2: 缺少真实作者身份 (E-E-A-T)，只有 "Editorial Team"
  - P3: GTM TODO 注释残留、console.log 调试日志未清理

## 2026-08-06 修复记录
- ✅ P0: 图片压缩 — 使用 sharp 将 images/pin/ 下 19 张 PNG 转为 WebP, 58.5MB→1.9MB (减少96.8%), 原始PNG备份于 originals/
- ✅ P1: 内联样式迁移 — components.css 新增完整组件类体系 (section-header, pick-card, cat-card, latest-card, guide-card, testing-item 共5大组件及主题变体), index.html 174→13处
- ✅ P2: BOM清除 — 21个HTML文件中86个重复UTF-8 BOM已去除
- ✅ P3: 代码清理 — 33个文件GTM TODO注释 + main.js中3处console.log + Console Welcome
- ⏳ 待处理: 真实作者身份 (E-E-A-T, 用户已跳过), 验证 images/pin/*.webp 位图内文字 (需多模态模型)

## 2026-08-06 Pinterest Spam 专项整改（第三轮）
- ✅ 评分体系: 全站 /10 制归零, 统一 /5 星级制 (9.2→4.7 等换算), 星星与分数对齐, 20个 AggregateRating 校验通过
- ✅ 加权评分模型 (how-we-test.html 权重表): Performance/CADR 30% · Filtration 20% · Noise 15% · Value 15% · Filter Cost 10% · Features 10%
- ✅ how-we-test.html 重写为 "How We Research & Evaluate Products" 7 步方法论
- ✅ 数据来源标注: 6 个页面加 .table-note "Ratings based on manufacturer specifications, AHAM certification data, and verified customer feedback"
- ✅ CTA 密度: 删除 5 个无效自锚点按钮 (Amazon 链接 24→19)
- ✅ 全站 Research 定位: "Tested" 声明零残留 (html/svg/js/xml 全复查), 导航 "How We Test"→"How We Research" 58 处
- ✅ Coming Soon 分类已全部删除并 301 重定向, sitemap/robots/导航已更新

## 2026-08-13 网站收缩（聚焦 Air Purifiers）
- ✅ 删除全部 5 个 Coming Soon 空分类目录 (categories/{audio,computers,home-appliances,robot-vacuums,smart-home}/)
- ✅ _redirects 新增 5 条 301: `/categories/{audio,computers,home-appliances,robot-vacuums,smart-home}/* → /categories/air-purifiers/`
- ✅ robots.txt 删除 5 行 Disallow; guides/reviews/tools 索引页删除全部 Coming Soon 区块
- ✅ 首页定位改写: "Smart Product Reviews" → "Air Purifier Reviews & Buying Guides" (title/og/twitter/hero/schema)
- ✅ categories/air-purifiers 删除 Dyson/Honeywell 无内容品牌占位卡, 网格 3列→2列
- ✅ 全站 "Coming Soon" 零残留; sitemap.xml 无需改动

## 2026-08-13 Pinterest 解封前"真实性清洗"（外部 AI 审计第二轮）
- ✅ **P0 全清**：虚构测试声明（quiet 页 REED R8050/controlled bedroom、cat-litter 页 30 天多猫家庭实验）全部改写为 Research 表述
- ✅ "Independent testing" → "Independent research"（3 页 hero）; 首页/分类页/FAQ/JSON-LD Organization description 全部 Research 化
- ✅ 删除开发文件: test-images.html / test-svg.html / wrapper.html / review-template.html
- ✅ **20 个 Product Schema AggregateRating 全部移除**（Amazon 用户评分违反 Google 聚合评分政策）; 保留 Review schema reviewRating（编辑评分）
- ✅ 页面可见评分统一标注 "Digital & Gear Score: X.X/5" / "Our Score"
- ✅ how-we-test.html 新增 Sources & Verification 章节 + AHAM/ENERGY STAR/CARB/厂商官网真实外链
- ✅ 部署卫生: .gitignore 排除 .workbuddy/ + _headers 加 X-Robots-Tag noindex 兜底
- ⚠️ **重要约定：Product Schema 不要再加 AggregateRating**（需用 Amazon 评分时只作页面文本并标注 "Amazon customer rating"）
- ⏳ 遗留: images/pin/*.webp 位图内文字验证（需多模态模型）; 真实作者身份 E-E-A-T（用户已跳过）

## 2026-08-14 Pinterest 二次申诉修改（全站 Pinterest 关联彻底移除）
- ✅ **Pinterest 零残留**: 21 个 HTML 文件 JSON-LD sameAs、6 个 review 页 meta pinterest-rich-pin、data-pin-description 属性、about.html 可见链接、main.js share case、affiliate-tracking.js（完全重写移除 Pinterest 追踪逻辑）、AFFILIATE-TRACKING-UPDATE.txt（删除）、CSS 类名重命名、图片目录重命名 (images/pinterest/→images/graphics/, images/pin/→images/banners/)
- ✅ **Affiliate Disclosure 加强**: components.css 新增 .affiliate-disclosure-box 类; 14 个页面（首页+6评测+7指南）添加醒目披露框
- ✅ **About 页面柔化**: "Evaluation Process"→"Research Process"; 增加 "We do not conduct hands-on laboratory testing" 免责声明; Editorial Independence 增加联盟佣金透明披露
- ✅ **图片 alt 审计**: 53 个 img 标签 0 缺失 0 空
- ✅ **JSON-LD 验证**: 74 个块全部语法通过
- ⚠️ **重要约定：全站不得再出现任何 Pinterest 关联**（sameAs、meta 标签、分享按钮、追踪代码、目录名、CSS 类名均不可）

## 文件结构要点
- CSS: style.css (2694行), components.css, purifier-finder.css
- JS: main.js, components.js (组件注入系统)
- 结构: reviews/ guides/ categories/ tools/ 四大目录
- 结构化数据: Product + Offer + ItemList + BreadcrumbList + FAQPage + Article + Review（**2026-08-13 起不再使用 AggregateRating**）
