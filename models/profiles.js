/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');

const mysql = require('../libs/sequelize');

const schema = {
    name: {
        type: Sequelize.STRING(16)
    },
    sex: {
        type: Sequelize.ENUM,
        values: ['未知', '男', '女']
    },
    school_id: {
        type: Sequelize.INTEGER(11)
    },
    description: {
        type: Sequelize.STRING(128)
    }
};

const options = {
    underscored: true
};

const Profile = mysql.define('profile', schema, options);

const User = require('./users');

Profile.belongsTo(User, {
    foreignKey: 'student_id'
});

Profile.sync().then();

module.exports = Profile;