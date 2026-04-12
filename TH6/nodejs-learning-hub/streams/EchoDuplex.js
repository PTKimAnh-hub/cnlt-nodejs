const { Duplex } = require('stream');

class EchoDuplex extends Duplex {
    constructor(options) {
        super(options);
        this.data = [];
    }

    _write(chunk, encoding, callback) {
        // Nhận dữ liệu và đẩy ngược lại vào hàng đợi đọc ngay lập tức
        this.push(chunk); 
        callback();
    }

    _read(size) {
        // Không cần làm gì ở đây vì dữ liệu đã được đẩy đi từ _write
    }
}

module.exports = EchoDuplex;
