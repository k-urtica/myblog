---
slug: /use-eslint-in-gridsome
title: GridsomeにESLint、Prettierを導入する
date: 2020-03-30T19:20:55
updatedAt: ""
cover: cover.jpg
coverCaption: ""
summary: Gridsomeを使ったサイトにESLintとコードフォーマッターのPrettierを導入する方法について紹介します。
category: プログラミング
tags: [Gridsome, ESLint, Prettier]
---

## ESLintとは？

> ESLintは、コードをより一貫性のあるものにし、バグを回避することを目的として、ECMAScript / JavaScriptコードにあるパターンを識別してレポートするためのツールです。
> 
> 出典：[https://eslint.org/docs/user-guide/getting-started](https://eslint.org/docs/user-guide/getting-started)

説明不要な必須の静的コード解析ツールですね。

## Prettierとは？

Prettierはコードフォーマッターで、以下のような特徴を謳っています。

> - An opinionated code formatter（独断的なフォーマッター）
> - Supports many languages（多くの言語サポート）
> - Integrates with most editors（ほとんどのエディターとの統合）
> - Has few options（いくつかのオプション）

PrettierはJavaScriptだけでなく、多数の言語をサポートするフォーマッターです。ESLintでもコードフォーマット可能ですが、Prettierの方がフォーマットに関しては優れているので私はESLintと併用しています。

Prettierは静的解析機能はなくあくまでもコードフォーマットを行うだけのツールになります。

## GridsomeにESLintとPrettierを導入する

VueやNuxtであれば、CLIであらかじめESLintとPrettierが構成されたプロジェクトを作ることができますが、Gridsomeの場合は、別途導入する必要があります。

### インストール

ESLint関連ライブラリは以下。ESLint本体の他にPrettierと併用する際のライブラリやGridsomeのGraphQLクエリ（`<static-query>`、`<page-query>`）をLintするためのライブラリなどをあわせてインストールします。

```bash
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-gridsome eslint-plugin-vue babel-eslint
```

Eslint本体以外のライブラリは以下のようなものです。

- eslint-config-prettier（Prettierと競合するルールをオフにする）
- eslint-plugin-prettier（Prettier用ESLintプラグイン）
- eslint-plugin-gridsome（Vue SFCのカスタムブロック(GraphQL)lint対応）
- eslint-plugin-vue（Vue公式ESLintプラグイン）
- babel-eslint（非標準のJavaScript構文にlintを対応させる）

Prettierは本体のみでOKです。

```bash
yarn add -D prettier
```

### ESLintの設定を作成する

プロジェクトルートに`.eslintrc.js`を作成してESLintの設定を追加します。

```js:title=.eslintrc.js
module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:gridsome/recommended",
    "plugin:prettier/recommended",
    "prettier/vue"
  ],
  plugins: ["prettier", "gridsome", "vue"],
  rules: {
    "vue/max-attributes-per-line": "off"
  }
};
```

正直なところ、ESLintの設定まわりの構成にあまり詳しくないので、、Vue.js、Nuxt.jsのプロジェクトを参考に上記のような構成にしました。rulesは必要に応じて追加してください。

### Prettierの設定を作成する

プロジェクトルートに`.prettierrc`を作成してPrettierの設定を追加します。

```json:title=.prettierrc
{
  "semi": true,
  "arrowParens": "always",
  "singleQuote": false
}
```

セミコロンあり、シングルクォートなしといっただけの設定をオーバーライドしています。コードフォーマットの設定についてはそれぞれ好みによるところがあるかと思うので適宜設定します。

デフォルト設定については公式ドキュメントを参照ください。

- [Prettierの構成](https://prettier.io/docs/en/options.html)
- [設定ファイル](https://prettier.io/docs/en/configuration.html)

## VSCodeの設定

VSCodeを使用している場合はVSCodeも適切に設定を追記する必要があります。私のVSCodeの設定を載せておきます。これで保存時にlint、フォーマットがかかるようになります。
（拡張機能のESLint、Prettierは要インストール）

```json
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "[vue]": {
    "editor.formatOnSave": false
  },
  "[css]": {
    "editor.formatOnSave": false
  },
  "[scss]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
```

## おわりに

GridsomeでESLint、Prettierを設定する方法について書きました。Prettierについては入れない人もいるみたいですが、ESLintはもはや必須なので、プロジェクトを作ったら最初に入れておきましょう。