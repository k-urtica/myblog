---
slug: /lookback-2022-07
title: 個人開発等の月次振り返り 2022年4～7月
date: 2022-08-11T11:29:46
updatedAt: ""
cover: cover.jpg
coverCaption: ""
summary: だいぶ間が空いてしまったけど、4月～7月までの振り返り。
category: 振り返り
tags: ["個人開発", "Web ToolBox", "雑記"]
---

だいぶ間が空いてしまったけど、4月～7月までで個人開発してきたことの振り返りを書く。

前回はこちら↓

[$card](https://knote.dev/post/2022-04-04/lookback-2022-03/)

## Web ToolBoxの開発・運営

Web ToolBoxというブラウザ上で使える、開発者のためのツール集を公開しているWebサービスを開発・運営中😄

[$card](https://web-toolbox.dev)

思えば、公開してもう1年ちょっと経ったらしい。こつこつずーっと開発を継続できている。
なんというか、Vue/Nuxtをはじめとしたフロントエンドやインフラまわりの勉強も兼ねて開発してる。

トップページにメインの更新情報を載せているけど、そこに書いている以外にも細かいものから大規模なもの(かつ利用者には影響がないもの)までかなり更新してきた。

具体的には、まずはツールの追加。4月～7月までいくつかのツールを追加した。

- [SQLフォーマッター](https://web-toolbox.dev/tools/sql-formatter)
- [JSON・YAML変換](https://web-toolbox.dev/tools/json-yaml-converter)
- [OGPチェッカー](https://web-toolbox.dev/tools/ogp-checker)
- [OGP画像シミュレーター](https://web-toolbox.dev/tools/ogp-image-simulator)
- [URLエンコード・デコード](https://web-toolbox.dev/tools/url-encode-decode)
- [基数変換](https://web-toolbox.dev/tools/number-base-converter)
- [UUID/GUID生成](https://web-toolbox.dev/tools/uuid-generator)
- [JWTデコーダー](https://web-toolbox.dev/tools/jwt-decoder)
- [Box Shadowジェネレーター](https://web-toolbox.dev/tools/box-shadow-generator)

列挙してみると意外と追加していたみたいで、個々のツールの説明は割愛。

ツールの追加以外にはSEO対策とデザインの全面的なアップデート、Nuxt2→Nuxt bridgeへの移行などなど。。

### SEO対策について

[前回の振り返り](https://knote.dev/post/2022-04-04/lookback-2022-03/)にも書いてるけど、3月時点でWeb ToolBoxのPV、MAUなどが下降・停滞気味に、、

SEO対策として、ページtitleやmeta descriptionの見直し、サイト全体のマークアップの改善を実施した。

あと、サーチコンソールのWebに関する主な指標でLCPの問題がでていたので対策をした。
原因はVuetifyのナビゲーションドロワーだった。Vuetifyのドロワーは画面サイズに応じて開閉する(モバイル時は閉じる)仕組みになっているけど、ビルド時は画面サイズが0(=モバイル)として扱われるみたいで、結果的にPCでWebサイトを表示したときにドロワーが開くという動きになる。
それが、LCPの指標にひっかかっていた。

Vuetifyのissueにもあったけど、現状どうにもならないっぽい(SSR/SSGで発生する)ので、Web ToolBoxの初回アクセス時に全面ローディング画面を表示するようにした。
全面ローディング画面の裏でドロワー含めて表示を行っておいて表示が完了するタイミングでローディング画面を消すという方法を取った。

ローディング画面ってあまり好きじゃないんだけどこれでLCPエラーは解消。まぁ初回のみかつ数百ミリ秒の表示だけだから許容範囲と思ってる。

諸々対策した結果、4月から徐々にPVやMAU、収益が順調に回復、上昇傾向になった↗

### デザインの全面アップデートについて

ツールアイコンの追加、サイトのアイコン・OGPの変更、トップページのデザイン変更等々変えた。他にも細かい部分で色々アップデート。
デザインは終わりがないね。。🤔

### Nuxt birdgeへ移行

Web ToolBoxはNuxtのv2で開発していたけど、Nuxt3の正式リリースに向けてそろそろbridgeへ移行することにした。
bridge自体はまだNuxt2だけど、composition APIやNuxt3の機能が色々使えるので重い腰を上げて移行を行った。

やったことは別で書こうかなと思ってるけど、移行自体は無事完了（composition APIへ書き直すのが大変だった、、）

## Web ToolBoxの実績

| 項目                   |   2022/07 |   2022/06 |  2022/05 |
| :--------------------- | ----: | ----: | ---: |
| PV                     |  11149 |  9079 | 6809 |
| MAU                    |  4890 |  4077 | 1989 |
| 平均ページ滞在時間(分) |  2:54 |  2:47 | 2:56 |
| 収益(adsense)          | ¥6318 | ¥5610 | ¥2742 |
| 支出(AWS)              | ¥110 | ¥90 | ¥87 |

直近3ヶ月分までの表示にした。上で書いたSEO対策やデザインのアップデートのおかげか、かなり数値が改善・上昇してきた。

特にアドセンスの収益が上がってきて嬉しいかぎり😄
クリック数はそこまで多くないけど、なぜか単価が高いみたい。

## おわりに

久しぶりにブログを書いた。
書きたいことがないわけじゃないからもう少し更新していきたい😅

↓Web ToolBoxよろしくお願いします！

[$card](https://web-toolbox.dev)