let students = [];
let currentId = 1;

// validate
function validateStudent(data) {
    if (!data.name || data.name.length < 2) return "Tên ≥ 2 ký tự";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return "Email không hợp lệ";

    if (students.some(s => s.email === data.email && !s.isDeleted))
        return "Email đã tồn tại";

    if (data.age < 16 || data.age > 60) return "Tuổi 16-60";

    return null;
}

// GET all (filter + sort + pagination)
exports.getAll = (req, res) => {
    let result = students.filter(s => !s.isDeleted);

    const { name, class: cls, sort, page = 1, limit = 5 } = req.query;

    if (name) result = result.filter(s => s.name.includes(name));
    if (cls) result = result.filter(s => s.class === cls);

    if (sort === "age_desc") result.sort((a, b) => b.age - a.age);
    if (sort === "age_asc") result.sort((a, b) => a.age - b.age);

    const total = result.length;

    const start = (page - 1) * limit;
    const data = result.slice(start, start + Number(limit));

    res.json({
        page: Number(page),
        limit: Number(limit),
        total,
        data
    });
};

// GET by id
exports.getById = (req, res) => {
    const student = students.find(s => s.id == req.params.id && !s.isDeleted);
    if (!student) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(student);
};

// POST
exports.create = (req, res) => {
    const error = validateStudent(req.body);
    if (error) return res.status(400).json({ message: error });

    const student = {
        id: currentId++,
        ...req.body,
        isDeleted: false
    };

    students.push(student);
    res.json(student);
};

// PUT
exports.update = (req, res) => {
    const student = students.find(s => s.id == req.params.id && !s.isDeleted);
    if (!student) return res.status(404).json({ message: "Không tìm thấy" });

    Object.assign(student, req.body);
    res.json(student);
};

// DELETE (soft delete)
exports.remove = (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.status(404).json({ message: "Không tìm thấy" });

    student.isDeleted = true;
    res.json({ message: "Đã xóa (soft delete)" });
};

// STATS
exports.stats = (req, res) => {
    const total = students.length;
    const active = students.filter(s => !s.isDeleted).length;
    const deleted = students.filter(s => s.isDeleted).length;

    const avgAge =
        students.filter(s => !s.isDeleted)
            .reduce((sum, s) => sum + s.age, 0) / (active || 1);

    res.json({
        total,
        active,
        deleted,
        averageAge: avgAge
    });
};

// STATS BY CLASS
exports.statsByClass = (req, res) => {
    const map = {};

    students
        .filter(s => !s.isDeleted)
        .forEach(s => {
            map[s.class] = (map[s.class] || 0) + 1;
        });

    const result = Object.keys(map).map(c => ({
        class: c,
        count: map[c]
    }));

    res.json(result);
};

// HEAVY SYNC
exports.heavySync = (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) sum += i;
    res.json({ message: "Sync xong" });
};

// HEAVY ASYNC
exports.heavyAsync = async (req, res) => {
    setTimeout(() => {
        res.json({ message: "Async xong" });
    }, 3000);
};
