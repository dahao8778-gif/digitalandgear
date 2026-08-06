# digitalandgear.com 部署前综合评测报告

**评测日期：** 2026-08-06  
**评测范围：** 34 个 HTML 文件、3 个 CSS、3 个 JS、103 个图像文件  
**上次评分：** 6.9/10  

---

## 总览：部署前评分

| 维度 | 上次 | 本次 | 变化 |
|------|------|------|------|
| SEO 基础设施 | 9.0 | 7.5 | ⬇ (OG/schema 不完整) |
| 性能 | 4.5 | 3.5 | ⬇ (无 defer/preconnect/inline CSS) |
| 代码质量 | 5.5 | 5.5 | → (已清 BOM/console, 新问题) |
| 联盟合规 | 8.5 | 8.5 | → |
| 内容/E-E-A-T | 6.0 | 6.0 | → (作者身份仍缺失) |
| 移动端适配 | 7.0 | 7.0 | → |
| 资产优化 | 6.0 | 4.5 | ⬇ (大量未使用文件) |
| **综合** | **6.9** | **6.1** | **⬇ 需修复后上线** |

---

## 🔴 P0 — 部署前必须修复（上线阻塞项）

### 1. 13 个页面缺少 components.css — 布局崩溃
**影响页面：** about.html, contact.html, privacy.html, how-we-test.html, editorial-guidelines.html, affiliate-disclosure.html, advertising-disclosure.html, 404.html, 以及 5 个独立评测页（levoit-core-300, coway-ap-1512hh, winix-5500-2, blueair-211plus, best-air-purifier-for-pets）

这 13 个页面只加载了 `style.css` 而没有 `components.css`，导致所有使用组件类（`.quick-pick-card`、`.spec-table` 等）的元素渲染异常。

**修复：** 在每个页面的 `<head>` 中添加 `<link rel="stylesheet" href="../css/components.css">`

### 2. Google Fonts @import 阻塞渲染
`css/style.css` 第 7 行使用 `@import` 加载 Google Fonts，这导致浏览器必须先下载 style.css，然后才发现需要加载字体 CSS。全程阻塞首屏渲染。

