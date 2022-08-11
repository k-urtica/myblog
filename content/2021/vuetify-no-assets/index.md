---
slug: /vuetify-no-assets
title: VuetifyでデフォルトのアイコンとRobotoフォントを使わない設定
date: 2021-02-21T20:30:45
updatedAt: ""
cover: cover.png
coverCaption: ""
summary: Vuetify（Nuxt Vuetify-module）でデフォルトで使用されるマテリアルデザインアイコンとRobotoフォントを使わない設定について。
category: プログラミング
tags: [Vuetify, NuxtJS, Vue.js]
---

## NuxtでVuetifyを使う

Vue.jsのUIフレームワークである[Vuetify](https://vuetifyjs.com/ja/)ですが、もちろんNuxtでも使うことができます。

Nuxtで使う場合は公式で提供されている[vuetify-module](https://github.com/nuxt-community/vuetify-module)を使用することで簡単にプロジェクトに導入できます（若干、メンテ状況が微妙ですが、、😅）

## Vuetifyのデフォルトアセット

Nuxtプロジェクトへの導入はここでは割愛しまして、Vuetifyを導入するとデフォルトでマテリアルデザインアイコンとWebフォントとしてRobotoフォントを使用できるようになります。

何も考えなくても使える分便利ではあるのですが、デフォルトだと全てのアイコンが含まれたCSS・Robotoフォントがダウンロードされることになるので、これがそこそこ大きく、パフォーマンス悪化の原因になります。
そこで、実際に使うアイコンのみをバンドルに含め、余計なCSS・フォントのダウンロードを止めたいと思います。

## @mdi/jsを使う

結論から書くと、デフォルトアセットを無効化して代わりに[@mdi/js](https://github.com/Templarian/MaterialDesign-JS)を使用します。
@mdi/jsを使うことで、使用するアイコンを指定してインポートでき、それだけをバンドルに含めることが可能です。

## @mdi/jsの導入

@mdi/jsをプロジェクトへ追加します。

```bash
yarn add -D @mdi/js
```

コンポーネントで使う際は以下のように使いたいアイコンのみインポートすることができます。簡単ですね。

```markup
<template>
  <div>
    <v-icon>{{ icon.mdiCheckCircle }}</v-icon>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mdiCheckCircle } from "@mdi/js";

export default Vue.extend({
  data() {
    return {
      icon: { mdiCheckCircle },
    };
  }
});
</script>
```

## デフォルトアセットの無効化

アイコンは@mdi/jsで使えるようになったので、VuetifyデフォルトのマテリアルデザインアイコンとRobotoフォントは無効にしましょう。

nuxt.config.tsでvuetifyの構成の`defaultAssets`をfalseにします。

```ts:title=nuxt.config.ts
const config: NuxtConfig = {
  // vuetifyの設定のみ抜粋
  vuetify: {
    defaultAssets: false,
  }
}

export default config;
```

これでマテリアルデザインアイコンのCSSとRobotoフォントのダウンロードをしなくなります（これらのリソースのlinkタグが`<head></head>`に追加されなくなります）

ただし、defaultAssetsを無効化するとVuetifyのUIコンポーネントで使われている**アイコンが一切表示されなくなってしまいます。**

そこでVuetifyのオプション構成としてアイコンのオプションへ`mdiSvg`を指定します。こうすることでVuetify自身のコンポーネントで@mdi/jsのアイコンが使われるようになり上記の問題を解消できます。

```ts:title=plugins/vuetify.options.ts
export default {
  icons: {
    iconfont: "mdiSvg",
  },
};
```

このpluginをnuxt.config.tsのoptionPathへ追加します。

```ts:title=nuxt.config.ts
const config: NuxtConfig = {
  // vuetifyの設定のみ抜粋
  vuetify: {
    optionsPath: "./plugins/vuetify.options.ts",
    defaultAssets: false,
  }
}

export default config;
```

これで全ての設定は完了です！
マテリアルデザインアイコンはそのままにパフォーマンスが向上するはずです😆