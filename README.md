# janken-mcp-server.js

じゃんけんMCPサーバーは、MCPプロトコルを使用して「じゃんけん」ゲームを提供するシンプルなHTTPサーバーです。

## 特徴
- MCPプロトコルに基づいたリクエスト/レスポンス形式
- ランダムな「グー」「チョキ」「パー」の選択を返す
- CORS対応

## インストール

1. このリポジトリをクローンします:
   ```bash
   git clone <リポジトリURL>
   cd janken-mcp-server.js

## 使用方法

1. サーバーを起動します:
   ```bash
   node janken-mcp-server.js

2. サーバーはデフォルトでhttp://localhost:3000でリクエストを受け付けます。

3. MCPプロトコルに準拠したPOSTリクエストを送信します。例:
curl -X POST http://localhost:3000 -H "Content-Type: application/json" -d '{"query": "じゃんけん"}'

4. サーバーからのレスポンス例:
{
  "result": "グー",
  "metadata": {
    "choice": "グー"
  }
}