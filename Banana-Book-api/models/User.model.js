const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const debug = require('debug')('app:user-model');

const crypto = require('crypto');

//Necesito el correo, nombre, apellido, contraseña, savedPost y roles
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    hashedpassword:{
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    tokens: {
        type: [String],
        default: []
    },
    roles: {
        type: [String],
        default: []
    }
}, {timestamps: true})

userSchema.methods = {
    encryptPassword: function (password){
        if (!password) return "";

        try{
            const encryptPassword = crypto.pbkdf2Sync(
                password,
                this.salt,
                10000, 64,
                'sha512'
            ).toString('hex');

            return encryptPassword;
        }catch(error){
            debug({error});
            return "";
        }
    },
    makeSalt: function(){
        return crypto.randomBytes(16).toString('hex');
    },
    comparePassword: function(password){
        return this.encryptPassword(password) === this.hashedpassword;
    }
}

userSchema.virtual('password')
    .set(function(password = crypto.randomBytes(16).toString()){
        if (!password) return;

        this.salt = this.makeSalt();
        this.hashedpassword = this.encryptPassword(password);
    })

module.exports = Mongoose.model("User", userSchema);