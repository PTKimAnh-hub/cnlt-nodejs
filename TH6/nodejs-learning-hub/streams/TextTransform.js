const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        // Biến đổi dữ liệu sang string và in hoa 
        const upperChunk = chunk.toString().toUpperCase();
        
        // Đẩy dữ liệu đã biến đổi đi tiếp 
        this.push(upperChunk);
        
        // Hoàn thành quá trình biến đổi chunk này 
        callback();
    }
}

module.exports = UpperCaseTransform;
