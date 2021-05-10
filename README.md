# Gatsby 和 mdx 来文档类网站

参考：[How to Build a Developer Blog with Gatsby and MDX](https://www.sitepoint.com/gatsby-mdx-blog/)

- 为什么选择 Gatsby?

是静态网站生成器，延伸自主流的 React 框架。与 Markdownn 文件系统结合，创建静态的播客站点。

- Markdown 和 MDX 格式

[MDX](https://mdxjs.com/) （Marddown JSX）可以让你在 Markdown 文档中编写 JSX 格式，例如：

```markdown
import { RainbowText } from './components/rainbow';
## A Markdown Heading
<RainbowText>Wheeeeeeee</RainbowText>
```

Gatsby 是目前看来，与 Markdown 和 MDX 结合的最好的框架。

- 你需要

对于网站开发有一些基础了解：Node, terminal  
一个文旦编辑器：Visual Studio Code  
一些对于React的基础知识  

我更偏向使用 VS Code 作为编辑器，Yarn 作为 node 包管理工具。


## Hello, World!

启动一个 Gatsby 项目

```bash
# create the project directory
mkdir my-gatsby-blog
# change into the directory
cd my-gatsby-blog
# initialise a package.json file
yarn init -y
# initialise the git repo
git init
```

添加 `.gitignore` 文件来忽略不需要追踪的文件树，可以参考[create-react-app-gitignore](https://github.com/facebook/create-react-app/blob/master/.gitignore)：

```bash
# create .gitignore file in my directory
touch .gitignore
# add ignore contents with echo
echo "# Project dependencies
.cache
node_modules

# Build directory
public

# Other
.DS_Store
yarn-error.log" > .gitignore
```

现在，我们安装一些依赖项来启动Gatsby并使其运行：

```bash
yarn add gatsby react react-dom
# -p is to create parent directories too if needed
mkdir -p src/pages
# create the index (home) page
touch src/pages/index.js
```

接下来，我们将为项目添加第一个React组件。 我将以下内容添加到我创建的index.js文件中：

```JSX
// src/pages/index.js
import React from "react";

export default function IndexPage() {
  return <h1>Hello, World!</h1>;
}
```

现在，我准备从命令行运行Gatsby开发命令：

```bash
# if you're using npm 👇
# $(npm bin)/gatsby develop
yarn gatsby develop
```

将启动Gatsby开发服务器，项目可在端口8000（默认的Gatsby端口）中查看。 URL是 http://localhost:8000/

虽然可以直接从命令行界面（CLI）使用 Gatsby 二进制命令，但是大多数人会将可用命令添加到 package.json 文件的 scripts 部分，如下所示：

```json
// package.json
"scripts": {
  "build": "gatsby build",
  "dev": "gatsby develop",
  "serve": "gatsby serve",
  "clean": "gatsby clean"
},
```

你也可以在此添加一些其他脚本。

如果我们不想每次都在同一端口上运行该项目，则可以使用 `-p` 标志以及在其后指定的端口进行更改。 例如，`gatsby develop -p 8945`。

如果我们想在项目准备好后打开浏览器选项卡，则可以在脚本中添加 `-o`。

对于 `serve` 脚本，可以同样做：

```json
// package.json
"scripts": {
  "build": "gatsby build",
  "dev": "gatsby develop -p 8945 -o",
  "serve": "gatsby serve -p 9854 -o",
  "clean": "gatsby clean"
},
```

"Hello, World!" 部分已经完成，接下来是更多部分。

但我们先把改动提交：

```bash
# add everything for committing
git add .
# commit to repo
git commit -m 'init project'
```


## 博客的内容

添加3篇博客内容：

```bash
# this creates the folders in the root of the project
mkdir -p content/2021/03/{06/hello-world,07/second-post,08/third-post}
# create individual files
touch content/2021/03/06/hello-world/index.mdx
touch content/2021/03/07/second-post/index.mdx
touch content/2021/03/08/third-post/index.mdx
```

我将会在以下使用这些文件。

你可以注意到我使用了 `.mdx` 的文件格式。


## 头部信息 Front matter

在我为播客添加内容之前，我想谈一谈头部信息。

头部文件是一种存储有关文件信息的方法，当 Gatsby 从文件中构建页面的时候，该信息可以被 Gatsby 使用。现在，我将添加博文的标题和日期。我还将在其中添加一些内容。这是我们的第一篇文章：

```markdown
---
title: Hello World - from mdx!
date: 2021-03-06
---

My first post!!

## h2 Heading

Some meaningful prose

### h3 Heading

Some other meaningful prose
```

这是我们的第二篇：

```markdown
---
title: Second Post!
date: 2021-03-07
---

This is my second post!
```

这是我们的第三篇：

```markdown
---
title: Third Post!
date: 2021-03-08
---

This is my third post!

> with a block quote!

And a code block:

`const wheeeeee = true;`
```

我们将修改提交：

```bash
# add changed file for committing
git add .
# commit to repo
git commit -m 'add markdown files'
```

## Gatsby 配置

Gatsby 配置文件(gatsby-config.js) 使用来定义和配置你可以使用的 Gatsby 插件工具。现在我将再次在终端创建文件：

```bash
touch gatsby-config.js
```

该命令在文件夹根目录创建了 `gatsby-config.js` 文件，以让我能够更早地启动 Gatsby 配置来读取 `.mdx` 文件。


## Gatsby 插件

现在我可以安装和配置Gatsby插件，用来读取和显示我创建的文件。

```bash
yarn add gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react gatsby-source-filesystem
```

快速查看 `package.json` 文件可以看到，以下依赖项目被安装了：

```json
  "dependencies": {
    "@mdx-js/mdx": "^1.6.22",
    "@mdx-js/react": "^1.6.22",
    "gatsby": "^3.4.0",
    "gatsby-plugin-mdx": "^2.4.0",
    "gatsby-source-filesystem": "^3.4.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
  }
```

需要注意的一件事是，在 Gatsby 中，有 React 17 版本就无需引入 React 在你的组件里。但是为了完整性和避免混乱，我将在下面的示例中包括它。

现在我将需要在 `gatsby-config.js` 中，配置 `gatsby-plugin-mdx` 和 `gatsby-plugin-mdx`，添加：

```js
module.exports = {
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
```

提交改动：

```bash
git add .
git commit -m 'add gatsby plugins'
```


## Gatsby GraphQL

现在是时候使用 Gatsby GraphQL 客户端来查看 Gatsby 中文件所在的位置。你可能已经注意到，如果继续运行项目，则 CLI 将会指示两个 URL 来查看项目：

```
You can now view my-gatsby-blog in the browser.
⠀
  http://localhost:8000/
⠀
View GraphiQL, an in-browser IDE, to explore your site's data and schema
⠀
  http://localhost:8000/___graphql
```

我将使用 graphql 这个路由来查看文件系统中的文件。

当我打开 GraphiQL explorer，将看到几个 **Explorer** 面板。这是所有项目中可供探索的可用数据，且这些取决于我在 gatsby-config.js 文件中的配置。

GraphiQL query 面板和结果就在页面上。这里，我将编写 GraphQL 来查询和检索所需的数据。查询面板底部还有一个 `QUERY VARIABLES` 模块，我等等会提到。

最右边是 `GraphQL Documentation Explorer`。由于 GraphQL 的严格键入，意味着它能够根据数据生成自己的文档。但是这个不在本文讨论范围。


## 用 GraphQL 查询本地文件

接下来，我将查询我先前在 GraphiQL 面板中添加的文件。我将查询头部文件中定义的标题和日期：

```json
{
  allMdx {
    nodes {
      frontmatter {
        title
        date
      }
    }
  }
}
```

如果我们按「播放」按钮，我们将在右侧获得数据：

```JSON
{
  "data": {
    "allMdx": {
      "nodes": [
        {
          "frontmatter": {
            "title": "Hello World - from mdx!",
            "date": "2021-03-06T00:00:00.000Z"
          }
        },
        {
          "frontmatter": {
            "title": "Second Post!",
            "date": "2021-03-07T00:00:00.000Z"
          }
        },
        {
          "frontmatter": {
            "title": "Third Post!",
            "date": "2021-03-08T00:00:00.000Z"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

这是 JSON 对象，其中包含我们在查询中请求的相关信息。这意味着我们可以在 Gatsby 项目中使用这些数据来制作页面。


## 站点元数据

在 gatsby-config.js 文件中，还有一个用于指定网站元数据的选项。网站元数据适用于想重用的常见数据（例如，网站标题和说明）。

这些对于以后添加 meta 标签进行 SEO 优化的时候，比较有用。现在，我将使用 `siteMetadata` 对象定义一些站点的基本信息。

我可以直接在 `module.exports` 中定义站点元数据，如下所示：

```javascript
module.exports = {
  siteMetadata: {
    title: `My Gatsby Blog`,
    description: `This is my coding blog.`,
  },
  plugins: [
    // configured plugins here
    {
      // empty for brevity
    },
  ],
};
```

网站元数据可能会比较大，而且放在它自己的对象中会更清晰一些，因此，单独定义它：

```javascript
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
};
```

然后把 `siteMetadata` 对象，添加到 module.exports 中：

```javascript
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
};

module.exports = {
  siteMetadata,
  plugins: [
    // configured plugins here
    {
      // empty for brevity
    },
  ],
};
```

现在，可以再次跳到 GraphiQL explorer，并使用以下方式查询元数据：

```javascript
{
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

如果修改 `gatsby-config.js` 文件，最好重启开发服务，用 `Ctrl+c` 然后 `yarn develop`，然后再 GraphiQL explorer 刷新页面，然后再次运行以上命令，就可以得到数据：

```javascript
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "My Gatsby Blog",
        "description": "This is my coding blog."
      }
    }
  },
  "extensions": {}
}
```

## 制作站点元数据 Hook

现在我们在 Gatsby 文件系统中有站点的元数据了，可以用 Gatsby 的 `useStaticQuery` Hook 来查询它。添加完以下的内容至 `src/pages/index.js` 文件中，然后重启服务：

```javascript
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export default function IndexPage() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  console.log("=====================");
  console.log(siteMetadata);
  console.log("=====================");
  return <h1>Hello World!</h1>;
}
```

`const { site: { siteMetadata }, }` 是一种快速得到 `site` 中 `siteMetadata` 数据的方式。

完成重启服务后，可以用 `Control+Shift+J` Windows/Linux 系统，或者 `Command+Option+J` 来查看 `siteMetadata` 在 console 中的输出。

可以看到：

```
=====================
{title: "My Gatsby Blog", description: "This is my coding blog."}
  description: "This is my coding blog."
  title: "My Gatsby Blog"
  __proto__: Object
=====================
```

不用担心 console 的关于 404 页面缺失的警告 (`net::ERR_ABORTED 404 (Not Found)`) ，稍等我们将制作它。

为了避免每次都要编写这个查询，我想在组件中使用它。我将把它抽象至自定义的 Hook 中。

```bash
# make a folder for all the hooks to live
mkdir src/hooks
# creathe the file
touch src/hooks/use-site-metadata.js
```

添加以下内容至 `src/hooks/use-site-metadata.js` 来获取站点元数据：

```javascript
import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
```

你可以注意到这个查询和前面的 GraphiQL explorer 中的有点不一样：

```bash
+ query SITE_METADATA_QUERY {
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

这是为这个查询命名。因为我将在项目中使用多个查询，所以给它们有意义的名称是重要的。

现在我将新定义的钩子（hook）使用在 `src/pages/index.js` 文件中：

```javascript
import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export default function IndexPage() {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}
```

这样不需要那么冗长的定义，就可以在 `SITE_METADATA_QUERY` 选择想要的项目。

提交代码：

```bash
git add .
git commit -m 'add site metadata and metadata hook'
```

## 使用 Theme UI 的样式

我将使用 Theme UI 来对这个项目进行样式的设置，因为它可以更快地实现布局和深色模式等功能。我将尽量详细说明正在做的事情以及这样做的原因，尽管这不是如何使用 Theme UI 的指南。

为 Theme UI 添加一些依赖，它们是：

```bash
yarn add theme-ui gatsby-plugin-theme-ui @theme-ui/presets
```

安装完毕后，需要添加 `gatsby-plugin-theme-ui` 到 `gatsby-config.js` 插件列表中：

```javascript
module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      // rest of the module unchanged
    }
  ]
}
```

现在我们重启开发服务，将看到稍有不同的站点！确切地说，变得稍蓝了一些。这是 `gatsby-plugin-theme-ui` 这个插件在起作用，并用了默认的颜色。

Gatsby 的 Theme UI 插件提供了许多配置选项。现在，将创建一个文件夹，并定义一个供 Theme UI 使用的主题对象：

```bash
# create the folder for the Theme UI theme
mkdir src/gatsby-plugin-theme-ui
# create the theme file
touch src/gatsby-plugin-theme-ui/index.js
```

在 `src/gatsby-plugin-theme-ui/index.js` 文件中，我将添加一些 Theme UI 的预设，定义主题对象，并使用 `swiss` 预设，来定义主题 `colors` 和 `styles`。

对于深色模式，我使用 `deep` 深色主题预设，并扩展到 `dark` 模式的 `modes` 对象中：

```javascript
import { deep, swiss } from "@theme-ui/presets";

