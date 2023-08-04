


Item.search = async function(query) {
  return this.findAll({
    where: {
      // Search the name and description fields (adjust as needed)
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ]
    }
  });
}
