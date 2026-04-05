const BlogPost = require('../models/BlogPost');

const removeVietnameseTones = (str) => {
    return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};

exports.getAllPosts = async (req, res) => {
    let keyword = req.query.keyword || "";

    let queryObj = {};

    if (keyword) {
        const keywordNoAccent = removeVietnameseTones(keyword);

        queryObj = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { body: { $regex: keyword, $options: 'i' } }
            ]
        };
    }

    const posts = await BlogPost.find(queryObj).sort({ createdAt: -1 });

    res.render('index', {
        posts,
        query: req.query
    });
};

// Form thêm
exports.getCreatePost = (req, res) => {
    res.render('create');
};

// Thêm bài viết
exports.createPost = async (req, res) => {
    await BlogPost.create(req.body);
    res.redirect('/?success=created');
};

// Chi tiết
exports.getPostDetail = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
};

// Form sửa
exports.getEditPost = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
};

// Update
exports.updatePost = async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/?success=updated');
};

// Xóa
exports.deletePost = async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/?success=deleted');
};


