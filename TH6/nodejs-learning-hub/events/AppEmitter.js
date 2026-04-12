const EventEmitter = require('events');
const fs = require('fs'); // Đưa ra ngoài cho chuyên nghiệp

class AppEmitter extends EventEmitter {}
const appEmitter = new AppEmitter();

// 1. Lắng nghe sự kiện ghi log (on) [cite: 20, 23]
appEmitter.on('log', (message) => {
    const logMsg = `${new Date().toISOString()} - ${message}\n`;
    // Ghi log vào file theo yêu cầu [cite: 23, 65]
    fs.appendFileSync('./data/log.txt', logMsg); 
    console.log('[EVENT LOG]: ' + message);
});

// 2. Minh họa sự kiện chạy 1 lần (once) và truyền dữ liệu kèm callback [cite: 20, 21, 22]
appEmitter.once('init', (msg, callback) => {
    console.log('Hệ thống khởi tạo: ' + msg);
    if (typeof callback === 'function') {
        callback('Đã phản hồi từ callback thành công!');
    }
});

// 3. Xuất appEmitter ra ngoài (Phải để ở cuối file) [cite: 71]
module.exports = appEmitter;
