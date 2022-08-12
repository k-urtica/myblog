---
slug: /scroll-progress-bar
title: スクロール量に応じたプログレスバーを表示する「vue-read-progress」を使ってみた
date: 2020-09-03T00:14:13
updatedAt: ""
cover: cover.jpg
coverCaption: "Photo by Kenny Luo on Unsplash"
summary: 画面をスクロールした量に応じてプログレスバーが更新されていくVueライブラリ「vue-read-progress」をGridsomeで構築した本ブログで使ってみた。
tags: [Vueライブラリ]
---

## vue-read-progressについて

vue-read-progressライブラリは画面スクロールに応じて更新されるプログレスバーを画面上（画面最上部）に表示することができるVue用ライブラリです。

[vue-read-progress](https://github.com/ajerez/vue-read-progress)

また、他にも似たようなこと実現できるライブラリがあります↓

- [vue-scroll-progress-bar](https://github.com/guillaumebriday/vue-scroll-progress-bar)
- [vue-scroll-progress](https://github.com/spemer/vue-scroll-progress)

それぞれ比較してみましたが、機能的にはどれも違いはなく、Gridsomeでの使用方法が記載されていたvue-read-progressを使うことにしました。

## プロジェクトへ導入する

使い方はリポジトリに記載されているため問題はないかと思います。

### インストール

```bash
yarn add vue-read-progress
```

### コンポーネントとして利用する

vue-read-progressはVueコンポーネントとして使います。

注意点としてはGridsomeはSSRで静的にページを生成しますが、vue-read-progressはSSRに対応していません。そのためimportしたvue-read-progressコンポーネントを`<ClientOnly></ClientOnly>`タグで囲ってあげる必要があります。


```markup
<template>
  <Layout>
    <ClientOnly>
      <read-progress color="#5C6BC0" height="4px" opacity="0.9" />
    </ClientOnly>
  </Layout>
</template>

<script>
export default {
  components: {
    ReadProgress: () =>
      import("vue-read-progress")
        .then((m) => m.default)
        .catch()
  }
};
</script>
```

オプションとしてプログレスバーの色や太さ（高さ）、透明度などをpropsで指定できます。

## おわりに

Vueのライブラリを使ってGridsome製ブログにスクロールプログレスバーを実装してみました。
Gridsomeのライブラリとなると全然数も無いのですが、（SSRのことだけ注意すれば）Vueのライブラリを問題なく使えるのでまだ発展途上にあるGridsomeでもライブラリ周りはそこまで困らないかなぁという印象です。