const jwt = require("jsonwebtoken");
const APP_SECRETE = "graphqlisthething";

const getUserId = (context) => {
    const Authorization = context.request.get("Authorization");
    if(Authorization){
        const token = Authorization.replace("Bearer","");
        const {userId} = jwt.verify(token,APP_SECRETE);
        return userId;
    }
    throw new Error ("Not Authorized");
}

module.exports = {
    APP_SECRETE,
    getUserId
}