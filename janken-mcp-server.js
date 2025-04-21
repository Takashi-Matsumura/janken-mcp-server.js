#!/usr/bin/env node

const http = require('http');

// MCPサーバーの設定
const PORT = process.env.PORT || 3000;

// じゃんけんの選択肢
const choices = ['グー', 'チョキ', 'パー'];

// ランダムな選択を返す関数
function getRandomChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// HTTPサーバーを作成
const server = http.createServer((req, res) => {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONSリクエストの処理
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // POSTリクエストのみ処理
  if (req.method === 'POST') {
    let body = '';
    
    // リクエストデータを受け取る
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const requestData = JSON.parse(body);
        
        // MCPプロトコルで「じゃんけん」というワードを検出
        if (requestData.query && 
            (requestData.query.toLowerCase() === 'じゃんけん' || 
             requestData.query.includes('じゃんけん'))) {
          
          const choice = getRandomChoice();
          
          // MCPプロトコルに準拠したレスポンスを返す
          const response = {
            result: choice,
            metadata: {
              choice: choice
            }
          };
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response));
        } else {
          // 「じゃんけん」以外のクエリには対応しないことを示す
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'このサーバーは「じゃんけん」コマンドのみ対応しています'
          }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }
});

// サーバーを起動
server.listen(PORT, () => {
  console.log(`じゃんけんMCPサーバーが起動しました: http://localhost:${PORT}`);
});