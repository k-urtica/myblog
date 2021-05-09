---
slug: /use-vuex-in-gridsome
title: GridsomeにVuexを導入する
date: 2020-03-28T00:01:40
updatedAt: ""
cover: cover.jpg
coverCaption: ""
summary: Gridsomeを使ったサイトにVueの状態管理ライブラリ『Vuex』を導入する方法について紹介します。
category: プログラミング
tags: [Gridsome, Vuex]
---

## Vuexとは？

> Vuex は Vue.js アプリケーションのための 状態管理パターン + ライブラリです。アプリケーション内の全てのコンポーネントのための集中型のストアとして機能します。
> 
> 出典：[https://vuex.vuejs.org/ja/](https://vuex.vuejs.org/ja/)

VuexはNuxt.jsであればデフォルトで含まれており、Vue.jsの場合は別途Vuexを導入する必要があるライブラリです。Gridsomeもデフォルトでは含まれていないため、使用する場合は別途インストールする必要があります。

ちなみに、こういう記事を書く手前あれなんですが、Vuexは必ずしも必要ではありません。特にGridsomeで静的サイトを構築する用途であればほぼ不要なはずです。

入れるだけバンドルサイズが肥大化するだけなので、よほどのことがない限り入れないほうが良いと思います笑

## GridsomeにVuexを導入する

不要と言っていてあれですが、導入方法は以下になります。

### インストール

```bash
yarn add vuex
```

### Vuexストアを実装する

`src/store/index.js`を作成します。

stateやmutationsの実装方法そのものは[Vuexのドキュメント](https://vuex.vuejs.org/ja/)を参照ください。

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});
```

### Vueインスタンスにストアを追加する

main.jsに設定を追加します。storeをimportしてappOptionsに追加します。

```js
import store from "~/store/index";

export default function(Vue, { appOptions, head }) {
  appOptions.store = store;  
}
```

これで使用できるようになります。Vueファイルからstoreをコールする方法は同じです。Vuexのステート、ミューテーション等々のページを参照ください。

## おわりに

GridsomeでVuexを使う方法について書きました。冒頭でも書きましたが、Gridsomeで構築するようなサイトの場合、Vuexが過剰実装になる場合があるので、Vuexでなければ実現できないような機能がある時だけ導入する方が良いと思います。無駄にバンドルサイズを肥大化させずにGridsomeの爆速を維持しましょう。
