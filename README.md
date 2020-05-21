# README

## 全体として

- プライベートなメモモード(コア機能)

<!-- ・パブリックな記事モード -->

### ログイン機能関連(Gem 使用) かねぞう

- [x] メールアドレス・パスワード認証(マスト)
- [x] Twitter 認証(優先度高)
- [x] GitHub 認証(優先度高)

- [x] Google アカウント認証(優先度中)

- [ ] Instagram 認証(優先度低)
- [ ] FaceBook 認証(優先度低)

### 投稿機能関連 クレヘイ

#### メモのCRUD

- [ ] メモ作成 機能(マークダウン)
- [ ] メモ編集 機能
- [ ] メモ削除 機能
- [ ] メモ管理 機能

### 言語実行機能関連 ロピタル

- [ ] コード実行 機能
- [ ] コード保存 機能？

#### 実装方法

create アクションなどにとばして、そこで以下のことを行う

1. 入力されたコードをファイル(code.rb)に保存

2. Dockerfile に書き込む(code.rb をコンテナ内に持っていく)

3. コンテナ起動(volume オプションをつけて起動)

4. コンテナ上でコード実行(実行結果をファイル(result.txt)に書き込む(リダイレクトと言う)

5. コンテナとイメージ破棄

6. ホスト側に保存された実行結果をインスタンス変数に格納して画面に出力する

## Docker コンテナ起動方法

### コンテナのビルド

`docker-compose build`

### コンテナの立ち上げ

`docker-compose up`

### フロント コンテナの中に入る

`docker-compose run front sh`

## 環境構築

Macでは以下のコマンドでできます

``` shell
cd frontend && npm i

docker-compose up -d

docker-compose exec api rails db:create

docker-compose exec api rails db:migrate
```

### Windows10 Home

``` shell
cp frontend/.env.win-home.example frontend/.env # .envのコピー

docker-compose run front npm i --no-bin-link # npm iの際にシンボリックリンクを作成しないようにする。

docker-compose up -d

docker-compose exec api rails db:create

docker-compose exec api rails db:migrate
```

※環境構築中に失敗したときは以下を参照、追記することを推奨  

[Windows Home環境でのDocker](https://github.com/aiirononeko/languageMemoApp/issues/80)

## Git Commit Guidelines

コミットメッセージのプレフィックス例

|  prefix  | 内容 |
|----------|------|
| feat     |  新機能 |
| fix      |  バグの修正 |
| docs     |  ドキュメント修正 |
| style    |  コード内容に影響を与えない変更 <br> 例. white-space, formatting, missing semi-colons |
| refactor |  リファクタリング<br> バグの修正も機能の追加も行わないコード変更 |
| perf     |  パーフォマンスを向上させるための変更 |
| test     |  テストの追加・修正 |
| chore    |  雑用<br>ビルドに関する変更やドキュメント生成のような変更 |
| wip      |  作業中 |

## バックエンド開発フロー

- Repsonaに実行するタスクを貼る
- タスクごとにブランチを切って作業する
- その作業でエンドポイントが増えたらその都度API仕様書に追記する、記法が独特なので既存コードをコピペして
文面や値だけ変えるのが分かりやすい。追記が終わったら最後にHTML形式に整形する。

``` shell
npm install -g aglio # aglioがインストールされていなければ

aglio -i poeta_api.apib -o poeta_api.html # html形式に整形
```

- ブランチをmasterにpush、レビューはslackでバックエンド担当の別メンバーにお願いする。
