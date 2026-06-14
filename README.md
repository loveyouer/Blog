# 静思录 — 个人博客

> 关于技术、设计与生活的安静记录。

技术栈：Next.js 14 + Tailwind CSS + Framer Motion + Markdown，配色灵感来自一幅骑行插画。

---

## 📂 项目结构

```
CRTBlog/
├── app/                    # 页面路由
│   ├── page.tsx            # 首页
│   ├── about/page.tsx      # 关于页面
│   ├── categories/page.tsx # 文章列表
│   └── posts/[slug]/       # 文章详情页
├── components/             # 组件
├── lib/
│   ├── config.ts           # 博客配置（名字、简介、链接）
│   └── posts.ts            # 读取 Markdown 文章
├── posts/                  # 你的文章目录（核心）
│   ├── hello-world.mdx
│   ├── nextjs-static-export.mdx
│   └── ...
├── public/images/          # 静态图片
├── tailwind.config.ts      # 配色与主题配置
└── app/globals.css         # 全局样式
```

---

## 📝 添加新文章

### 1. 创建文件

在 `posts/` 目录下新建文件，**文件名规则**：

- 用英文，单词之间用 `-` 连接
- 后缀用 `.mdx` 或 `.md`
- 文件名会成为 URL 的一部分

**示例文件名**：

```
posts/
  how-i-learn-react.mdx        → 访问地址 /posts/how-i-learn-react/
  docker-usage-guide.mdx       → 访问地址 /posts/docker-usage-guide/
  weekly-review-2024.mdx       → 访问地址 /posts/weekly-review-2024/
```

### 2. 文件内容格式

每篇文章必须包含顶部的 **Frontmatter**（元数据），然后是正文：

```mdx
---
title: "文章标题"
date: "2024-06-15"
category: "开发笔记"
excerpt: "这篇文章的简短描述，会显示在首页列表中。"
tags: ["React", "前端", "教程"]
---

这里是正文内容，支持完整的 Markdown 语法。

## 小标题

- **粗体**：`**粗体文字**`
- *斜体*：`*斜体文字*`
- `行内代码`：`` `代码` ``
- [链接文字](https://example.com)

### 代码块

使用三个反引号包裹代码，可指定语言：

```js
const greeting = "Hello, World!";
console.log(greeting);
```

### 引用

> 这是一段引用文字，左侧会有一条珊瑚色竖线。

### 列表

有序列表：
1. 第一步
2. 第二步

无序列表：
- 项目 A
- 项目 B

### 图片

将图片放在 `public/images/` 目录下，然后引用：

```
![图片描述](/images/my-image.png)
```
```

### 3. Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题，显示在页面顶部和列表中 |
| `date` | ✅ | 发布日期，格式 `YYYY-MM-DD`，影响排序 |
| `category` | ✅ | 文章分类，决定文章出现在哪个分类下 |
| `excerpt` | ✅ | 文章摘要，显示在首页列表中，建议 50-120 字 |
| `tags` | ❌ | 标签数组，显示在文章详情页顶部，可省略 |

### 4. 可用的分类

博客内置了以下分类，你也可以直接使用自定义分类：

| 分类名 | 适合内容 |
|--------|----------|
| 开发笔记 | 编程、技术教程、工具使用 |
| 设计思考 | UI/UX、配色、排版、交互 |
| 阅读记录 | 读书笔记、书评 |
| 生活随感 | 随笔、日常、心情 |
| 工具推荐 | 软件、效率工具、开源项目 |

> **自定义分类**：直接在 `category:` 字段写新的分类名即可，不需要提前注册。文章列表页会自动统计所有分类。

### 5. 快速复制模板

```bash
# 复制现有文章作为模板
cd E:\Workspace\Project\CRTBlog
copy posts\hello-world.mdx posts\你的新文章.mdx
```

---

## 🗑️ 删除文章

### 方法一：直接删除文件

```bash
# 删除文章文件即可
cd E:\Workspace\Project\CRTBlog
del posts\要删除的文章.mdx
```

然后重新构建（见下方的"更新部署"步骤）。

### 方法二：隐藏文章（不删除文件）

如果你不想公开某篇文章但想保留文件，可以：

1. 将文章移到 `posts/draft/` 子目录（需要手动创建 `draft` 文件夹）
2. 或者将文件名改为不以 `.mdx` 或 `.md` 结尾（如 `文章名.mdx.bak`）

> 注意：博客只读取 `posts/` 目录下以 `.mdx` 或 `.md` 结尾的文件。

---

## 🏷️ 添加 / 修改 Tag

### 给文章添加 Tag

在文章的 Frontmatter 中修改 `tags` 字段：

```mdx
---
title: "React 学习笔记"
date: "2024-06-15"
category: "开发笔记"
excerpt: "记录 React 学习过程中的要点。"
tags: ["React", "前端", "Hooks", "JavaScript"]
---
```

