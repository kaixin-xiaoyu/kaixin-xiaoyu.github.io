# 开心的小宇宙 · 恋爱纪念站

基于 `https://kaixinlp.cn/` 现有内容重构的单页网站，时间起点为 `2021.02.03`（立春），当前展示到第五周年。

## 本地预览

```powershell
python -m http.server 4173
```

访问 `http://localhost:4173/`。

## 内容结构

- **周年纪念**：第 1～5 周年，各有独立照片位、日期和纪念文案。
- **纪念贴**：五周年、888 天、我们的时间胶囊。
- **恋爱贴**：Patrick Star、想和你做的 100 件小事。
- **日常贴**：snow、把普通的每天写成一封情书。
- 原“演示网页、演示、置顶测试、标签 tags 分类测试”内容已移除。

## 放入周年照片

将照片放入：

```text
assets/images/anniversaries/
```

文件名必须是：

```text
01-2022.jpg
02-2023.jpg
03-2024.jpg
04-2025.jpg
05-2026.jpg
```

页面会自动检测照片并替换对应占位卡片。第五周年照片会同时用于首页五周年主卡。

## 合并到现有 GitHub Pages / Hexo 仓库

将以下文件复制到原仓库根目录：

- `index.html`
- `styles.css`
- `script.js`
- `assets/` 目录

原来的文章目录以及真实文章 `888天`、`snow`、`Patrick Star` 建议保留；测试文章可以从 Hexo 的 `source/_posts/` 中删除。