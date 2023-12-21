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

        const destinationQuery = req.query.destination || '';
        const categoryQuery = req.query.category || '';
        const searchQuery = req.query.search || '';
        const regex = new RegExp(searchQuery, "i");

        let posts = destinationQuery ?
            await postModal.find({ 'destination.id': destinationQuery }).skip(startIndex).limit(limit).select("author category destination intro link postedAt tags title _id")
            : categoryQuery ?
                await postModal.find({ 'category.id': categoryQuery }).skip(startIndex).limit(limit).select("author category destination intro link postedAt tags title _id")
                : searchQuery ?
                    await postModal.find({ title: { $regex: regex } }).skip(startIndex).limit(limit).select("author category destination intro link postedAt tags title _id")
                    :
                    await postModal.find().skip(startIndex).limit(limit).select("author category destination intro link postedAt tags title _id");


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

module.exports.getPost = async function
    getPost(req, res) {
    try {
        let link = req.query.link; // Access the 'link' parameter from req.query
        if (!link) {
            return res.status(400).json({ message: "Link parameter is missing" });
        }

        let post = await postModal.findOne({ link: link });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getPopularPosts = async function
    getPopularPosts(req, res) {
    try {
        const page = 1;
        const limit = 4;

        const startIndex = (page - 1) * limit;

        let posts = await postModal.find().skip(startIndex).limit(limit).select("author category link postedAt title _id");

        if (posts && posts.length > 0) {
            res.json(posts);
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