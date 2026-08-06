# Digital & Gear 项目记忆

## 项目概况
- 域名：digitalandgear.com
- 类型：亚马逊联盟落地页网站 (Amazon Associates)
- 技术栈：纯静态 HTML/CSS/JS，无框架无 CMS
- 联盟 ID：dahao8778-20 (Amazon Associates tag)
- 主要品类：空气净化器 (Air Purifiers)，其余 5 个品类为 "Coming Soon"
- 页面数量：约 34 个 HTML 页面
- 社交：Pinterest (digitalandgear)

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
- ⏳ 待处理: 真实作者身份, 第2品类内容, 评测页内联样式 (best-air-purifiers-2026.html 仍有344处)

## 文件结构要点
- CSS: style.css (2694行), components.css, purifier-finder.css
- JS: main.js, components.js (组件注入系统)
- 结构: reviews/ guides/ categories/ tools/ 四大目录
- 结构化数据: Product + AggregateRating + Offer + ItemList + BreadcrumbList + FAQPage + Article
