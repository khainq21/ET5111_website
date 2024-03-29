'use strict';

//chứa các migration để tạo bảng trong cơ sở dữ liệu thông qua sequelize, ở đây là bảng handbook
//các bảng còn lại tương tự.=
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('handbooks', {


            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT
            },
            descriptionHTML: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('handbooks');
    }
};