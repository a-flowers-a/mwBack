const sequelize = require('sequelize');
const db = require ('../dbConfig');

const Word = db.define('Word',{
    idWord:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    wordType:{
        /*v-s-a */
        type: sequelize.CHAR
    },
    wordName: {
        type: sequelize.STRING
    },
    partizipII: {
        type: sequelize.STRING
    },
    genre: {
        type: sequelize.CHAR
    },
    plural: {
        type: sequelize.STRING
    },
    wordDescript: {
        type: sequelize.STRING
    }
});


module.exports = Word;