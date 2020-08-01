# Poeta

## 全体として

- プライベートなメモモード(コア機能)

<!-- ・パブリックな記事モード -->

## 各機能について

### ログイン機能

- [x] メールアドレス・パスワード認証
- [x] Twitter 認証
- [x] GitHub 認証
- [x] Google アカウント認証

- [ ] Instagram 認証(優先度低)
- [ ] Facebook 認証(優先度低)

### 投稿機能関連

#### TIL (Markdown) のCRUD

- [x] TIL 作成機能
- [x] TIL 編集機能
- [x] TIL 削除機能
- [x] TIL 管理機能

### 言語実行機能関連

> 担当: ロピタル

- [ ] コード実行機能
- [ ] コード保存機能？

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

### 各コンテナの中に入る

#### APIコンテナ

`docker-compose run api sh`

#### フロントコンテナ

`docker-compose run front sh`

## 環境構築

``` shell
# コンテナ立ち上げ
$docker-compose up -d

# DB テーブル作成
$docker-compose run api rails db:create

# DB マイグレーション
$docker-compose run api rails db:migrate

# フロント ライブラリインストール
$docker-compose run front npm install
```

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
文面や値だけ変えるのが分かりやすい。追記が終わったら最後にHTML形式へ整形する。

``` shell
npm install -g aglio # aglioがインストールされていなければ

aglio -i poeta_api.apib -o poeta_api.html # html形式に整形
```

- ブランチをmasterにpush、レビューはslackでバックエンド担当の別メンバーにお願いする。

## 開発

### 開発中のメールの確認

`http://localhost:3000/letter_opener`
にアクセスすることで送信されたメールの確認ができる。

## インフラ（CDパイプライン構築までの暫定対応）
### APIのデプロイ
ローカルでDockerfile.prodを使用してコンテナをビルド→ECRにプッシュ→新しいデプロイの強制を選択する
コマンドは以下の通り
```
docker build -f Dockerfile.prod .
```
```
aws ecr get-login --no-include-email
```
```
docker push 139465735782.dkr.ecr.ap-northeast-1.amazonaws.com/poeta-api:latest
```

### Clientのデプロイ
ローカルでDockerfile.prodを使用してコンテナをビルド→コンテナのdistファイルをホストマシンにコピー→s3にアップロード
コマンドは以下の通り
```
docker build -f Dockerfile.prod .
```
```
# コンテナIDを調べる
sudo docker ps
sudo docker cp <コンテナID>:/frontend/dist frontend/
```
```
aws s3 rm s3://poeta-client/ --recursive
aws s3 sync frontend/dist/ s3://poeta-client/
```
