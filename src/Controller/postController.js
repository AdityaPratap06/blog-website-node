const postModal = require("../Modals/postModal");

module.exports.addNewPost = async function
    addNewPost(req, res) {
    let dataObj = req.body;
    let post = await postModal.create(dataObj);
    res.json({
        message: 'Post Added SuccessFully',
        data: post
    });
}

module.exports.getAllPosts = async function
    getAllPosts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const totalPosts = await postModal.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let posts = await postModal.find().skip(startIndex).limit(limit);

        if (posts && posts.length > 0) {
            const hasNextPage = endIndex < totalPosts;
            const hasPreviousPage = page > 1;

            res.json({
                data: posts,
                page: page,
                limit: limit,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage
            });
        } else {
            res.json({
                message: "No posts found"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}