# Poeta Frontend

Poetaのフロントエンド

## Build Setup

``` bash
# install dependencies
$ docker-compose run front npm install

# serve with hot reload at localhost:3000
$ docker-compose up
```

## Test

``` bash
# jest test
$ docker-compose run front npm test
```

## Routing Definition

| path                                 | can view | title                  | 備考 |
| ------------------------------------ | -------- | ---------------------- | --- |
| `/about`                             | both     | Poetaについて          |    |
| `/:username`                         | both     | マイページ             |    |
| `/:username/:folder_id`              | both     | マイページ (フォルダー) |    |
| `/:username/:post_uid`               | both     | マイページ (TIL)       |*1  |
| `/signin?type`                       | guest    | ログイン               |    |
| `/signup`                            | guset    | 新規登録               |    |
| `/signup/enter-user-name`            | guset    | 新規登録後の初ログイン  |*2  |
| `/password/reset`                    | guest    | パスワードリセット     |    |
| `/password/reset/confirm`            | guest    | 新規パスワード入力     |    |
| `/auth/oauth`                        | guest    | sns認証を処理          |    |
| `/settings`                          | auth     | 設定 (トップページ)    |    |
| `/settings/deactivate`               | auth     | ユーザー退会           |    |
| `/settings/profile`                  | auth     | プロフィール編集       |    |
| `/settings/user-name`                | auth     | ユーザー名変更         |    |
| `/edit/new?status`                   | auth     | TIL新規作成            |*3  |
| `/edit/:post_uid?status`             | auth     | TIL編集               |*3  |

### can viewについて

閲覧できる状況を表す

- bothはログイン時、未ログイン時ともに閲覧できる
- guestは未ログインのみ閲覧できる
- authはログイン時のみ閲覧できる

### 備考について

- *1 `/signin?type`のtypeにはnewがあり、newが指定されているとき、新規登録後の初ログイン時であることを表す。初ログイン時は`/settings/user-name`にリダイレクトされる。
- *2 `/signup/enter-user-name`は`/signin?type=new`にリダイレクトされる。
- *3 `/edit/new?status`や`/edit/:post_uid?status`のstatusにはedit, both, viewがあり、editは編集画面のみ、bothは編集と閲覧両方、viewは閲覧のみを表す。
