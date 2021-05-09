---
slug: /gridsome-google-adsense
title: Gridsomeで作ったサイトにGoogle Adsenseを導入する方法
date: 2020-04-19T14:58:29
updatedAt: 2021-03-13T13:15:10
cover: cover.png
coverCaption: ""
summary: Gridsomeで構築したサイトにGoogle Adsense（アドセンス）を導入してAdsense広告を貼る方法について紹介します。
category: プログラミング
tags: [Gridsome, Adsense]
---

## はじめに

Gridsomeで構築したサイト（本ブログ）にGoogle Adsenseを導入する方法について紹介したいと思います（自前でブログを運営していれば少しでも収益化できたらうれしいですよね？）

現状、AdsenseをGridsomeに導入するようなプラグインは無いため自前で実装します。

## 参考になりそうなライブラリ

Gridsomeのプラグインとしてはないのですが、実装の参考になりそうなライブラリは以下のようなものがあります。
それぞれ、Vue.js、Nuxt.js用のGoogle Adsenseライブラリです。

- [mazipan/vue-google-adsense](https://github.com/mazipan/vue-google-adsense)
- [nuxt-community/google-adsense-module](https://github.com/nuxt-community/google-adsense-module)

ちなみにvue-google-adsenseはライブラリとして試してみたのですが、どうもうまく動かずでした。。

本ブログでの実装はNuxtのgoogle-adsense-moduleを参考にしました。

## Adsense用コードを実装する

では実装していきます。

※Adsenseのサイト審査は済んでいる前提です。参考までに本ブログは3回目で審査通りました。その時の記事数は８で、よく審査時に必要と言われているプライバシーポリシーやお問い合わせは無い状態でした。

### Adsense用Scriptを追加する

最初にAdsense用のScriptを`<head></head>`に追加する必要があります。

```js
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
></script>
```

通常、Gridsomeでheadスクリプトを追加するにはmain.js内で以下のようにheadに追加します。

```js
export default function(Vue, { head }) {
  head.script.push({
    type: "text/javascript",
    "data-ad-client": "ca-pub-XXXXXXXXXXXXXXXX",
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
    async: true
  });
}
```

**しかし、これだと下記のエラーが発生します。。**

`adsbygoogle.js:63 Uncaught O {message: "adsbygoogle.push() error: Only one AdSense head tag supported per page. The second tag is ignored."`

google-adsense-moduleのissueにも[上がっていました](https://github.com/nuxt-community/google-adsense-module/issues/16)。調べていくとどうも、Nuxt.jsが使用しているvue-metaに[原因がありそう](https://github.com/nuxt/vue-meta/issues/381)でした。
Gridsomeでもvue-metaを使用しているので同じようなエラーが発生するみたいです。

エラーの原因としてはheadスクリプトがナビゲーション遷移時に再追加されてしまうことによるものでした。これがまだ解消されていないため、とりあえず本ブログではGridsomeのデフォルト`index.html`をオーバーライドする方法をとりました。

[index.htmlのオーバーライド](https://gridsome.org/docs/overriding-index/)

Gridsomeがページ生成時に使用するベースのHTMLテンプレートを上書きすることができます。Adsenseのスクリプトをmain.jsで追加するのではなく、ベースの`index.html`に直接追加しておく方法です。こうすればvue-metaの機能を使わずに済むためエラーが発生しなくなります。

Adsense Scriptのために最終的には以下の`index.html`を実装します。

```html:title=src/index.html
<!DOCTYPE html>
<html ${htmlAttrs}>
  <head>
    ${head}

    <% if(process.env.NODE_ENV === 'production') { %>
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    ></script>
    <% } %>
  </head>

  <body ${bodyAttrs}>
    ${app} ${scripts}
  </body>
</html>
```

**※ 2021/3/13 追記**
adsenseのscriptに`process.env.NODE_ENV === 'production'`の条件を追加しました。
本番モードでのみadsenseを有効にし、開発モード時のadsenseの広告読み込みで403エラーとなるのを防ぐためです。

### Adsense用コンポーネントを追加する

次にAdsense広告を表示するためのコンポーネントを実装します。

Adsenseの広告ユニットに必要なプロパティをpropsで受け取って利用します。これで汎用的にこのコンポーネントを利用することができます。

ただ、このコンポーネントひとつでAdsenseのすべての広告ユニットをまかなうようにpropsを用意したため、広告ユニットによっては使わないpropsもあって若干煩雑かもしれません。その場合はAdsenseのディスプレイ広告・記事内広告など広告ユニットごとにコンポーネントを作るのも良いと思います。

`mounted`、`methods`はNuxt.jsのgoogle-adsense-moduleからそのまま利用させてもらいました。コンポーネントがマウントされてかつ、`this.$nextTick`でビュー全体がレンダリングされるのを待って処理が実行されるようにします。

```markup:title=components/Adsense.vue
<template>
  <ins
    class="adsbygoogle"
    :data-ad-layout="adLayout"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :data-full-width-responsive="adResponsive"
    :data-ad-layout-key="adLayoutKey"
    :style="adStyle"
  />
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      required: false,
      default: "ca-pub-XXXXXXXXXXXXXXXX"
    },
    adSlot: {
      type: String,
      required: true,
      default: ""
    },
    adFormat: {
      type: String,
      required: false,
      default: "auto"
    },
    adLayout: {
      type: String,
      required: false,
      default: null
    },
    adStyle: {
      type: String,
      required: false,
      default: "display: block;"
    },
    adResponsive: {
      type: String,
      required: false,
      default: null
    },
    adLayoutKey: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted() {
    this.showAd();
  },
  methods: {
    showAd() {
      this.$nextTick(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
};
</script>
```

## Adsenseコンポーネントを利用する

実装したコンポーネントは以下のように利用します（記事内広告ユニットの例）

```markup
<template>
  <div>
    <adsense
      ad-layout="in-article"
      ad-slot="9999999999"
      ad-format="fluid"
      ad-responsive="false"
    />
  </div>
</template>
```

## Adsense広告の全幅表示が気になる場合

これはGridsomeでの実装とは関係ないのですが、モバイル端末でAdsense広告がサイトレイアウト関係なく強制的に全幅表示されてしまう場合があります。

これを防ぐには`data-full-width-responsive`にfalseを指定します。
実装したadsenseコンポーネントで指定するときは`ad-responsive="false"`としてpropsを追加します。

## おわりに

Gridsomeで作成したサイトにGoogle Adsenseを導入する方法について書きました。Nuxtでサイトを作った時は公式のプラグインを利用していたのですが今回は自前実装ということで不備があるかもしれません。今のところ問題なく表示できていますが。

今後なにか問題があればこの記事も修正したいと思います。