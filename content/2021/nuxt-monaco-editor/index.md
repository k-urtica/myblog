---
slug: /nuxt-monaco-editor
title: NuxtでMonaco Editorを使う方法
date: 2021-02-27T18:35:17
updatedAt: ""
cover: cover.jpg
coverCaption: "Photo by Ferenc Almasi on Unsplash"
summary: VSCodeのエディタ部分が元となった、ブラウザ上で動作するMonaco Editor（モナコエディター）をNuxt.jsで使う方法。
category: プログラミング
tags: ["Nuxt.js", "Monaco Editor", "Vue.js"]
---

## Monaco Editorとは

[Monaco Editor（モナコエディター）](https://microsoft.github.io/monaco-editor/index.html)はブラウザ上で実行できるエディターです。VSCodeのエディタ部分をWebブラウザ上で動作できるように切り出されたライブラリです。

VSCodeが元となっているだけあって、インテリセンスやシンタックスハイライト、差分エディタなどかなり高機能なエディタとなっています。

👉 [Monaco Editor](https://microsoft.github.io/monaco-editor/index.html)

上記の公式ページで実際にブラウザ上でエディタを操作できます。ミニマップや右クリック時の専用のコンテキストメニューなどVSCodeにかなり近い見た目・機能のエディタであることがわかります。

## NuxtでMonaco Editorを使う

NuxtでMonaco Editorを使うには方法としてはいくつかあると思いますが、Vue.js用のMonaco Editorライブラリがあり、これがNuxtプロジェクトでも導入できるため利用するのがお手軽だと思います。

[monaco-editor-vue](https://github.com/FE-Mars/monaco-editor-vue)

似たようなライブラリ↓もありましたが、今回は上記のライブラリを使いたいと思います。

[vue-monaco](https://github.com/egoist/vue-monaco)

### ライブラリインストール

ライブラリ本体とwebpackプラグインをインストールします。

```bash
yarn add monaco-editor-vue monaco-editor-webpack-plugin@1.8
```

デフォルトのMonaco Editorは色々な言語ファイルがバンドルに含まれるのでサイズが大きくなります。必要な言語ファイルだけをバンドルに含めるために[monaco-editor-webpack-plugin](https://github.com/Microsoft/monaco-editor-webpack-plugin)を使います。

バージョンを1.8に指定しているのは、2021/2/27現在の最新バージョンであるv3.0.0だとエラーがでるためです。
エラーについてはissueに上がっていました。closeされていますが。。
[Error: Cannot find module 'vs/editor/contrib/anchorSelect/anchorSelect'](https://github.com/microsoft/monaco-editor-webpack-plugin/issues/130)

バージョンを(1.8系に)下げることでエラーが解消されるとあったので私の環境でもそのように対応しています。

### nuxt.config.tsへ追加

monaco-editor-webpack-pluginの設定を`nuxt.config.ts`へ追加します。
`languages`へエディタで利用する言語を指定します。ここで指定した言語の言語ファイルのみバンドルへ含まれます。

```js{codeTitle:nuxt.config.ts}

const MonacoEditorPlugin = require("monaco-editor-webpack-plugin");

const config: NuxtConfig = {
  // monaco editorの設定のみ抜粋
  build: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ["javascript", "html"],
      }),
    ],
  }
}
```

### コンポーネントで利用する

実際にコンポーネント内では以下のように利用します。オプションで`minimap`、`contextmenu`をfalse指定していますが、ミニマップ非表示・専用コンテキストメニューを使用されないようになります。
指定できるオプションについては[かなりあります](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)。必要に応じて指定ください。

```markup
<template>
  <div>
    <client-only>
      <monaco-editor
        v-model="inputText"
        width="100%"
        height="300"
        theme="vs-dark"
        language="html"
        :options="manacoOptions"
      />
    </client-only>
  <div>
<template>

<script lang="ts">
import Vue from "vue";

let MonacoEditor;
if (process.browser) {
  MonacoEditor = require("monaco-editor-vue").default;
}

export default Vue.extend({
  components: {
    MonacoEditor,
  },
  data() {
    return {
      inputText: "",
      manacoOptions: {
        minimap: { enabled: false },
        contextmenu: false,
        fontFamily: "SFMono-Regular, Fira code, Fira Mono, Consolas, Menlo, monospace",
      },
    };
  },
});
</script>
```

## おわりに

NuxtでMonaco Editorを利用する方法について紹介しました。
若干高機能すぎるかなという場合は以下のエディタもよさげかもです😉

[ace](https://github.com/ajaxorg/ace)