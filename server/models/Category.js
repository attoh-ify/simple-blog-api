import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'categories',
      timestamps: true,
});

export default Category;
