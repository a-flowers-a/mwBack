const db = require('../dbConfig');
const User = require('../Model/User');
const userController = {};

db.sync({force:false});

userController.signUp = async(req, res) =>{
    const recName = req.body.name;
    const recEmail = req.body.email;
    const recPass = req.body.passw;

    User.findOrCreate({
        where: { email:  recEmail},
        defaults: {
            name: recName,
            email: recEmail,
            passw: recPass
        }
      }).then(([insertedU, created]) => {
            //console.log("inserted user", insertedU);
            let mess = "";
            if(created)
                mess = "Richtig angemeldet, willkomen zu Meinwörterbuch!";
            else
                mess = "Benutzername existiert schon!";
            res.json({data: {name: insertedU.name, idUser: insertedU.idUser},
                        message:mess,
                        success: true,
                        exist: !created
                    });
    }).catch(err => {
        console.log(err);
        res.json({message: err, success: false});
    });

}//signUp

userController.logIn = async(req,res) =>{
    const recEmail = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: recEmail,
        }
    }).then(foundUser => {
        if(foundUser == null)
            res.json({message: "Gibt es diesen Benutzername nicht", success: true});
        else if(foundUser.dataValues.passw != password)
            res.json({message: "Falschen Daten", success: true});
        else
            res.json({data: {idUser:foundUser.dataValues.idUser, name:foundUser.dataValues.name}, success: true});
    }).catch(err =>{
        //console.log("err looking for User");
        //console.log(err);
        res.json({message: err, success: false});
    });
}//logIn

module.exports = userController;