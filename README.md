[![Hosted on Cloudflare Workers](https://img.shields.io/badge/Hosted%20on-CF%20Workers-f38020?logo=cloudflare&logoColor=f38020&labelColor=282d33)](https://drive.tcxz.cc/)

<h1>onedrive-cf-index(for 21vianet Users)</h1>

> Hint: This demostration is mainland-orited, so the default language：`中文`

Fork 自 [onedrive-cf-index，请 ⭐star 原项目)](https://github.com/spencerwooo/onedrive-cf-index)

**源库已支持世纪互联，所以把此文档留作一个简陋的中文指示，希望能帮助到有需要的朋友**

## 演示地址

[🍺 Beet's OneDrive Index](https://drive.tcxz.cc/).

---

<<<<<<< HEAD
## 部署指南
=======
- **New design:** [`spencer.css`](themes/spencer.css).
- File icon rendered according to file type. Emoji as folder icon when available (if the first character of the folder name is an emoji).
- Use [Font Awesome icons](https://fontawesome.com/) instead of material design icons (For better design consistency).
- Use [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) for `README.md` rendering → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/README/).
- **Add breadcrumbs for better directory navigation.**
- **Support file previewing:**
  - Images: `.png`, `.jpg`, `.gif` → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/Previews/).
  - Plain text: `.txt` → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/Previews/iso_8859-1.txt).
  - Markdown: `.md`, `.mdown`, `.markdown` → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/Previews/i_m_a_md.md).
  - Code: `.js`, `.py`, `.c`, `.json`... → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/Code/pathUtil.js).
  - **PDF: Lazy loading, loading progress and built-in PDF viewer** → [Demo](<https://storage.spencerwoo.com/%F0%9F%A5%91%20Course%20PPT%20for%20CS%20(BIT)/2018%20-%20%E5%A4%A7%E4%BA%8C%E4%B8%8B%20-%20%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6/1%20FoundationofCG-Anonymous.pdf>).
  - **Music / Audio:** `.mp3`, `.aac`, `.wav`, `.oga` → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/Multimedia/Elysian%20Fields%20-%20Climbing%20My%20Dark%20Hair.mp3).
  - **Videos:** `.mp4`, `.flv`, `.webm`, `.m3u8` → [Demo](https://storage.spencerwoo.com/%F0%9F%A5%9F%20Some%20test%20files/Multimedia/%E8%BD%A6%E5%BA%93%E5%A5%B3%E7%8E%8B%20%E9%AB%98%E8%B7%9F%E8%B9%A6%E8%BF%AA%20%E4%B9%98%E9%A3%8E%E7%A0%B4%E6%B5%AA%E7%9A%84%E5%A7%90%E5%A7%90%E4%B8%BB%E9%A2%98%E6%9B%B2%E3%80%90%E9%86%8B%E9%86%8B%E3%80%91.mp4).
  - ...
- Code syntax highlight in GitHub style. (With PrismJS.)
- Image preview supports [Medium style zoom effect](https://github.com/francoischalifour/medium-zoom).
- Token cached and refreshed with Google Firebase Realtime Database. (~~For those who can't afford Cloudflare Workers KV storage.~~ 😢)
- Route lazy loading with the help of [Turbolinks®](https://github.com/turbolinks/turbolinks). (Somewhat buggy when going from `folder` to `file preview`, but not user-experience degrading.)
- Supports OneDrive 21Vianet.（由世纪互联运营的 OneDrive。）
- ...
>>>>>>> 6954d918f86b699f02e92fdc8c6ae4dd2c99fb20

### 准备：

#### 获得 OneDrive API 令牌

> 需自行保存的 key:
>
> - redirect_url
> - client_id
> - client_secret
> - refresh_token

1. `Azure.cn` [应用注册](https://portal.azure.cn/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) :

   - `任何组织目录(任何 Azure AD 目录 - 多租户)中的帐户`
   - `重定向 url` 键入并保存 `http://localhost/od-cf`

2. 保存 `client_id` ，添加并保存 `client_secret`

3. API 权限（Microsoft Graph）添加 `offline_access, Files.Read, Files.Read.All` `API permissions` 三个权限。

4. **使用 POSTMAN 获得 `refresh_token`**
   > 源库提供的 `https://heymind.github.io/tools/microsoft-graph-api-auth-cn` （世纪互联）尝试失败, 所以人工获取：

- 浏览器访问如下地址，需自行替换 `[client_id]`

  ```text
  https://login.chinacloudapi.cn/common/oauth2/v2.0/authorize?client_id=[client_id]&response_type=code&redirect_uri=http://localhost/od-cf&response_mode=query&scope=offline_access%20Files.Read%20Files.ReadWrite.All
  ```

  登陆后复制地址栏 `code=` 后字符串作为 `authorize_code`, 即为下面 json 里的 `code`

* 发送 POST 获得 `refresh_token`
  ，发送 post 请求，可以使用 postman 或 curl
  ，按照如下 `key：value` 在 POSTMAN 里填入(请自行填入`client_id` 、 `code` 、`client_secret`)

  ```bash
  {
    "client_id": "",
    "code": "",
    "redirect_uri": "http://localhost/od-cf",
    "grant_type": "authorization_code",
    "client_secret": ""
  }
  ```

  会成功返回 `refresh_token`, 参考下图，保存备用。

  ![](https://i.imgur.com/yhSl4gc.png)


    如出现问题，请参考 [azure doc](https://docs.azure.cn/zh-cn/active-directory/develop/v2-oauth2-auth-code-flow)

#### 获取 firebase 令牌(使用 firebase 做 assess-token 持久化)

> 需自行保存的 key：
>
> - `firebase_url`
> - `firebase_token`

1. 注册 [Google Firebase](https://firebase.google.com/). 创建项目。
2. 左侧进入 `Database`, 创建
   Realtime 数据库，以锁定模式开始 » 启用 » 修改 null 值为 `auth` » 得到 `firebase_url` (url 示例： `https://xxx.firebaseio.com/auth.json`)

### 构建应用

clone （fork） 本项目，安装依赖：

```sh
# 安装Wrangler实现项目打包，附加从命令行部署到 cf worker（后项可选）
npm i -g @cloudflare/wrangler

# 安装依赖
npm i
```

使用 wrangler 前的准备:

1. 进入 https://dash.cloudflare.com/profile/api-tokens » 创建 cloudflare api 令牌（使用 Edit Cloudflare Workers 模板） » 登陆（示例如下）

   ```sh
   # 登陆 cloudflare
   wrangler config

   # 验证登录状态
   wrangler whoami
   ```

2. 创建 worker ，获取 Account ID
   在 cloudflare 创建新 worker，并在 worker 的 overview 页面右侧获取到 `Account ID`

   > 如果需要使用 cloudflare 里的域名绑定 worker，需要额外获取 `zone ID`, [参考文档](https://developers.cloudflare.com/workers/quickstart#account-id-and-zone-id)

3. 修改两个配置文件的几个选项

   - `wrangler.toml`

   ```toml

     # 刚刚创建的 worker 名
     name = "beet"

     # 获取的 Account ID
     account_id = ""

     # 如果使用了域名，需要添加 zone_id
     # zone_id = ""
   ```

   - `src/config/default.js`


    ```javascript
      client_id: '',

      // 网盘索引目录
      base = "",

      firebase_url = '',
    ```

### 使用 wrangler 正式构建应用：

```sh
# 上传 refresh_token, client_secret, firebase_token 到 cloudflare 并加密

wrangler secret put REFRESH_TOKEN
# ... enter your refresh_token

wrangler secret put CLIENT_SECRET
# ... enter your client_secret

wrangler secret put FIREBASE_TOKEN
# ... enter your firebase_token
```

全部上传成功后，可以预览和发布：

```sh
wrangler preview

wrangler publish
```

> 如出现网络问题无法上传，可手动复制 `worker/worker.js` 到 cf worker

### 自定义

<<<<<<< HEAD
`themes/spencer.css` -> CSS
=======
- You can **(AND SHOULD)** change the `intro` on the default landing page here: [src/folderView.js](src/folderView.js#L51-L55). Write HTML directly.
- You can **(AND ALSO SHOULD)** change the header of the site here: [src/render/htmlWrapper.js](src/render/htmlWrapper.js#L24).
- Your custom styles are loaded from [themes/spencer.css](themes/spencer.css), change that according to your customizations. You may also need to change the commit HASH at [src/render/htmlWrapper.js](src/render/htmlWrapper.js#L3).
- You can also customize Markdown CSS styles, PrismJS code highlight color schemes, etc.
>>>>>>> 6954d918f86b699f02e92fdc8c6ae4dd2c99fb20

`src/render/htmlWrapper.js` -> HEAD FOOTER

`themes/prism-github.css` -> prism theme

`src/folderView.js` -> home intro

`src/config/default.js` -> toggle pagination feature

> ~~后期考虑使用 config 文件自定义~~
> 修改简单的 `src/render/userProfile` 可自定义如下四项设置

- title
- navTitle
- introContent
- footerContent
