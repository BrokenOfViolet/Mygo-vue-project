import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

// 创建 HTTP 服务器
const server = http.createServer(app);

// 初始化 WebSocket 服务
const wss = new WebSocketServer({ server });
const clients = new Map();

// WebSocket 连接逻辑
wss.on('connection', (ws) => {
    ws.on('message', (msgStr) => {
        try {
            const data = JSON.parse(msgStr);

            // 用户初始化连接，注册用户名到 clients 映射中
            if (data.type === 'init') {
                clients.set(data.username, ws);
                console.log(`${data.username} connected via WebSocket`);
            } else {
                const { from, to, content } = data;
                const target = clients.get(to);

                if (target && target.readyState === WebSocket.OPEN) {
                    target.send(JSON.stringify({
                        from,
                        content,
                        createdAt: Date.now()
                    }));
                }
            }
        } catch (err) {
            console.error('WebSocket message error:', err);
        }
    });

    ws.on('close', () => {
        for (let [username, client] of clients.entries()) {
            if (client === ws) {
                clients.delete(username);
                console.log(`${username} disconnected`);
                break;
            }
        }
    });
});

// 中间件
app.use(cors());
app.use(express.json());

app.use('/images', express.static('public/images'));

// 路由挂载
app.use('/api/user', userRoutes);      // 用户接口
app.use('/api/post', postRoutes);      // 帖子接口
app.use('/api/message', messageRoutes); // 消息接口

// 数据库连接
mongoose.connect('mongodb://127.0.0.1:27017/Mygo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