const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        ...deep.colors,
      },
    },
  },

  styles: {
    ...swiss.styles,
    p: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 3,
    },
  },
};

export default theme;
```

现在，如果我们重启服务，将看到 Swiss 主题被应用到站点。若是不行尝试刷新页面。

提交更改：

```bash
git add .
git commit -m 'add Theme UI and configure presets'
```

是时候添加一些 React 组件了。


## 布局组件

Gatsby 没有特定的布局，需要依靠开发者。下面，我将为这个网站进行布局，可以在 Gatsby 中使用多种布局，在本例中，我将使用一种布局。

现在，我将重构当前的内容，以让所有的内容都被 `Layout` 组件包裹。在 `src/pages/index.js` 中的内容可以用 `Header` 组件，所以我下面将创建一些文件给 `Layout` 和 `Header`：

```bash
# create a components folder
mkdir src/components
# create Layout and Header files
touch src/components/header.js src/components/layout.js
```

现在把标题和描述部分移从 `src/pages/index.js` 中移动至 `src/components/header.js` 新创建的组件中。

我不会在 `Header` 组件中使用 `useSiteMetadata`，而是将 `useSiteMetadata` 作为参数传递给 `Layout` 组件的头部。首先，这是 header 组件，位于 `src/components/header.js` 中：

```javascript
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import { Box, Heading, Link } from "theme-ui";

