const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {getUserId,APP_SECRET} = require("../utils/utils");

const signup = async (parent,args,context,info) => {
    const hashedPassword = await bcrypt.hash(args.password,10);
    const {password, ...user} = await context.prisma.createUser({...args,password:hashedPassword})
    const token = jwt.sign({userId:user.id},APP_SECRET)
    return {
        token,
        user
    }
}

const login = async(parent,args,context,info) => {
    const {password,...user} = await context.prisma.user({email:args.email});
    if(!user) {
        throw new Error ("no such user found")
    }
    const valid = await bcrypt.compare(args.password,password)
    if(!valid){
        throw new Error ("Invalid password")
    }
    const token = jwt.sign({userId:user.id},APP_SECRET)
    return {
        token,
        user
    }
}

const post = (parent,args,context,info) => {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url:args.url,
        description:args.description,
        postedBy:{connect: {id:userId}}
    })
}

module.exports = {
    login,
    signup,
    post
}