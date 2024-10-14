import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Post from "./Post.js";
import User from "./User.js";


const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'comments',
    timestamps: true,
});


// Create association
Post.hasMany(Comment, { foreignKey: "postID" });
Comment.belongsTo(Post, { foreignKey: "postID" });

User.hasMany(Comment, { foreignKey: "userID" });
Comment.belongsTo(User, { foreignKey: "userID" });


export default Comment;
