---
slug: /duprecated-eslint-plugin-prettier
title: いつのまにかeslint-plugin-prettierが推奨されないものになってた
date: 2020-08-29T20:48:56
updatedAt: ""
cover: cover.jpg
coverCaption: "Photo by Shahadat Rahman on Unsplash"
summary: PrettierをESLintとして実行することができるプラグインを使ったESLint・Prettier連携方法が公式で非推奨になってた話。
tags: [ESLint, Prettier, VSCode]
---

## はじめに

VSCodeのsettings.jsonを見直している中でフォーマッタの設定についてEslint、Prettierのドキュメントを見ていたらPrettierの公式ドキュメントで↓のページを見つけた。

[Integrating with Linters#Notes](https://prettier.io/docs/en/integrating-with-linters.html#notes)

> When searching for both Prettier and your linter on the Internet you’ll probably find more related projects. These are generally not recommended, but can be useful in certain circumstances.

>First, we have plugins that let you run Prettier as if it was a linter rule:

> - eslint-plugin-prettier
> - tslint-plugin-prettier
> - stylelint-prettier

全文は上記のリンクを確認してほしいのですが、ようは今までESLintとPrettierを一緒に使う場合、PrettierをESLintとして使えるようにするプラグインがあって、そのプラグインを使って両者を連携するやり方がいたるところで紹介されていたのが、今は推奨されませんよと記載されています。

理由としては以下が挙げられています。

- エディター上で赤い破線が多く表れて煩わしい（フォーマッターを導入しているのに逆に意識することになってしまう）
- Prettierを実行するよりも遅い
- プラグインという余計なレイヤーがあることでそこで何かしらの問題が発生する可能性がある


## ESLintとPrettierについて

ESLintは静的解析ツールです。プラスしてフォーマット機能も有しています。
Prettierはフォーマッターです。こちらはフォーマットオンリーです。

現在はESLintで静的解析を行い、ESLintのフォーマットは無効にしつつ、Prettierでフォーマットを行うというのがメジャーかと思います。

両者を連携させるために、以下の２通りの方法があります。

- ESLintでPrettierも実行させるようにする（eslint-plugin-prettier）
- ESLint、Prettierをそれぞれ実行する

※両方ともESLintでPrettierと競合するルールはオフにすることが前提です

そして今はPrettierのドキュメントを見ると「ESLintでPrettierを実行させる」やり方が推奨されないものになっていました。
でもネットでESLint、Prettierについて検索するとほとんど上の`eslint-plugin-prettier`を使うやり方ばかりでてきます。私も今までずっとそのやり方でESLintとPrettierを使っていました。

ただ、推奨されないとあるので、今回VSCodeの設定見直しと合わせてESLint、Prettierの連携方法も推奨される方に変えてみました。

### ESLint/Prettier連携（今まで）

公式で推奨されていなかった方法（eslint-plugin-prettierを使う方法）ついては過去に書いていますのでそちらを参照ください。

[GridsomeにESLint、Prettierを導入する](/post/2020-03-30/use-eslint-in-gridsome)

### ESLint/Prettier連携（推奨版）

このブログの開発に使用しているESLintとPrettierの構成を推奨される方法に変更していきます。
（変更というかESLint、Prettier両方外した状態でイチから入れてみたいと思います）

#### 導入パッケージ

```bash
yarn add -D eslint eslint-config-prettier eslint-plugin-gridsome eslint-plugin-vue babel-eslint prettier
```

- eslint（eslint本体）
- eslint-config-prettier（Prettierと競合するルールをオフにする）
- eslint-plugin-gridsome（Vue SFCのカスタムブロック(GraphQL)lint対応）
- eslint-plugin-vue（Vue公式ESLintプラグイン）
- babel-eslint（非標準のJavaScript構文にlintを対応させる）
- prettier（prettier本体）

`eslint-plugin-prettier`は入れません。

#### ESLint、Prettier構成

ESLintの構成ファイルは以下のようになります。

```json:title=.eslintrc.json
{
  "root": true,
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:gridsome/recommended",
    "prettier",
    "prettier/vue"
  ],
  "plugins": ["vue"],
  "rules": {}
}
```

`extends`に適用するルールセットを記載します。先頭から適用されるため書く順番に注意が必要です。

eslint→ eslint-plugin-vue → eslint-plugin-gridsome の順番でルールを適用し、さらにprettier → prettier/vue でprettierと競合するESLintルールをオフにするように適用します。

Prettierの構成ファイルは以下（お好みで）

```json:title=.prettierrc
{
  "semi": true,
  "arrowParens": "always",
  "singleQuote": false,
  "trailingComma": "none"
}
```

#### VSCode設定

VSCodeを使う際にファイル保存時に静的解析・フォーマットが有効になるよう設定をします。
VSCode拡張機能の`ESLint`と`Prettier`を入れる必要があります。

```json:title=settings.json
{
  /* Linter and Formatter */
  // linter
  "eslint.packageManager": "yarn", // ESLintライブラリ解決時に使うパッケージマネージャ
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true, // eslint
    "source.fixAll.stylelint": true // Stylelint
  },
  // formatter
  "editor.defaultFormatter": "esbenp.prettier-vscode", // デフォルトフォーマッターをPrettier
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  // Prettier対象外言語
  "prettier.disableLanguages": ["markdown"]
}
```

settings.jsonのリンター、フォーマッターの箇所だけ抜粋。
`editor.codeActionsOnSave`の`source.fixAll.eslint`をtrueにして保存時にESLintが実行されるようにします。format系の設定もすべて有効にします。

これで保存時にESLint、Prettierがそれぞれ実行されます。**Prettierと競合するESLintルールは前述したとおり、`.eslintrc.json`でオフにするようしているため、それぞれが実行されても問題は発生しません。**

※ ちなみにVSCodeのESLintはパッケージの解決にプロジェクトローカル → グローバルの優先順で検索して見つかったものが使用されます。同様にPrettierはプロジェクトローカル → グローバル → 拡張機能バンドルPrettierの順で使われます。

今までのESLintでPrettierも実行する方法の場合、VSCodeの設定でjsやvueファイルだけフォーマッタOFFにしたり、あまり素直な設定ではなかったのですがこちらのやり方はリンター・フォーマッターともにONにするだけでOKでわかりやすくなります。

## おわりに

今までなんとなく入れて動いてるからいいやと思っていた節があったのですが、ちゃんとESLint、Prettierの公式ドキュメントを読んでみたら意外と間違った設定をしていたみたいで、公式ドキュメントはちゃんと読む必要があるなーと反省。。

※ 参考リンク
[ESLint](https://eslint.org/)
[ESlint(VSCode拡張)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
[Prettier](https://prettier.io/)
[Prettier(VSCode拡張)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)