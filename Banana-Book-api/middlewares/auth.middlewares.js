const { verifyToken } = require('../utils/jwt.tools');
const debug = require('debug')('app:auth-middleware');
const User = require('../models/User.model');

const ROLES = require('./../data/roles.constant.json');

const middlewares = {};
const tokenPrefix = 'Bearer';

middlewares.authentication = async (req, res, next) => {
    try {
        //verify that authorization header is present
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "No autorizado" });
        }
        //verify that is a valid token
        const [prefix, token] = authorization.split(' ');

        if (prefix !== tokenPrefix) {
            return res.status(401).json({ error: "No autorizado" });
        }

        if(!token) {
            return res.status(401).json({ error: "No autorizado" });
        }

        const tokenObject = verifyToken(token);

        if (!tokenObject) {
            return res.status(401).json({ error: "No autorizado" });
        }

        const { userID } = tokenObject;
        debug(userID)

        //get the user
        const user = await User.findById(userID);   

        if (!user) {
            return res.status(401).json({ error: "No autorizado" });
        }
        //verify that the token is registered 

        const isTokenValid = user.tokens.includes(token);
        
        if (!isTokenValid) {
            return res.status(401).json({ error: "No autorizado" });
        }

        //modify the request to get the user information
        
        req.user = user;
        req.token = token;
        
        //call next
        next();
    }catch (error){
        debug(error);
        return res.status(500).json({error: 'Error inesperado en el servidor'});
    }
};

middlewares.authorization = (roleRequerido=ROLES.SYSADMIN) => {
    return (req, res, next) => {
        try{
            const { roles=[] } = req.user;
    
            const roleIndex = roles.findIndex(role => (role === roleRequerido || role === ROLES.SYSADMIN));
    
            if (roleIndex < 0) {
                return res.status(403).json({ error: "No tienes permisos" });
            }
    
            next();
        } catch (error) {
            debug(error);
            return res.status(500).json({error: 'Error inesperado en el servidor'});
        }
    };
};

module.exports = middlewares;