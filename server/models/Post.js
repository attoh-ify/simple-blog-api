import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";


const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'posts',
    timestamps: true,
});


// Create association
User.hasMany(Post, { foreignKey: "userID" });
Post.belongsTo(User, { foreignKey: "userID" });


export default Post;
