const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Import các module tự viết
const appEmitter = require('./events/AppEmitter');
const UpperCaseTransform = require('./streams/TextTransform');
const EchoDuplex = require('./streams/EchoDuplex');

// --- HỆ THỐNG EVENT ---
appEmitter.once('init', (msg, callback) => {
    console.log('Hệ thống khởi tạo: ' + msg);
    if (typeof callback === 'function') {
        callback('Đã xác nhận khởi tạo hệ thống thành công!');
    }
});
appEmitter.emit('init', 'Chào mừng Kim Anh', (res) => console.log('[EVENT CALLBACK]:', res));

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Hàm render HTML chuẩn
    const renderHTML = (fileName) => {
        fs.readFile(path.join(__dirname, 'views', fileName), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Lỗi đọc file HTML: ' + fileName);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    };

    // 1. Trang chủ
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index') {
        renderHTML('index.html');
    }

    // 2. Trang Events
    else if (parsedUrl.pathname === '/events') {
        renderHTML('events.html');
    }

    // 3. Trang Request Info (Hiển thị JSON đẹp)
    else if (parsedUrl.pathname === '/request') {
        res.writeHead(200, { 
            'Content-Type': 'application/json; charset=utf-8',
            'X-Powered-By': 'NodeJS-Lab6-Blog',
            'X-Student': 'Kim-Anh'
        });
        const requestDetails = {
            url: req.url,
            method: method,
            headers: req.headers,
            query: parsedUrl.query
        };
        res.end(JSON.stringify(requestDetails, null, 4)); // Định dạng 4 khoảng trắng cho đẹp
    }

    // 4. Trang Streams - HIỆN GIAO DIỆN
    else if (parsedUrl.pathname === '/streams') {
        renderHTML('streams.html');
    }

    // 4.1 Endpoint lấy nội dung bài viết (Dùng cho iframe trong streams.html)
    else if (parsedUrl.pathname === '/get-stream-data') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        const storyPath = path.join(__dirname, 'data', 'story.txt');
        if (fs.existsSync(storyPath)) {
            const reader = fs.createReadStream(storyPath);
            const transformer = new UpperCaseTransform();
            reader.pipe(transformer).pipe(res);
        } else {
            res.end('Chưa có nội dung bài viết trong data/story.txt');
        }
    }

    // 5. Kích hoạt Event & Ghi Log
    else if (parsedUrl.pathname === '/event') {
        appEmitter.emit('log', `User truy cập lúc ${new Date().toISOString()}`);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h3>Đã kích hoạt Event và ghi log thành công!</h3><a href="/events">Quay lại</a>');
    }

    // 6. Stream Hình ảnh
    else if (parsedUrl.pathname === '/image') {
        const imgPath = path.join(__dirname, 'public', 'images', 'avatar.png');
        if (fs.existsSync(imgPath)) {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            fs.createReadStream(imgPath).pipe(res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Thiếu file ảnh: public/images/avatar.png');
        }
    }

    // 7. Tải file Log
    else if (parsedUrl.pathname === '/download-log') {
        const logPath = path.join(__dirname, 'data', 'log.txt');
        if (fs.existsSync(logPath)) {
            res.writeHead(200, { 
                'Content-Type': 'text/plain',
                'Content-Disposition': 'attachment; filename=log.txt' 
            });
            fs.createReadStream(logPath).pipe(res);
        } else {
            res.end('Chưa có dữ liệu log.');
        }
    }

    // Trang 404 chuẩn
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Trang không tồn tại - 404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('=========================================');
    console.log('Server Blog của Kim Anh đang hoạt động!');
    console.log('Địa chỉ: http://localhost:3000');
    console.log('=========================================');
});