export const Header = ({ siteTitle, siteDescription }) => {
  return (
    <Box as="header" sx={{ bg: "highlight", mb: "1.45rem" }}>
      <Box
        as="div"
        sx={{
          m: "0 auto",
          maxWidth: "640px",
          p: "1.45rem 1.0875rem",
        }}
      >
        <Link as={GatsbyLink} to="/">
          <Heading>{siteTitle}</Heading>
        </Link>
        <Box as="p" variant="styles.p">
          {siteDescription}
        </Box>
      </Box>
    </Box>
  );
};
```

我已经使用 Theme UI 的一些布局样式。这让站点看起来有一些不同… `Box`，`Link`，`Heading` 等等，这些都是什么？这些其实都是 Theme UI组件，可用于布局，表单等元素。

你也许注意到了 `as={GatsbyLink}` 被添加到了 `Link` 组件。这在 Theme UI 中使用了 `as` 特性，并允许传入的组件采用 Theme UI 的样式。

Paul Scanlon 的文章 [explaining in more details](https://paulie.dev/posts/2020/04/gatsby-or-theme-ui-link/) 说明了这是如何完成的。还有 [Understanding Theme UI](https://paulie.dev/posts/2021/03/understanding-theme-ui/) 来了解更多。

还有 `sx` 和 `variant` 这两个特性来自 Theme UI。 `sx` 使其他样式可以传递给组件。可以把它理解为 JSX 的 `style={{}}` 特性。 `variant` 特性允许将一组预定义样式从主题应用到所使用的组件。

现在， `Layout` 组件，位于 `src/components/layout.js`：

```javascript
import React from "react";
import { Box } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { Header } from "./header";

