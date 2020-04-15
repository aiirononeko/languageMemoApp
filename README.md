# README

## 全体として

・プライベートなメモモード（コア機能）

<!-- ・パブリックな記事モード -->

### ログイン機能関連(Gem 使用) かねぞう

・メールアドレス、パスワード認証（マスト）
・Twitter 認証（優先度高）
・GitHub 認証（優先度高）

・Google アカウント認証（優先度中）

・Instagram 認証（優先度低）
・FaceBook 認証（優先度低）

### 投稿機能関連 クレヘイ

・メモ作成機能（マークダウン）
・メモ編集機能
・メモ削除機能
・メモ管理機能

### 言語実行機能関連 ロピタル

・コード実行機能
・コード保存機能？

#### 実装方法

create アクションなどにとばして、そこで 1.入力されたコードをファイル(code.rb)に保存
2.Dockerfile に書き込む(code.rb をコンテナ内に持っていく) 3.コンテナ起動（volume オプションをつけて起動） 4.コンテナ上でコード実行（実行結果をファイル(result.txt)に書き込む（リダイレクトと言う） 5.コンテナとイメージ破棄 6.ホスト側に保存された実行結果をインスタンス変数に格納して画面に出力する

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
cp frontend/.env.win-home.example frontend/.env // .envのコピー

docker-compose run front npm i --no-bin-link // npm iの際にシンボリックリンクを作成しないようにする。

docker-compose up -d

docker-compose exec api rails db:create

docker-compose exec api rails db:migrate
```

※失敗したとき、環境構築中に失敗したときは以下を参照、追記することを推奨
[Windows Home環境でのDocker](https://github.com/aiirononeko/languageMemoApp/issues/80)

## バックエンド開発フロー

- Repsonaに実行するタスクを貼る
- タスクごとにブランチを切って作業する
- その作業でエンドポイントが増えたらその都度API仕様書に追記する、記法が独特なので既存コードをコピペして
文面や値だけ変えるのが分かりやすい。追記が終わったら最後にHTML形式に整形する。

``` shell
npm install -g aglio (aglioがインストールされていなければ)
aglio -i poeta_api.apib -o poeta_api.html (html形式に整形)
```

- ブランチをmasterにpush、レビューはslackでバックエンド担当の別メンバーにお願いする。
