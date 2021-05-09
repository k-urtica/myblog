---
slug: /gridsome-markdown-file
title: Gridsomeでマークダウンファイルを扱う
date: 2020-03-20T16:07:09
updatedAt: ""
cover: cover.jpg
coverCaption: ""
summary: Vue製静的サイトジェネレータGridsomeでマークダウンファイルをJavaScriptで扱う方法。
category: プログラミング
tags: [Gridsome, マークダウン]
---

本ブログでもブログ記事データとして使用しているマークダウンファイルをGridsomeで扱う方法について書きます。

## Gridsomeでマークダウンを扱う

Gridsomeもそうですが、JavaScriptでマークダウンファイルをそのまま扱うことはできません。

VueやNuxtでマークダウンファイルを扱う場合はマークダウンをHTMLへ変換する[markdown-it](https://github.com/markdown-it/markdown-it)や[marked](https://github.com/markedjs/marked)などのマークダウンパーサーを使いますが、Gridsomeの場合はマークダウンファイルをGraphQLのコンテンツとして取得できるように変換する以下のライブラリのうちどちらかを使用します。

- source-filesystem
- vue-remark

### @gridsome/source-filesystemを使う

ひとつめの方法として`source-filesystem`ライブラリを使う方法があります。こちらはGridsomeのプラグインとして提供されています。

詳しい使い方は[公式ドキュメント](https://gridsome.org/plugins/@gridsome/source-filesystem)に説明がありますが、簡単にセットアップについて紹介したいと思います。
（※マークダウンファイルを使用したブログという前提で説明します）

#### インストール＆セットアップ

```bash
yarn add @gridsome/source-filesystem
```

gridsome.config.jsにプラグインの設定を追記します。

```js:title=gridsome.config.js
module.exports = {
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "./blog/**/*.md",
      }
    },
  ],
  templates: {
    Post: "/post/:year-:month-:day/:slug",
  }
};
```

optionsの`typeName`はGraphQLタイプになります。GraphQLのコレクションのノードの単一ページを生成するために`src/template`配下の`.vue`ファイル名と一致させる必要があります。

後述しますが、template配下のPost.vueはブログの個別記事ページを表示する用途になります。

`path`はマークダウンファイルの格納パスを指定します。

マークダウンファイルはプロジェクトルートに`/blog`フォルダを作り、その下にファイルを格納していきます。configの`path`で再帰的にマークダウンファイルを走査するよう指定しているため、/blog配下であれば好きにサブフォルダを作ることができます（例えば年ごとの記事フォルダ等）

マークダウンファイルは以下のような感じで、ブログ記事のパスやタイトルなどのメタ情報を書く`Front-matter`部と実際の記事本文を表すマークダウン部分に分かれています。

```md
---
slug: /sample-blog-post
title: テスト記事タイトル
date: 2020-03-14T21:21:19
summary: テストサマリー
tags: [タグ1, タグ2]
---

## はじめに

サンプル記事本文・・・
```

メタ情報は自由に項目を追加できます。ここで設定したメタ情報はGraphQLの記事取得用クエリのフィールドで利用できるようになります。

#### Vueファイルから利用する

例えば`/template/Post.vue`でブログ記事の個別記事データを取得するには以下のようなGraphQLを書きます。

```markup:title=/template/Post.vue
<template>
  <Layout>
    <div v-html="$page.post.content" />
  </Layout>
</template>

<page-query>
  query Post($id: ID!) {
    post(id: $id) {
      title
      path
      summary
      date: date(format: "YYYY-MM-DD")
      tags {
        title
        path
      }
      content
    }
  }
</page-query>

```

`content`にHTMLに変換されたマークダウン本文がセットされているので、Vueの`v-html`でマークダウン本文を表示することができます。そのほか、マークダウンファイルで定義したメタ情報も取得できるので`$page.post.title`などでVueのテンプレート部で自由に使うことができます。

### @gridsome/vue-remarkを使う

マークダウンファイルを扱うもうひとつの方法として[@gridsome/vue-remark](https://gridsome.org/plugins/@gridsome/vue-remark)を使う方法があります。こちらもGridsomeのプラグインとして提供されています。

vue-remark自体も内部的には`source-filesystem`が使われているので、マークダウンファイルをGraphQLコンテンツに変換するという点は同じです。

vue-remarkの場合は上記に加えて、マークダウンファイルの中でVueのコンポーネントが使えるようになります。例えば、youtubeなどの埋め込みコンテンツ用のコンポーネントを作っておき、それをマークダウンファイル中で使えるようになります。

マークダウンのみだと複雑なレイアウトを作るのは難しいので、VueのSFCと組み合わせればそれも容易になるということです。

ただし、注意点もあります。マークダウンファイルの中でVueのコンポーネントを使うことで、マークダウンファイルが汎用的なものではなくなってしまいます。
どこででも使えるマークダウンファイルがvue-remark／vue.jsという特定の技術に依存したものになってしまいます。これは、例えばGatsbyへ移行しようと思った時にVueの技術が使われているマークダウンファイルだと移行を困難なものにしてしまいます。

vue-remarkのセットアップや詳しい使い方は[公式ドキュメント](https://gridsome.org/plugins/@gridsome/vue-remark)に詳しい説明があるのでそちらを参照ください。

## おわりに

Gridsomeでマークダウンファイルを扱う方法について書きました。

Gridsomeのスタータープロジェクトを見ると現状はほとんどsource-filesystemを使用したものとなっています。マークダウンファイルの変換自体はどちらも同じなので、マークダウンファイル中でVueコンポーネントを使いたい場合はvue-remark、使わない場合はsource-filesystemを使うのが良いかと思います。
