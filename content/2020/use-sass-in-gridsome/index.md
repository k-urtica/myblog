---
slug: /use-sass-in-gridsome
title: GridsomeでSassを使えるようにする
date: 2020-03-25T23:50:12
updatedAt: ""
cover: cover.jpg
coverCaption: ""
summary: Gridsomeを使ったサイトにCSSメタ言語のSassを導入してSASS・SCSS記法を使えるようにする方法について紹介します。
tags: [Gridsome, Sass]
---

## Sassとは？

> SassはCSSを効率的に記述できるように設計・開発された言語であり、CSSの場合、長く複雑になってしまう記述であっても、わかりやすくシンプルに書けるというところが特徴です。
> 
> 出典：[https://ferret-plus.com/12503](https://ferret-plus.com/12503)

Sassを使用すると、ネストが使えたり変数が使えたりその他もろもろで、一言でいうとCSSを書く効率がグンと上がるようになります。

## GridsomeにSassを導入する

入れて損はないSassをGridsomeに導入する方法ですが、全く難しいことはありません。以下の２つのライブラリを入れるだけで使用できるようになります。

```bash
yarn add -D node-sass sass-loader
```

はい、これだけで問題なく使用できます。私はSCSS記法を普段使います。

VueのSFCで使う場合は以下のようにlangを指定すればOKです（SCSSの場合）

```markup
<style lang="scss">

</style>
```

## おわりに

GridsomeでSaasを使う方法について書きました。VueやNuxtではデフォルトで使えるものですが、Gridsomeでは別途ライブラリを入れる必要があります。といってもライブラリを入れるだけで使えるようになるので、Gridsomeを使うときは最初から導入しておくのが良いと思います。