- `tags` 是**数组格式**，用方括号 `[]` 包裹
- 多个标签用逗号 `,` 分隔
- 每个标签用双引号 `""` 包裹
- Tag 显示在文章详情页标题下方

### 修改已有文章的 Tag

直接编辑 `posts/` 目录下的文章文件，修改 `tags` 一行，然后重新构建。

---

## 👤 修改关于页面的简介

关于页面的个人信息来自 `lib/config.ts` 文件。修改以下字段：

```ts
// lib/config.ts
export const siteConfig = {
  name: "静思录",                    // 博客名称
  author: "你的名字",                // 你的昵称/名字
  description: "关于技术、设计与生活的安静记录",  // 博客一句话描述
  bio: "一个热爱技术与设计的人...",  // 关于页面中的个人简介
  email: "your@email.com",         // 联系邮箱
  github: "https://github.com/你的用户名",  // GitHub 主页
  twitter: "",                     // Twitter/X（可选，留空则不显示）
  url: "https://你的域名.vercel.app",  // 实际部署地址
};
```

### 修改后需要重新构建

修改 `config.ts` 后，必须重新构建才能生效：

```bash
cd E:\Workspace\Project\CRTBlog
node "C:\Users\Win11\AppData\Local\Programs\kimi-desktop\resources\resources\runtime\node_modules\npm\bin\npm-cli.js" run build
```

---

## 🔄 更新部署（完整流程）

每次添加、删除、修改文章或配置后，执行以下步骤：

### 1. 重新构建

```bash
cd E:\Workspace\Project\CRTBlog

# 使用 node 直接运行 npm 构建命令
node "C:\Users\Win11\AppData\Local\Programs\kimi-desktop\resources\resources\runtime\node_modules\npm\bin\npm-cli.js" run build
```

> 构建完成后，静态文件会生成在 `out/` 目录中。

### 2. 提交到 GitHub

```bash
cd E:\Workspace\Project\CRTBlog
git add .
git commit -m "add: 新文章标题"       # 或 "update: 修改配置" 等
git push origin main
```

### 3. Vercel 自动部署

如果你已经在 Vercel 上关联了 GitHub 仓库，推送后 Vercel 会自动重新部署，大约 1-2 分钟后生效。

### 4. 本地预览（可选）

```bash
cd E:\Workspace\Project\CRTBlog
node serve.js
```

然后打开浏览器访问：`http://localhost:8889`

> 修改后预览需要重新构建（步骤 1）+ 重启服务器。

---

## 🎨 自定义配色

如果你想调整博客的整体配色，编辑 `tailwind.config.ts` 中的 `colors` 部分：

```ts
colors: {
  cream: "#FDFBF9",           // 页面背景
  "deep-blue": "#1B3A5C",      // 标题、重要文字
  "soft-coral": "#E8957C",     // 链接、悬停
  "muted-coral": "#F5C5B5",    // 标签背景、悬停背景
  "sage-green": "#7BAE7F",     // 辅助图标
  "text-primary": "#2D3748",   // 正文
  "text-secondary": "#718096", // 次要文字（日期、摘要）
  "text-muted": "#A0AEC0",     // 更淡的文字
  "border-light": "#E8DDD8",   // 边框、分隔线
  "card-bg": "#FFFFFF",        // 卡片背景
}
```

---

## ❓ 常见问题

### Q: 添加文章后首页没有显示？

确认：
1. 文件在 `posts/` 目录下
2. 文件后缀是 `.mdx` 或 `.md`
3. Frontmatter 中的 `title` 和 `date` 字段正确
4. 已经重新构建（`npm run build`）

### Q: 文章分类不显示？

确认 `category` 字段存在且不为空。分类名可以自定义，不需要预先注册。

### Q: 部署到 Vercel 后样式不对？

确认：
1. `next.config.js` 中设置了 `output: 'export'`
2. `next.config.js` 中设置了 `images.unoptimized: true`
3. Vercel 的 Framework Preset 选择 `Next.js`

### Q: 如何添加图片到文章中？

1. 将图片文件放入 `public/images/` 目录
2. 在 Markdown 中引用：`![描述](/images/图片名.png)`

### Q: 如何修改代码块高亮配色？

编辑 `app/globals.css` 中 `pre` 和 `pre code` 的样式：

```css
pre {
  background: #1B3A5C !important;  /* 代码块背景 */
}

pre code {
  color: #e2e8f0 !important;       /* 代码文字颜色 */
}
```

---

## 🔗 相关链接

- **GitHub 仓库**：`https://github.com/loveyouer/Blog`
- **Vercel 部署**：登录 [vercel.com](https://vercel.com) 后导入 GitHub 仓库
- **Next.js 文档**：[nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS 文档**：[tailwindcss.com](https://tailwindcss.com)
- **Markdown 语法**：[markdownguide.org](https://www.markdownguide.org)

---

## 📄 许可证

本项目为个人博客，代码可自由修改使用。

---

*安静记录，慢慢生活。*
