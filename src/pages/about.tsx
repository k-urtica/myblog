import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import AppLink from '../components/AppLink';
import SEO from '../components/Seo';
import Layout from '../layouts/Layout';

const AboutPage: React.FC = () => (
  <>
    <SEO title="プロフィール" />

    <Layout>
      <MainWrapper>
        <HeaderContainer>
          <div tw="text-center">
            <h1 tw="inline-block text-2xl font-bold border-b-2 border-gray-700 px-4 pb-2">
              プロフィール
            </h1>
          </div>
        </HeaderContainer>

        <div tw="px-5 py-6 bg-blue-900 bg-opacity-10 rounded-xl shadow-xl">
          <Section>
            <SectionTitle>私について</SectionTitle>
            <SectionInner>
              <Paragraph>
                K（
                <AppLink to="https://twitter.com/k_urtica">@k_urtica</AppLink>
                ）です。お酒をのむこと・旅をすることが好きなソフトウェアエンジニアです😆
                <br />
                仕事で使うスキルはバックエンドの領域（Java/SpringFW）ですが、趣味で開発するときはVue.js
                / Nuxtをメインにフロントエンドの技術を使っています。
                <br />
                （最近は仕事でもフロントエンド開発に携わるようになりました）
              </Paragraph>
            </SectionInner>
          </Section>

          <Section>
            <SectionTitle>このブログについて</SectionTitle>
            <SectionInner>
              <Paragraph>
                このブログは私の個人ブログです。プログラミングやWeb技術のことなどメインに書きとめていっています。
                <br />
                もともと、Vueの静的サイトジェネレーターであるGridsomeで構築していたブログでしたが、今はGridsomeをreact製のGatsbyに変えてGatsbyでゼロから作り直して公開しています。
              </Paragraph>

              <Paragraph>
                ブログ記事はマークダウンを使い、記事や画像ファイル等をGitHubですべて自前で管理する構成としています。
                <br />
                Gatsbyはもとより、reactも初めて触るなかで構築したのできれいなソースではないですがリポジトリも公開しています🙃
                <br />
                <AppLink to="https://github.com/k-urtica/myblog">
                  リポジトリ：k-urtica / myblog
                </AppLink>
              </Paragraph>
            </SectionInner>
          </Section>

          <Section>
            <SectionTitle>個人開発したものの一部🔨</SectionTitle>
            <SectionInner>
              <h3 tw="text-lg">
                <AppLink to="https://web-toolbox.dev/">
                  Web ToolBox | 無料で気軽に使えるWebツール
                </AppLink>
              </h3>
              <Paragraph>
                プログラミングやWeb制作に便利なツールを公開しているサイトです。随時新しいツールを公開していく予定です。
                フロントエンドはNuxt ×
                Vuetify、インフラ・バックエンドはAWSを使用しています。
              </Paragraph>
            </SectionInner>
            <SectionInner>
              <h3 tw="text-lg">
                <AppLink to="https://qtvisualizer.com/">
                  QT Visualizer | 【Qiita技術記事のランキング】
                </AppLink>
              </h3>
              <Paragraph>
                技術共有サイト「Qiita」の人気かつ有用な記事・ユーザ・技術書籍をランキング化したWebサービス。Qiita最古の記事から現在までの50万以上のQiitaの記事を集計しています。
              </Paragraph>
            </SectionInner>
            <SectionInner>
              <h3 tw="text-lg">
                <AppLink to="https://k-urtica.github.io/">
                  ポートフォリオサイト
                </AppLink>
              </h3>
              <Paragraph>
                Nuxt × Vuetifyで作った私のポートフォリオサイトです😆 GitHub
                Pagesでホスティングしています。
              </Paragraph>
            </SectionInner>
          </Section>

          <Section>
            <SectionTitle>気軽にフォローしてください👋</SectionTitle>
            <SectionInner>
              <Paragraph>
                <AppLink to="https://twitter.com/k_urtica">
                  Twitter（@k_urtica）
                </AppLink>
                <br />

                <AppLink to="https://github.com/k-urtica">
                  GitHub（k-urtica）
                </AppLink>
              </Paragraph>
            </SectionInner>
          </Section>

          <hr tw="border-gray-400 mb-4" />
          <Section>
            <SectionTitle>プライバシーポリシー</SectionTitle>
            <SectionInner>
              <h3 tw="text-lg">アクセス解析ツールについて</h3>
              <Paragraph>
                このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
                トラフィックデータは匿名で収集されており、個人を特定するものではありません。
                この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                規約に関して、詳しくは
                <AppLink to="https://marketingplatform.google.com/about/analytics/terms/jp/">
                  Googleアナリティクス利用規約
                </AppLink>
                をご確認ください。
              </Paragraph>
            </SectionInner>
          </Section>
        </div>
      </MainWrapper>
    </Layout>
  </>
);

const MainWrapper = tw.div`
  container mx-auto px-3 md:px-10
`;

const HeaderContainer = tw.div`
  mt-10 pb-12
`;

const Section = tw.section`
  pb-3
`;

const SectionTitle = tw.h2`
  mb-2 font-bold text-lg
`;

const SectionInner = tw.div`
  pl-4
`;

const Paragraph = tw.p`
  mb-6 leading-7
`;

export default AboutPage;
