const parse = require("url-parse");

const querySort = (sort) => {
  if (!sort) {
    return [];
  }

  const sortParse = parse(sort, true).href;

  return sortParse.split(",").map((item) => {
    const [field, order] =
      item.charAt(0) === "-" ? [item.substring(1), "DESC"] : [item, "ASC"];
    return [field, order];
  });
};

module.exports = querySort;