export const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Header siteTitle={title} siteDescription={description} />
      <Box
        as="div"
        sx={{
          margin: "0 auto",
          maxWidth: "640px",
          padding: "0 1.0875rem 1.45rem",
        }}
      >
        <Box as="main">{children}</Box>
      </Box>
    </>
  );
};
```

这儿我用 `useSiteMetadata` 勾子然后传递 `Header` 需要的参数，同样的， `sx` 特性用来添加一些基础样式。然后我创建了 `main` 来包裹 `children`。

`children` 参数返回 `Layout` 组件所包含的，也就是我想要布局生效的区域。例如：

```
<Layout>
  <h1>This is wrapped</h1>
</Layout>
```

这将返回 `Layout` 所包含的，也就是上面的 `h1`。

我将返回 index 页面（`src/pages.index.js`），添加：

```javascript
import React from "react";
import { Layout } from "../components/layout";

export default function IndexPage() {
  return (
    <>
      <Layout>
        <h1>This is wrapped</h1>
      </Layout>
    </>
  );
}
```

结果是，header 部分应用了布局，且 `This is wrapped` 显示在页面上。


## 首页的播客列表

现在是时候获取我在开头创建的帖子，并将其作为可点击链接的列表显示在索引页面上。

为了获得文章信息，我将重构从 GraphQL 查询本地文件。

```javascript
{
  allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
    nodes {
      id
      slug
      excerpt(pruneLength: 250)
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
      }
    }
  }
}
```

我添加了 `id` 和 `slug` 在 nodes 中。这是 `.mdx` 的文件路径。

`excerpt` 是 Gatsby 函数，用来从文章中获取前 250 个字符，然后也添加了一些格式 `date` 的内建 Gatsby 函数。

我添加了根据日期的降序排序 `allMdx(sort: { fields: [frontmatter___date], order: DESC })` 用来对文章进行排序。

粘贴至 GraphiQL explorer 中得到结果：

```
{
  "data": {
    "allMdx": {
      "nodes": [
        {
          "id": "2bed526a-e5a9-5a00-b9c0-0e33beafdbcf",
          "slug": "2021/03/08/third-post/",
          "excerpt": "This is my third post! with a block quote! And a code block:",
          "frontmatter": {
            "title": "Third Post!",
            "date": "2021 March 8th"
          }
        },
        {
          "id": "89ea266b-c981-5d6e-87ef-aa529e98946e",
          "slug": "2021/03/07/second-post/",
          "excerpt": "This is my second post!",
          "frontmatter": {
            "title": "Second Post!",
            "date": "2021 March 7th"
          }
        },
        {
          "id": "75391ba1-3d6b-539f-86d2-d0e6b4104806",
          "slug": "2021/03/06/hello-world/",
          "excerpt": "My first post!! h2 Heading Some meaningful prose h3 Heading Some other meaningful prose",
          "frontmatter": {
            "title": "Hello World - from mdx!",
            "date": "2021 March 6th"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

现在我可以在 `src/pages/index.js` 中拿到数据。在 `IndexPage` 函数中，我重构了从 GraphQL 查询到的数据：

```javascript
import { graphql, Link as GatsbyLink } from "gatsby";
import React from "react";
import { Box, Heading, Link } from "theme-ui";
import { Layout } from "../components/layout";

export default function IndexPage({ data }) {
  return (
    <>
      <Layout>
        {data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
          <Box
            key={id}
            as="article"
            sx={{
              mb: 4,
              p: 3,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              border: "1px solid #d1d1d1",
              borderRadius: "15px",
            }}
          >
            <Link as={GatsbyLink} to={`/${slug}`}>
              <Heading>{frontmatter.title}</Heading>
              <Box as="p" variant="styles.p">
                {frontmatter.date}
              </Box>
              <Box as="p" variant="styles.p">
                {excerpt}
              </Box>
            </Link>
          </Box>
        ))}
      </Layout>
    </>
  );
}

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
        }
        slug
      }
    }
  }
`;
```

`excerpt`, `frontmatter`, `slug` 解构至 `data.allMdx.nodes`：

```javascript
{data.allMdx.nodes.map(({ excerpt, frontmatter, slug }) => ())}
```

如果点击文章链接，将去到 404 页面，那时应为我们还没有制作 `.mdx` 的页面。接下来就是它。

提交：

```bash
git add .
git commit -m 'add Header and Layout components'
```

## 使用 Gatsby 的 MDX 文件路由 API

我将使用 [Gatsby 的文件路由 API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) 来得到文件的路径。

新建 api 路由文件。

```bash
# create the route api file
touch src/pages/{mdx.slug}.js
```

在文件中，我定义了 GraphQL 所需要的数据：

```javascript
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Box } from "theme-ui";

export default function PostPage({ data }) {
  const {
    body,
    frontmatter: { title },
  } = data.mdx;
  return (
    <>
      <Box as="h1" variant="styles.h1" fontSize="4xl">
        {title}
      </Box>
      <MDXRenderer>{body}</MDXRenderer>
    </>
  );
}

export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        date
        title
      }
    }
  }
`;
```

这一段是用来 GraphQL 查询：

```javascript
query POST_BY_SLUG($slug: String) {
  mdx(slug: { eq: $slug }) {
    id
    slug
    body
    frontmatter {
      date
      title
    }
  }
}
```

查询由 `slug` 和 `POST_BY_SLUG($slug: String` 开始，主要节点是 `mdx`，我用 `mdx.slug` 来命名 `{mdx.slug}.js`。

如果我复制查询至 GraphiQL explorer 中，将得到：

```
{
  "data": {
    "mdx": null
  },
  "extensions": {}
}
```

那是因为还没有定义 `$slug`，但是你看下面的查询面板，将看到可用的查询变量（Query Variables）。这儿需要添加 `slug` 变量，也就是：

```
{
  "slug": "2021/03/08/third-post/"
}
```

再次查询，得到：

```
{
  "data": {
    "mdx": {
      "id": "105a5c78-6a36-56e8-976c-d53d8e6ca623",
      "slug": "2021/01/08/third-post/",
      "body": "function _extends() ...", // compiled MDX here
      "frontmatter": {
        "date": "2021-03-08T00:00:00.000Z",
        "title": "Third Post!"
      }
    }
  },
  "extensions": {}
}
```

文件路由 API 把每一个单独文件的路径传递给了 `src/pages/{mdx.slug}.js` 然后返回查询数据到 `({ data })` 参数中，然后传给页面。

你可以注意到我重构了 `body` 在数据返回的时候，然后 `title` 是 `frontmatter` 中的，这两个层级：

```javascript
const {
  body,
  frontmatter: { title },
} = data.mdx;
```

另一种方式是：

```javascript
const body = data.mdx.body;
const title = data.mdx.frontmatter.title;
```

最后 `MDXRenderer` 来包裹 `body`。也就是 `.mdx` 出去头文件的部分。

```
<MDXRenderer>{body}</MDXRenderer>
```

提交更改：

```bash
git add .
git commit -m 'create file route API file'
```

## 根包裹概念

现在点击链接，将看到 `.mdx` 页面，但和 index 页面有一些不同。

那是因为我们没有使用同一布局。我们可以用 Gatsby browser API `wrapPageElement` 函数来包裹页面元素。

为了防止代码重复，我创建第三个文件，然后传递给 `gatsby-*` 文件。

创建文件：

```bash
# create gatsby-browser.js and gatsby-ssr.js and root-wrapper.js
touch gatsby-browser.js gatsby-ssr.js root-wrapper.js
```

根包裹文件用来放置 `wrapPageElement` 函数：

```javascript
// root-wrapper.js
import React from "react";
import { Layout } from "./src/components/layout";

export const rootWrapper = ({ element }) => {
  return <Layout>{element}</Layout>;
};
```

然后在 `gatsby-browser.js` 和 `gatsby-ssr.js` 中，添加：

```javascript
import { rootWrapper } from "./root-wrapper";

export const wrapPageElement = rootWrapper;
```

如果需要更改任何 `wrapPageElement` 内容，我可以操作 `root-wrapper.js` 文件就够了。

重启服务，可以看到生效了！

因为 Layout 组件在顶层被使用了，所以不需要在 index 中包含它。修改 `src/pages/index.js`：

```javascript
import { graphql, Link as GatsbyLink } from "gatsby";
import React from "react";
import { Box, Heading, Link } from "theme-ui";
- import { Layout } from "../components/layout";

export default function IndexPage({ data }) {
  return (
    <>
-      <Layout>
        {data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
          <Box
            key={id}
            as="article"
            sx={{
              mb: 4,
              p: 3,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              border: "1px solid #d1d1d1",
              borderRadius: "15px",
            }}
          >
            <Link as={GatsbyLink} to={`/${slug}`}>
              <Heading>{frontmatter.title}</Heading>
              <Box as="p" variant="styles.p">
                {frontmatter.date}
              </Box>
              <Box as="p" variant="styles.p">
                {excerpt}
              </Box>
            </Link>
          </Box>
        ))}
-      </Layout>
    </>
  );
};
// rest unchanged
```

提交代码：

```bash
git add .
git commit -m 'add root wrapper to Gatsby Browser and SSR'
```


## 404 页面

新建 404 页面

```bash
# create the 404.js page
touch src/pages/404.js
```

在 `src/pages/404.js` 中，添加如下信息：

```javascript
import React from "react";
import { Box, Heading } from "theme-ui";

export default function NotFound() {
  return (
    <>
      <Heading variant="styles.h1">
        Page not found!
        <span role="img" aria-label="crying face">
          😢
        </span>
      </Heading>
      <Box as="h2" variant="styles.h2">
        It looks like that page doesn't exist
      </Box>
    </>
  );
}
```

现在可以去看看 404 页面 `http://localhost:8000/404`。

但是注意使用 `gatsby develop` 命令开发的时候，Gatsby 使用的是默认 404 页面。

提交更改：

```bash
git add .
git commit -m 'add 404 page'
```

## 深色主题按钮

将使用 `useColorMode` 来切换浅色和深色主题。添加代码 `src/components/header.js`：

```javascript
import { Link as GatsbyLink } from "gatsby";
import React from "react";
+ import { Box, Button, Heading, Link, useColorMode } from "theme-ui";

export const Header = ({ siteTitle, siteDescription }) => {
+  const [colorMode, setColorMode] = useColorMode();
  return (
    <Box as="header" sx={{ bg: "highlight", mb: "1.45rem" }}>
      <Box
        as="div"
        sx={{
          m: "0 auto",
          maxWidth: "640px",
          p: "1.45rem 1.0875rem",
        }}
      >
        <Link as={GatsbyLink} to="/">
          <Heading>{siteTitle}</Heading>
        </Link>
        <Box as="p" variant="styles.p">
          {siteDescription}
        </Box>
+        <Button
+          onClick={(e) => {
+            setColorMode(colorMode === "default" ? "dark" : "default");
+          }}
+        >
+          {colorMode === "default" ? "Dark" : "Light"}
+        </Button>
      </Box>
    </Box>
  );
};
```

看起来不够好，用 Theme UI 的 `Flex` 来包裹：

```javascript
import { Link as GatsbyLink } from "gatsby";
import React from "react";
+import { Box, Button, Flex, Heading, Link, useColorMode } from "theme-ui";

export const Header = ({ siteTitle, siteDescription }) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Box as="header" sx={{ bg: "highlight", mb: "1.45rem" }}>
      <Box
        as="div"
        sx={{
          m: "0 auto",
          maxWidth: "640px",
          p: "1.45rem 1.0875rem",
        }}
      >
+        <Flex>
+          <Box sx={{ flex: "1 1 auto", flexDirection: "column" }}>
            <Link as={GatsbyLink} to="/">
              <Heading>{siteTitle}</Heading>
            </Link>
            <Box as="p" variant="styles.p">
              {siteDescription}
            </Box>
+          </Box>
          <Button
            onClick={(e) => {
              setColorMode(colorMode === "default" ? "dark" : "default");
            }}
          >
            {colorMode === "default" ? "Dark" : "Light"}
          </Button>
+        </Flex>
      </Box>
    </Box>
  );
};
```

添加修改：

```bash
git add .
git commit -m 'add theme toggle to header'
```

## 代码块

用 [Prism](https://theme-ui.com/packages/prism) 进行语法高亮，并创建 `src/gatsby-plugin-theme-ui/components.js` 文件：

安装 theme-ui 依赖模块

```bash
# install the package
yarn add @theme-ui/prism
# create Theme UI components file
touch src/gatsby-plugin-theme-ui/components.js
```

定义 `pre` 和 `code` 标签：

```javascript
import Prism from "@theme-ui/prism";

export default {
  pre: (props) => props.children,
  code: Prism,
};
```

定义 `scr/gatsby-plugin-theme-ui/index.js` 的 theme 模块

```javascript
// scr/gatsby-plugin-theme-ui/index.js

import { deep, swiss } from "@theme-ui/presets";
+ import nightOwl from "@theme-ui/prism/presets/night-owl.json";

const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        ...deep.colors,
      },
    },
  },

  styles: {
    ...swiss.styles,
+    code: {
+      ...nightOwl,
+    },
    // remainder of the file unchanged
  }
}
```

重启服务，提交更改：

```bash
git add .
git commit -m 'add Prism package and update theme object'
```

## 添加 MDX 文件的组件

Markdown JSX 允许导入 React 模块。为了演示，将添加 `RainbowText` 组件，需要安装 `@emotion/react` 中的 `keyframes`。安装如下：

```bash
# create component file
touch src/components/rainbow-text.js
# install @emotion/react
yarn add @emotion/react
```

在 `src/components/rainbow-text.js` 中，添加：

```javascript
import { keyframes } from "@emotion/react";
import React from "react";
import { Box } from "theme-ui";

export const RainbowText = ({ children }) => {
  const rainbow = keyframes({
    "0%": {
      backgroundPosition: "0 0",
    },
    "50%": {
      backgroundPosition: "400% 0",
    },
    "100%": {
      backgroundPosition: "0 0",
    },
  });

  return (
    <Box
      as="span"
      variant="styles.p"
      sx={{
        fontWeight: "heading",
        cursor: "pointer",
        textDecoration: "underline",
        ":hover": {
          background:
            "linear-gradient(90deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee) 0% 0% / 400%",
          animationDuration: "10s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationName: `${rainbow}`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      }}
    >
      {children}
    </Box>
  );
};
```

以上代码添加了鼠标聚焦的效果。

导入到 `.mdx` 文件中，添加至 `content/2021/03/third-post/index.mdx`：

```markdown
---
title: Third Post!
date: 2021-03-08
---

+ import { RainbowText } from "../../../../../src/components/rainbow-text";

This is my third post!

> with a block quote!

+ <RainbowText>Wheeeeeeee</RainbowText>

And a code block:

`const wheeeeee = true;`
```

重启服务，可以看到代码块的效果。

你可能讨厌 `../../../`。有办法拿掉它，使用跟包裹的概念 `MDXProvider`。

返回 `root-wrapper.js` 然后传递 `RainbowText` 给 `MDXProvider`：

```javascript
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Layout } from "./src/components/layout";
import { RainbowText } from "./src/components/rainbow-text";

const MDXComponents = {
  RainbowText,
};

export const rootWrapper = ({ element }) => {
  return (
    <Layout>
      <MDXProvider components={MDXComponents}>{element}</MDXProvider>
    </Layout>
  );
};
```

然后从 `content/2021/03/third-post/index.mdx` 中移除：

```markdown
---
title: Third Post!
date: 2021-03-08
---

- import { RainbowText } from "../../../../../src/components/rainbow-text";

This is my third post!

> with a block quote!

<RainbowText>Wheeeeeeee</RainbowText>

And a code block:

`const wheeeeee = true;`
```

这样之后的好处是，不用每次都进行导入，而是每个 `.mdx` 文件都可以使用它。

提交更改：

```bash
git add .
git commit -m 'add component for mdx'
```

## Markdown 图片

如果我想添加图片 `content/2021/03/06/hello-world` ，如下：

```markdown
---
title: Hello World - from mdx!
date: 2021-03-06
---

My first post!!

## h2 Heading

![mdx logo](./mdx-logo.png)

Some meaningful prose

### h3 Heading

Some other meaningful prose
```

`./mdx-logo.png` 是我添加在 `content/2021/03/06/hello-world` 目录下的图片。从站点点击去页面看到图片无法显示。我们需要添加 `gatsby-remark-images` 给 `gatsby-plugin-mdx` 来显示它：

```bash
yarn add gatsby-remark-images gatsby-plugin-sharp
```

配置 `gatsby-config.js`：

```javascript
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
};

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-theme-ui`,
+    `gatsby-plugin-sharp`,
+    {
+      resolve: `gatsby-plugin-mdx`,
+      options: {
+        gatsbyRemarkPlugins: [
+          {
+            resolve: `gatsby-remark-images`,
+            options: {
+              maxWidth: 640,
+            },
+          },
+        ],
+      },
+    },
+    {
+      resolve: `gatsby-source-filesystem`,
+      options: {
+        path: `${__dirname}/content/`,
+      },
+    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
```

额外的 `gatsby-source-filesystem` 对象用来让 Gatsby 知道图片在哪儿可以找到。

提交更改：

```bash
git add .
git commit -m 'add and configure images'
```
