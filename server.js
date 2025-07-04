const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/forum-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define schema and model
const postSchema = new mongoose.Schema({
    title: String,
    body: String
});
const Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Show all posts
app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ _id: -1 });
    res.render('index', { posts });
});

// Create a new post
app.post('/post', async (req, res) => {
    const { title, body } = req.body;
    if (title && body) {
        await Post.create({ title, body });
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
