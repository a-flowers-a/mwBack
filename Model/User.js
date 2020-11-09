const sequelize = require('sequelize');
const db = require ('../dbConfig');
const Word = require('../Model/Word');

const User = db.define('User',{
    idUser:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    passw: {
        type: sequelize.STRING
    }/*,
    image: {
        type: sequelize.BLOB
    }*/
});

User.hasMany(Word,
    {
        foreignKey: {
            name:'idUser',
            allowNull: false
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }
);

Word.belongsTo(User,
    {
        foreignKey: {
            name:'idUser',
            allowNull: false
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }
);

module.exports = User;