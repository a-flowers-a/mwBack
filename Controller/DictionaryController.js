const db = require('../dbConfig');
const Word = require ('../Model/Word');
var _ = require('lodash');
const dictionaryController = {};

db.sync({force:false});

dictionaryController.addWord = async(req, res) => {
    //passed parameter
    const recIdUser = req.params.idUser;
    let wName = "";
    if(req.body.wordType === 's')
        wName = _.capitalize(req.body.wordName);
    else
        wName = req.body.wordName;
    
    //returns promise <Model>
    /*This findOrCreate takes much more time than just creating*/
    Word.findOrCreate({
        where: { wordName:  wName,
                idUser: recIdUser
        },
        defaults: {
            idUser: recIdUser,
            wordType: req.body.wordType,
            partizipII: req.body.partizipII,
            genre: req.body.genre,
            plural: req.body.plural,
            wordDescript: req.body.wordDescript
        }
      }).then(([insertedW, created]) => {
        let mess = "";
        if(created)
            mess = "richtig eingefügt";
        else
            mess = "existiert schon";
        res.json({data: insertedW, message:mess, success: true, exist: !created});
    }).catch(err => {
        console.log(err);
        res.json({message: err, success: false});
    });
    /*
    const word = {
        idUser: recIdUser, 
        wordType: req.body.wordType,
        wordName: wName,
        partizipII: req.body.partizipII,
        genre: req.body.genre,
        plural: req.body.plural,
        wordDescript: req.body.wordDescript
    };
    Word.create(word).then(insertedW => {
        console.log("successfully inserted");
        res.json({data: insertedW, message:"richtig eingefügt", success: true});
    }).catch(err => {
        console.log("err creating");
        res.json({message: err, success: false});
    })*/
}//addWord

dictionaryController.editWord = async(req, res) =>{
    let wName = "";
    const recIdWord = req.body.idWord;
    if(req.body.wordType === 's')
        wName = _.capitalize(req.body.wordName);
    else
        wName = req.body.wordName;
    const word = {
        idUser: req.body.idUser, 
        wordType: req.body.wordType,
        wordName: wName,
        partizipII: req.body.partizipII,
        genre: req.body.genre,
        plural: req.body.plural,
        wordDescript: req.body.wordDescript
    };
    await Word.update(word, { 
        where : {
            idWord: recIdWord,
        }
    })
    .then(()=>{
        res.json({data: word, message:"richtig bearbeitet", success: true});
    })
    .catch(err=>{
        console.log(err);
        console.log("sending errro");
        res.json({success:false, message:err});
    })

}//editWord

dictionaryController.getAllWords = async(req, res) =>{
    //passed parameter
    const recIdUser = req.params.idUser;
    //console.log("params "+recIdUser);
    Word.findAll({
        where: {idUser: recIdUser}
    }).then(foundWords =>{
        console.log("found");
        //console.log(foundWords);
        res.json({data: foundWords, success: true});
    }).catch(err => {
        console.log("err looking for al words");
        console.log(err);
        res.json({message: err, success: false});
    });
}//getAllWords

dictionaryController.searchWord = async(req, res) =>{
    //passed parameter
    const recIdUser = req.params.idUser;
    const word = req.params.word;
    console.log("param1 "+recIdUser);
    console.log("param2 "+word);
    Word.findOne({
        where: {
            idUser: recIdUser,
            wordName: word
        }
    }).then(foundWord =>{
        console.log("found in SearchWOrd");
        //console.log(foundWord);
        res.json({data: foundWord, success: true});
    }).catch(err => {
        console.log("err looking for al words");
        res.json({message: err, success: false});
    });
}//searchWord

dictionaryController.deleteWord = async(req, res) =>{
    const recIdUser = req.body.idUser; //ACTUALLY NOT NEEDED
    const recIdWord = req.body.idWord;
    await Word.destroy({ 
        where : {
            idWord: recIdWord,
            idUser: recIdUser
        }
    })
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        console.log("sending errro");
        res.json({success:false, message:err});
    })
}//getAllWords

module.exports = dictionaryController;