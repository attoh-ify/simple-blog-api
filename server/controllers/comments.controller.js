import Comment from "../models/Comment.js";
import Post from "../models/Post.js";


export const getComments = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.postSlug
            }
        });

        if (!post) {return res.status(400).json({ message: "Post not found" })};

        const postID = post.id;

        const comments = await Comment.findAll({
            where: {
                postID: postID
            }
        });

        return res.status(200).json({ comments: comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get all comments" });
    }
};


export const addComment = async (req, res) => {
    const { comment } = req.body;
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.postSlug
            }
        });
        if (!post) {return res.status(400).json({ message: "Post not found" })};

        const postID = post.id;

        const newComment = await Comment.create({
            comment: comment,
            userID: req.userID,
            postID: postID,
        });

        return res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add comment" });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.postSlug
            }
        });

        if (req.userID !== post.userID) {
            return res.status(401).json({ message: "This post belongs to another user" });
        };

        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.commentID
            }
        });

        // Check if the comment exists and was deleted
        if (deletedComment) {
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Comment not found' });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete comment" });
    }
};