**修复：**
- 从 style.css 中删除 `@import` 行
- 在所有页面的 `<head>` 开头添加：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Merriweather:wght@400;700;900&display=swap">
```

### 3. 所有页面缺少 `<script defer>` — JS 阻塞渲染
34 个页面全部使用 `<script src="...">` 不带 `defer`，导致浏览器在遇到 `<script>` 标签时暂停 HTML 解析。`components.js` 和 `main.js` 都应在 DOM 就绪后执行。

**修复：** 将 `<script src="...">` 全部改为 `<script src="..." defer>`

### 4. 58.5MB 未使用原始文件在生产目录
`images/pin/originals/` 下 19 张原始 PNG 共 58.5MB，已全部压缩为 WebP，但原始文件仍留在部署目录中。另外还有 2 个重复的 `og-default.jpg` 副本。

**修复：** 删除 `images/pin/originals/`、`images/og-default.jpg`、`images/pin/og-default.jpg`（保留 `images/air-purifiers/og-default.jpg`）

### 5. 17 个页面 meta description 为空
about, contact, privacy, how-we-test, editorial-guidelines, editorial-policy, affiliate-disclosure, 以及 7 个指南页 + 3 个评测页的 `<meta name="description" content="">` 为空。

**修复：** 为每个页面编写唯一的、150-160 字符的 description。

---

## 🟠 P1 — 高优先级（影响 SEO 和用户体验）

### 6. 19 个页面完全缺少 Open Graph 标签
about, contact, privacy, how-we-test, editorial-guidelines, editorial-policy, affiliate-disclosure, advertising-disclosure, 以及 5 个评测页 + 6 个指南页没有 OG 标签 → 社交分享时无预览图/标题。

### 7. 3 个页面无结构化数据
about.html, contact.html, privacy.html 完全没有 JSON-LD 结构化数据。

### 8. 2 个页面加载无用字体（Inter）
best-air-purifier-for-pets.html 和 coway-ap-1512hh-review.html 通过 `<link>` 额外加载了 Inter 字体，但 CSS 中从未使用 → 浪费约 100KB 带宽。

### 9. 任何页面都没有 preconnect 优化
没有页面为 `googletagmanager.com` 设置 preconnect → 每次 DNS 解析 + TLS 握手增加 200-300ms 延迟。

### 10. HTML 仍引用 JPG 而非 WebP
多个页面引用 200KB+ 的 JPG 产品图，但 `images/air-purifiers/` 下已有 3-5KB 的 WebP 副本。例如 levoit-core300.jpg (255KB) → .webp (3.5KB)，节省 98.6%。

### 11. 2 个 WebP 转换失败
`levoit-vital200s.webp` (206KB) 和 `coway-airmega.webp` (197KB) 与 JPG 源文件几乎一样大 — 说明转换使用了无损模式或参数错误，需重新压缩。

---

## 🟡 P2 — 中优先级（建议修复）

### 12. Twitter Cards 仅 5 个页面
28 个页面缺少 Twitter Card 标签。

### 13. 仅 3 个页面有 `og:site_name`
30 个页面缺少 `og:site_name`。

### 14. 29 个页面缺少 robots meta 显式声明
Google 默认 index/follow 所以不算错误，但显式声明是最佳实践。

### 15. 15 个页面 title 标签格式混乱
title 标签内容跨多行分布，影响代码可读性和模板维护。

### 16. 部分 img 缺少 width/height
best-air-purifiers-2026.html 中约 10 个图片缺少 `width`/`height` 属性 → 导致 CLS（布局偏移）。

### 17. 部分非首屏图片缺少 loading="lazy"
best-air-purifiers-2026.html 和其他页面中约有 11 个位于折叠下方的图片未使用懒加载。

### 18. 缺少 favicon.ico 和 apple-touch-icon.png
仅有 SVG favicon，旧浏览器和 iOS 不支持。

### 19. 67 个未使用图像文件
包括 14 个未引用的 pin WebP、22 个未引用的 Pinterest SVG、16 个 PDF 替代格式等。建议清理或保留用于将来内容。

---

## 🟢 P3 — 低优先级（锦上添花）

### 20. purifier-finder.js 中的 DOM 查询无空值检查
`document.querySelector('.finder-nav')` 等若元素不存在会抛错误。

### 21. innerHTML 模式存在 XSS 风险
目前使用硬编码数据所以安全，但代码架构上存在隐患。

### 22. 13 个信息页缺少站点名后缀
about.html 等页面 title 中没有 "| Digital & Gear" 后缀。

### 23. Article schema 缺少 image 属性
影响 Google 搜索结果的富媒体展示。

### 24. 无 srcset 响应式图像
所有 `<img>` 只提供单一尺寸，移动端用户下载不必要的全分辨率图像。

---

## 部署检查清单

| # | 检查项 | 状态 |
|---|--------|------|
| 1 | 所有页面加载 components.css | ❌ 13 页缺失 |
| 2 | 字体加载方式优化（去掉 @import） | ❌ |
| 3 | 所有 script 标签添加 defer | ❌ |
| 4 | 清理未使用的原始大文件 | ❌ |
| 5 | 填充所有空 meta description | ❌ |
| 6 | 关键页面添加 OG 标签 | ❌ |
| 7 | 添加 preconnect 提示 | ❌ |
| 8 | JPG → WebP 引用替换 | ❌ |
| 9 | 修复大体积 WebP | ❌ |
| 10 | sitemap.xml 已包含所有页面 | ✅ |
| 11 | robots.txt 配置正确 | ✅ |
| 12 | 结构化数据语法正确 | ✅ |
| 13 | 无断链引用 | ✅ |
| 14 | GTM 容器 ID 一致 | ✅ |
| 15 | canonical URL 正确 | ✅ |
| 16 | viewport meta 所有页面存在 | ✅ |

---

## 预估修复后评分

| 维度 | 当前 | 修复后 |
|------|------|--------|
| SEO 基础设施 | 7.5 | 9.0 |
| 性能 | 3.5 | 7.0 |
| 代码质量 | 5.5 | 7.0 |
| 资产优化 | 4.5 | 8.0 |
| **综合** | **6.1** | **7.8** |
