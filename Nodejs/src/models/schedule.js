'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here (moi quan he)
            Schedule.belongsTo(models.Allcode,
                { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
            /* timeType col schedule, col allcode:->khi muốn lấy timeType sẽ map qua allcode
            ở cột keymap trả lại data ở allcode có tên timeTypeData */
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};