const postedBy = (parent,args,context,info) => {
    return context.prisma.link({id:parent.id}).postedBy();
}

module.exports = {
    postedBy
}