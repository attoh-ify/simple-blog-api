import Sequelize from 'sequelize';

const sequelize = new Sequelize('simpleBlogDB', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully!');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    };
})();

export default sequelize;
