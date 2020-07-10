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

## 命名規則

Vueの命名規則はいろいろなパターンがあるので、このプロジェクト内での命名規則を書いておく。

参考記事: [【Vue】単一ファイルコンポーネントの命名規則まとめ【ファイル名から記法まで】](https://qiita.com/ngron/items/ab2a17ae483c95a2f15e)

|                     | 記法    | 正しい例                          | 推奨や補足 |
| ------------------- | ------- | --------------------------------- | ---------|
| ファイル名           | Pascal | `UserList.vue`                     |  |
| コンポーネントの記述  | Pascal | `<UserList />`                     | |
| コンポーネントの登録  | Pascal | `components: { UserList }`         | @nuxtjs/componentsを採用により書く必要がない |
| data(変数名)         | Camel  | `data() { return { firstName } }`  | - 関数で返す(必須) |
| メソッド名           | Camel  | `hundleClick()`                    | |
| イベント名           | Kebab  | `create-button-click`              | ・末尾は不定形の動詞、名詞にすること |
| propsの受け渡し側    | Kebab  | `first-name`                        | |
| propsの受け取り側    | Camel  | `firstName`                         | |

### 記法表 (Notation Table)

| Notation    | Example   |
| ----------- | --------- |
| Pascal Case | UserList  |
| Camel Case  | userList  |
| Kebab Case  | user-list |
| Snake Case  | user_list |

### ファイル名

- 複数単語にする

- 親子関係の場合、親の名前を接頭辞にする

- 最高レベルの単語からはじめて修飾語で終わる

- ベースコンポーネントはBase,App,Vを接頭辞にする

- 単一インスタンスの場合はTheをつける
