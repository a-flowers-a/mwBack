const express = require('express');
const usersRoute = express.Router();

const userController = require('./Controller/userController');

// POST
usersRoute.post('/log-in',userController.logIn);
usersRoute.post('/sign-up',userController.signUp);
//usersRoute.post('/edit',userController.editWord);

// GET
//usersRoute.get('/search/:idUser/:word',userController.searchWord);

// DELETE
//usersRoute.delete('/delete',userController.deleteWord);

//export default usersRoute;
module.exports = usersRoute;