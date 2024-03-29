const Sequelize = require('sequelize');

// kết nối hệ thống với cơ sở dữ liệu

// Option 1: Passing parameters separately
const sequelize = new Sequelize('khaihocit', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to Database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;