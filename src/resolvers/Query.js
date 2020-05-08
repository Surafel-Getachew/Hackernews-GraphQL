const feed = (parent, args, context, ingo) => {
  return context.prisma.links();
};

module.exports = {
    feed,
}
