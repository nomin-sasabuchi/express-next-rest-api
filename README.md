# Express + Next.js モノレポ（Turborepo & pnpm 利用）

このプロジェクトは、Express.js によるバックエンド API と Next.js によるフロントエンドを、Turborepo と pnpm で管理するモノレポ構成です。

## 前提条件

- Node.js >= 18.0.0
- pnpm >= 8.15.4

## 学習の最終ゴール（実践レベル）

- [ ] API 設計（REST/graphql）
- [ ] 認証・認可（JWT, OAuth など）
- [ ] DB との連携（Prisma, Sequelize, etc.）
- [ ] バリデーション・エラーハンドリング
- [ ] ミドルウェア設計
- [ ] 環境変数・設定管理
- [ ] テスト（ユニット/統合）
- [ ] セキュリティ対策（CORS, Helmet, Rate limiting）
- [ ] デプロイ（Docker, CI/CD）

## この学習で作成するAPP

- [ ] 1. ユーザー管理API（CRUD）
     概要：ユーザーの新規作成・一覧・詳細・更新・削除を提供するREST API
     身につく力：
- クラス設計（Entity, Repository, UseCase）
- ルーティングとコントローラーの分離
- 3層アーキテクチャの基本
- JSONベースAPIの実装

🔰 最もベーシックかつ業務系に必須。最初に絶対おすすめ。

- [ ] 2. 認証付きToDoアプリAPI（ログイン機能付き）
     概要：ユーザー認証付きでToDoタスクを管理
     身につく力：
- ユーザー×データの関係
- JWTやセッションの認証設計
- 中間ウェア（authMiddlewareなど）の設計
- ロールやスコープなどの制御

👤 認証・ユーザーセッションを学びたいならこれ。実務でも頻出。

- [ ] 3. ブログAPI（投稿＋ユーザー）
     概要：ユーザーが記事を投稿・編集・削除できるシステム

身につく力：

- 投稿系のドメイン設計
- リッチなEntity（記事、ユーザー、タグなど）
- 検索やフィルタリングの処理

## 📘 API 設計一覧

### 🔐 ユーザー管理 API

| メソッド | エンドポイント   | 説明                       | パラメータ or 認証          |
| -------- | ---------------- | -------------------------- | --------------------------- |
| POST     | `/api/register`  | ユーザー登録               | `name`, `email`, `password` |
| POST     | `/api/login`     | ログイン（JWT 発行）       | `email`, `password`         |
| GET      | `/api/me`        | ログイン中ユーザー情報取得 | `Authorization` ヘッダー    |
| PUT      | `/api/users/:id` | ユーザー情報更新           | `name`, `email`             |
| DELETE   | `/api/users/:id` | ユーザー削除               | `Authorization` ヘッダー    |

---

### ✅ ToDo API（認証必要）

| メソッド | エンドポイント   | 説明               | パラメータ or 認証              |
| -------- | ---------------- | ------------------ | ------------------------------- |
| GET      | `/api/todos`     | 自分のToDo一覧取得 | `Authorization` ヘッダー        |
| POST     | `/api/todos`     | ToDo作成           | `title`, `dueDate`, `completed` |
| GET      | `/api/todos/:id` | ToDo詳細取得       | `Authorization` ヘッダー        |
| PUT      | `/api/todos/:id` | ToDo更新           | `title`, `dueDate`, `completed` |
| DELETE   | `/api/todos/:id` | ToDo削除           | `Authorization` ヘッダー        |

---

### 📝 ブログ投稿 API

| メソッド | エンドポイント   | 説明                 | パラメータ or 認証         |
| -------- | ---------------- | -------------------- | -------------------------- |
| GET      | `/api/posts`     | 投稿一覧取得（公開） | 認証不要                   |
| POST     | `/api/posts`     | 投稿作成             | `title`, `content`, `tags` |
| GET      | `/api/posts/:id` | 投稿詳細取得         | 認証不要                   |
| PUT      | `/api/posts/:id` | 投稿更新             | `title`, `content`, `tags` |
| DELETE   | `/api/posts/:id` | 投稿削除             | 作成者のみ（JWT）          |

## プロジェクト構成

```
express-next/
├── packages/
│   ├── api/        # Express API
│   └── web/        # Next.js フロントエンド
├── package.json    # ルートのpackage.json
├── pnpm-workspace.yaml  # pnpmワークスペース設定
├── turbo.json     # Turborepo設定
└── README.md
```

## はじめに

1. pnpm をインストール（未インストールの場合）:

```bash
npm install -g pnpm@8.15.4
```

2. 依存パッケージのインストール:

```bash
pnpm install
```

3. 開発サーバーの起動:

```bash
pnpm dev
```

これで Express API サーバー（ポート 3001）と Next.js 開発サーバー（ポート 3000）が同時に起動します。

## 利用可能なスクリプト

- `pnpm dev` - 開発モードで両方のサーバーを起動
- `pnpm build` - 全パッケージをビルド
- `pnpm start` - 本番モードで全パッケージを起動
- `pnpm lint` - 全パッケージのリントを実行
- `pnpm clean` - ビルド成果物や依存関係をクリーン

## Turborepo の特徴

- **ビルドキャッシュ**: ビルド成果物をキャッシュし、再ビルドを高速化
- **並列実行**: タスクを可能な限り並列で実行
- **タスク依存関係**: 依存関係に基づき正しい順序でタスクを実行
- **増分ビルド**: 変更があった部分のみ再ビルド

## pnpm の特徴

- **ディスク効率**: パッケージの重複を避けるストア方式
- **厳格な依存管理**: 宣言された依存関係のみアクセス可能
- **高速インストール**: 並列インストールと効率的なストレージ
- **ワークスペース対応**: モノレポを標準サポート

## 開発

各パッケージは個別に開発できます:

- API: `cd packages/api && pnpm dev`
- Web: `cd packages/web && pnpm dev`

## 本番運用

本番サーバーのビルドと起動:

```bash
pnpm build
pnpm start
```

### Turborepo 作業ルール（pnpm workspace）

| 操作                         | ルートでやるか？                             | 補足                                                 |
| ---------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| 依存パッケージのインストール | ✅ ルートで実行                              | `-w`（workspace root）に自動反映される               |
| 個別アプリにパッケージを追加 | ✅ ルートで `-F` または `--filter` 付きで    | 例：`pnpm add <pkg> --filter apps/backend`           |
| スクリプト実行               | ✅ ルートで `pnpm run <script> --filter=xxx` | 全体または特定パッケージの対象スクリプトを実行できる |
| `turbo run dev` 系           | ✅ 常にルートで実行                          | `turbo.json` がルートにあるため                      |
| `cd apps/xxx && pnpm dev`    | ❌ 原則NG（非推奨）                          | 一部機能や依存が壊れる可能性があるため               |
