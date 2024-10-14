import Post from "../models/Post.js";
import Category from "../models/Category.js"
import User from "../models/User.js"


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();

        return res.status(200).json({ posts: posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get all posts" });
    };
};


export const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            }
        });

        return res.status(200).json({ post: post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get post" });
    }
};


export const getPostBy = async (req, res) => {
    const { author, category, title } = req.body;
    
    try {
        const whereclause = {};

        if (author) {
            const author_ = await User.findOne({
                where: {
                    username: author
                }
            });
            if (!author_) {return res.status(400).json({ message: "User does not exist." })};

            whereclause.userID = author_.id;
        }

        if (category) {
            const category_ = await Category.findOne({
                where: {
                    name: category
                }
            });
            if (!category_) {return res.status(400).json({ message: "Category does not exist." })};

            whereclause.category = category;
        }

        if (title) {
            whereclause.title = title;
        };

        const post = await Post.findAll({
            where: whereclause
        });

        return res.status(200).json({ post: post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get post" });
    }
};


export const createPost = async (req, res) => {
    const { title, content, slug, category } = req.body;
    try {
        const categories = await Category.findAll({
            attributes: ['name']
        });
        const plainCategories = categories.map(category => category.name);

        if (!plainCategories.includes(category)) {return res.status(400).json({ message: plainCategories })};

        const newPost = await Post.create({
            title: title,
            content: content,
            slug: slug,
            userID: req.userID,
            category: category,
        });

        return res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create post" });
    }
};


export const editPost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            }
        });

        if (req.userID !== post.userID) {
            return res.status(401).json({ message: "This post belongs to another user" });
        };

        const [updatePost] = await Post.update(req.body, {
            where: {
                slug: req.params.slug
            }
        });

        return res.status(200).json({ post: post, message: "Post updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to edit post" });
    }
};


export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                slug: req.params.slug
            }
        });

        // Check if the post exists and was deleted
        if (deletedPost) {
            return res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Post not found' });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete post" });
    }
};
