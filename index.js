/* eslint-disable */

function isObject(val) {
  return (typeof val === 'object') && (!Array.isArray(val)) && (val !== null)
}

module.exports = (Bookshelf) => {
  // Create a reference to the Model prototype
  const ModelPrototype = Bookshelf.Model.prototype;
  Bookshelf.Model = Bookshelf.Model.extend({
    constructor() {
      ModelPrototype.constructor.call(this, arguments);
    },
    async dump(obj) {
      try {
        if(!isObject(obj)) {
          throw new Error('Item passed is not an object');
        }
        const columns = Object.keys(await Bookshelf.knex(this.tableName).columnInfo());
        Object.keys(obj).forEach((key) => {
          // If the column exists
          if(columns.indexOf(key) !== -1) {
            this.set(key, obj[key]);
          }
        });

        return this;
      } catch (err) {
        // Catch it just to throw it again?
        throw err;
      }
    }
  });
};

/* eslint-enable */
