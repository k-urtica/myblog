---
slug: /use-fontawesome-in-gridsome
title: GridsomeでFont Awesomeを使えるようにする
date: 2020-03-27T00:37:54
updatedAt: ""
cover: cover.png
coverCaption: ""
summary: Gridsomeを使ったサイトにWebアイコンフォント『Font Awesome』を導入して様々なアイコンを利用する方法について紹介します。
category: プログラミング
tags: [Gridsome, Font Awesome]
---

## Font Awesomeとは？

Font AwesomeはアイコンをWebアイコンフォントとして利用できるものです。無料で数多くのアイコンが利用できます。有料のProアイコンもあるのですが基本的には無料で事足りると思います。

> The web's most popular icon set and toolkit.（最も人気のあるアイコンセットとツールキット）
> 
> 出典：[https://fontawesome.com/](https://fontawesome.com/)

## GridsomeにFont Awesomeを導入する

GridsomeでFont Awesomeを使えるようにするためには以下のライブラリを使います。

[vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)

基本的にはGitHubのREADMEにインストール・セットアップの方法について書いてあるのですが、順に説明していきます。

### ライブラリインストール

まず、必須のライブラリをインストールします。`fontawesome-svg-core`はコアモジュールで`vue-fontawesome`はVueで使用するためのものです。

```bash
yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome
```

次にFont Awesomeアイコンセットをインストールします。Font Awesomeのアイコンセットにはいくつかの種類があり、それに対応してライブラリも分かれています。下の３つすべて入れる必要はなく、使用するアイコンのアイコンセットライブラリのみインストールすれば良いことになります。

```bash
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/free-brands-svg-icons
```

### セットアップ

Gridsomeの`main.js`でimportします。各アイコンセットから使用するアイコンをimportしてlibraryに追加します。

Vueのコンポーネントとして使えるようにするために`v-fa`としてコンポーネントを定義します。

```js:title=main.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faTags } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add( faFolder, faTags, faClock, faTwitter);

export default function(Vue, { appOptions, head }) {
  // font awesome icon
  Vue.component("v-fa", FontAwesomeIcon);
}
```

使用するアイコンだけでなく、アイコンセットのすべてのアイコンをインポートする場合は以下のようにします。ただし未使用のアイコンも含まれるためバンドルサイズが大きくなってしまうことに注意が必要です。

```js
// 全てのbrandsアイコンをインポート
import { fab } from "@fortawesome/free-brands-svg-icons"
library.add(fab)
```

### Vueファイルでアイコンを使用する

実際にVueファイルで使うには以下のようにコンポーネントを使用すればOKです。

```markup
<template>
  <div>
    <v-fa :icon="['fas', 'folder']" size="xs" />
    <v-fa :icon="['far', 'clock']" size="lg" />
    <v-fa :icon="['fab', 'twitter']" size="6x" />
  </div>
</template>
```

オプションとしてサイズを変更したり、不透明度などを指定したりできます。詳細は[README](https://github.com/FortAwesome/vue-fontawesome#basic)を参照。

## 巨大なアイコンが一瞬表示される場合

私の環境で発生したことですが、本番環境のサイトでページ表示時にFont Awesomeの巨大なアイコンが一瞬表示されてしまう場合があります（ローカル環境では発生せず）。

少し調べたところ、同事象ぽい関連issueを発見。

- [Icons load incorrectly (very large) in server side when using library.add (Nuxt.js)](https://github.com/FortAwesome/vue-fontawesome/issues/14)
- [Support css option in config to solve Font Awesome Icon loading incorrectly (very large)](https://github.com/vuejs/vuepress/issues/2182)

結論からいうと、Font Awesomeのstyleがロードされる前にアイコンが表示されてしまうためみたいでした。

issueを見ていくと対処法が書かれていましたので以下のとおりmain.jsを修正すると解決されるようです。

main.jsを修正します。関係しないところは省いています。

```js:title=main.js
// configを追加
import { library, config } from "@fortawesome/fontawesome-svg-core";

// 以下2行を追加
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
```

最初上記の修正で試したのですが、**私の環境では事象が解消されませんでした。**私の環境ではpurgecssを使用しているのですが、どうもそれが原因で本番環境でビルドした時にfontawesomeのcssがパージされてしまい再発していたみたいです。

なので、最終的に以下のような修正をしました。

1. `node_modules/@fontawesome/fontawesome-svg-core`から`styles.css`を取り出してassets配下にコピー。
2. styles.cssにpurgecss ignoreコメントを追記。

purgecss ignoreコメントは`/*! purgecss start ignore */ ~ /*! purgecss end ignore */`のことです。これによりfontawesomeのcssをpurgecss対象から除外しています。

main.jsを修正。

```js:title=main.js
import { library, config } from "@fortawesome/fontawesome-svg-core";

// importするcssを修正
import "@/assets/fontawesome-styles.css";
config.autoAddCss = false;
```

これで私の環境でも事象が解消されました。もし同じ問題でお困りの人がいたら参考になれば幸いです。

## おわりに

GridsomeでFont Awesomeを使う方法について書きました。Font Awesomeはアイコンの種類が豊富でとても使いやすいアイコンリソースです。Gridsomeでも比較的簡単に導入できます。