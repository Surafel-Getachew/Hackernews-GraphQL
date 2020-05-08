const links = (parent,args,context,info) => {
    return context.prisma.user({id:parent.id}).links()
}

module.exports {
    links
}