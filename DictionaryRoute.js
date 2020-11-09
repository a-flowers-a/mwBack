const express = require('express');
const dictionaryRouter = express.Router();

const dictionaryController = require('./Controller/DictionaryController');

// POST
dictionaryRouter.post('/add/:idUser',dictionaryController.addWord);
dictionaryRouter.post('/edit',dictionaryController.editWord);

// GET
dictionaryRouter.get('/word-list/:idUser',dictionaryController.getAllWords);
dictionaryRouter.get('/search/:idUser/:word',dictionaryController.searchWord);

// DELETE
dictionaryRouter.delete('/delete',dictionaryController.deleteWord);

//export default dictionaryRouter;
module.exports = dictionaryRouter;