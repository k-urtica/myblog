---
slug: /gridsome-pwa
title: GridsomeにPWAを導入する方法
date: 2020-04-15T23:28:29
updatedAt: 2020-04-19T12:54:19
cover: cover.jpg
coverCaption: ""
summary: Gridsomeを使ったサイトにPWA（ Progressive web apps）を導入する方法について紹介します。
category: プログラミング
tags: [Gridsome, PWA]
---

## PWAとは？

PWAとはProgressive web apps（プログレッシブウェブアプリ）の略称です。

以下Googleのサイトから引用させてもらいました。

> Progressive Web Apps (PWA) are built and enhanced with modern APIs to deliver native-like capabilities, reliability, and installability while reaching anyone, anywhere, on any device with a single codebase.
> （PWAは最新のAPIで構築されており、単一のコードベースを使用して、デバイス、デバイス、場所を問わず、ネイティブのような機能、信頼性、およびインストール性を提供します）
>
> [What are Progressive Web Apps?](https://web.dev/what-are-pwas/)

簡単にいえばPWA対応することによって、今までネイティブアプリでしかできなかったことをWebサイトでも実現できるようになります。具体的には以下のようなことができるようになります。

- プッシュ通知
- PC・スマホ端末へのインストール
- ホーム画面へのアイコン追加
- プリキャッシュによる表示速度高速化
- オフライン対応

まぁブログのようなサイトでは全部が有用ということはないと思いますが、キャッシュはかなり効果的です。PWA化するだけでとりあえずパフォーマンスが上がるので入れて損は全くないです。

## PWAプラグインを導入する

Gridsomeで構築したサイトでPWAに対応するために色々実装する必要は全然ありません。ありがたいことにPWA化するプラグインを作ってくれた人がいて、プラグインが公開されています。

[girdsome-plugin-pwa](https://gridsome.org/plugins/gridsome-plugin-pwa)

このプラグインを入れるだけで簡単にPWA化できてしまいます。具体的にはPWAで使われるmanifest.jsonとservice-workder.jsが作成されます。

インストールします↓

```bash
yarn add gridsome-plugin-pwa
```

**4/19 追記**
**バージョン0.0.17で下記の事象は解消されたので現在は普通に最新のライブラリをいれるだけでOKです。**

~~はい、バージョンを0.0.13固定でインストールしています。このブログを書いている時点で最新は`0.0.16`なのですが、どうもバグがあってビルドできないため、現状で動く最新の`0.0.13`をインストールします。~~

~~バージョン`0.0.15`でgridsome-plugin-pwaの依存ライブラリとgridsomeの依存ライブラリで競合が発生しているらしくそのせいでビルドに失敗しているみたいです。で、`0.0.16`で対応されたみたいですが、今度は別のライブラリで競合が発生しているみたいで少なくとも私の環境ではビルドに失敗するため、上記のバージョンを使用しています。~~

~~この問題はissueに[上がっている](https://github.com/rishabh3112/gridsome-plugin-pwa/issues/30)のでそのうち解消されると思います。PWA化するために`0.0.13`でもとくに問題はありません。~~

インストール後、gridsome.configへプラグインの設定を追記します。

```js:title=gridsome.config.js
const siteName = "K note";
const siteUrl = "https://knote.dev";
const basePath = "/";

module.exports = {
  plugins: [
    {
      use: "gridsome-plugin-pwa",
      options: {
        title: siteName,
        startUrl: siteUrl + basePath,
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "/manifest.json",
        disableServiceWorker: false,
        serviceWorkerPath: "/service-worker.js",
        cachedFileTypes: "png,jpg,jpeg,svg,woff,woff2",
        shortName: siteName,
        themeColor: "#1a202c",
        backgroundColor: "#fafafa",
        icon: "src/assets/img/site-icon.png",
        msTileImage: "",
        msTileColor: "#1a202c"
      }
    }
  ]
}
```

各設定項目は以下のような感じです。より詳しくは“pwa 各設定項目名”でググってもらえれば出てくるかと思います。

- title（サイトの名前）
- startUrl（起動時のページ。トップページなら"/"）
- display（表示モードの指定。`standalone`でアプリのような見た目）
- statusBarStyle
- manifestPath（manifestファイルのパス）
- disableServiceWorker（trueの場合service-worker.jsが作られない）
- serviceWorkerPath（service-worker.jsのパス）
- cachedFileTypes（キャッシュするファイルの拡張子）
- shortName（ホーム画面でのアプリ表示名）
- themeColor（ツールバーの色）
- backgroundColor（アプリ起動時の読み込み画面背景色）
- icon（アプリのアイコン画像を指定。サイズは512×512）
- msTileImage（win10のタイル用の画像？）
- msTileColor（win10のタイル背景色？）

よく考えないといけない項目は`cachedFileTypes`ですかね。ここで指定した拡張子のファイルはservice workderによってキャッシュされます。

キャッシュされれば当然のことながら高速になるわけですが、よく考えずにキャッシュするとサイトのコンテンツが更新されても、古いキャッシュを読んでしまって正常に最新の状態に表示されないといったことがあります。

このキャッシュ戦略についてはちょっと私も調査中のところで、現状は画像ファイルとWebフォントのみをキャッシュ指定しています。画像やWebフォントなら特に考えずキャッシュしてOKだと思います。それにこれらのファイルはサイズも比較的大きいのでパフォーマンス改善に結構インパクトありますよ。

あとは、特に実装する必要はありません。これでビルドすればmanifest.jsonとservice-workder.jsが作られるはずです。簡単ですね！

ちなみにアイコン画像ですがmanifest.json用に通常は複数のサイズの画像を用意する必要があります。
いちいち異なるサイズの画像を用意するのは面倒ですが、gridsome-plugin-pwaを使うと`512×512`のアイコン画像をひとつ用意してコンフィグに指定してあげるだけで必要なサイズの画像を自動で生成してくれます。便利ですね！

ビルド時に生成されるmanifest.jsonも以下のような感じで自動生成された複数の画像を指定してくれます。

```json
"icons": [
    {
      "src": "assets\\static\\site-icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "assets\\static\\site-icon-384.png",
      "type": "image/png",
      "sizes": "384x384"
    },
    {
      "src": "assets\\static\\site-icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "assets\\static\\site-icon-180.png",
      "type": "image/png",
      "sizes": "180x180"
    },
    {
      "src": "assets\\static\\site-icon-152.png",
      "type": "image/png",
      "sizes": "152x152"
    },
    {
      "src": "assets\\static\\site-icon-144.png",
      "type": "image/png",
      "sizes": "144x144"
    },
    {
      "src": "assets\\static\\site-icon-128.png",
      "type": "image/png",
      "sizes": "128x128"
    },
    {
      "src": "assets\\static\\site-icon-120.png",
      "type": "image/png",
      "sizes": "120x120"
    },
    {
      "src": "assets\\static\\site-icon-96.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "assets\\static\\site-icon-72.png",
      "type": "image/png",
      "sizes": "72x72"
    },
    {
      "src": "assets\\static\\site-icon-48.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "assets\\static\\site-icon-16.png",
      "type": "image/png",
      "sizes": "16x16"
    }
  ]
```

## おわりに

Gridsomeで構築したWebサイトをPWA化する方法について書きました。PWA化するだけでとりあえずパフォーマンスが上がるし、プラグインで簡単に対応できるのでぜひ入れておきましょう！