const User = require('../models/User.model');
const debug = require('debug')('app:auth-controller');
const ROLES = require('../data/roles.constant.json');

const { createToken, verifyToken } = require('../utils/jwt.tools');

const controller = {};

controller.register = async (req, res) => {
    try{
        //get the data from the request in the body
        const {email, name, lastName, password} = req.body;

        //verify if the user already exists
        const user = await User.findOne({$or: [{email : email}]});

        if(user){
            return res.status(409).json({
                message: "El email ya está registrado"
            });
        } 
        //Encrypt the password 

        //save the user

        const newUser = new User({
            email: email,
            name: name,
            lastName: lastName,
            password: password,
            roles: [ROLES.USER]
        });

        await newUser.save();

        return res.status(201).json({message: 'Usuario creado correctamente'});
    }catch(error){
        debug({error});
        return res.status(500).json({error: 'No se ha podido registrar el usuario, debido a un error inesperado.'});
    }
};

controller.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        //verify if the user exists
        const user = await User.findOne({$or: [{email : email}]});

        if(!user){ 
            return res.status(404).json({message: 'El usuario no existe'});
        }

        //compare the password
        if (!user.comparePassword(password)){
            return res.status(401).json({error: 'la contraseña no coincide'});
        }
        // log the user
        
        const token = createToken(user._id);
        user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0,4)];

        await user.save();

        //register the token in the user
        return res.status(200).json({token: token});
    } catch (error) {
        debug({error});
        return res.status(500).json({error: 'No se ha podido iniciar sesión, debido a un error inesperado.'});
    }
};

module.exports = controller;