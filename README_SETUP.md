# セットアップ手順

## 1. 依存関係のインストール

ターミナルで以下のコマンドを実行してください：

```bash
npm install
```

もし権限エラーが発生する場合は、以下を試してください：

```bash
sudo npm install
```

または、npmのキャッシュをクリアしてから再試行：

```bash
npm cache clean --force
npm install
```

## 2. 管理者ユーザーの初期化

```bash
npm run init-admin
```

これで管理者ユーザー（username: `admin`, password: `admin123`）が作成されます。

## 3. データの復元（既存データがある場合）

```bash
npm run restore
```

## 4. バックエンドサーバーの起動

```bash
npm run dev:server
```

サーバーが `http://localhost:3001` で起動します。

## 5. フロントエンドの起動（別のターミナル）

```bash
npm run dev
```

フロントエンドが `http://localhost:5173` で起動します。

## 6. 管理者サイトへのアクセス

- URL: `http://localhost:5173/admin/login`
- ユーザー名: `admin`
- パスワード: `admin123`

## トラブルシューティング

### tsx: command not found

依存関係がインストールされていません。`npm install` を実行してください。

### ログインできない

1. バックエンドサーバーが起動しているか確認
2. `npm run init-admin` を実行して管理者ユーザーを再作成
3. ブラウザのコンソール（F12）でエラーメッセージを確認

### ポートが既に使用されている

`package.json`の`dev:server`スクリプトでポート番号を変更できます。

