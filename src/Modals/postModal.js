const mongoose = require('mongoose');
require('dotenv').config();

// Access the DB_LINK variable
const dbLink = process.env.db_link;

mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to post DB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title is Required"],
    },
    posts: [{
        heading: {
            type: String,
        },
        subHeading: {
            type: String,
        },
        description: {
            type: String,
            require: true,
        },
        url: {
            type: String
        },
        imageTitle: {
            type: String,
        },
        imageMetaDesc: {
            type: String
        }
    }],
    link: {
        type: String,
        require: [true, "Link is required"]
    },
    category: {
        id: {
            type: String,
            require: true
        },
        label: {
            type: String,
            require: true
        },
    },
    destination: {
        id: {
            type: String,
            require: true
        },
        label: {
            type: String,
            require: true
        },
    },
    author: {
        name: {
            type: String,
            require: true
        },
        url: {
            type: String,
        }
    },
    tags: {
        type: Array,
        require: true
    },
    postedAt: {
        type: Date,
    }
});


const postModal = mongoose.model('postModal', postSchema);
module.exports = postModal;