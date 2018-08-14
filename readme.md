# Bookshelf Dump
![Build](https://travis-ci.org/Mythie/bookshelf-dump.svg?branch=master)


This bookshelf plugin allows you to drop a basic object into a `.dump()` function that will then
check if the columns exist and `set()` the data for you. The main use case for this is dumping
request.body objects into the function to then be applied to your model without running the risk of
setting an attribute that doesn't exist.

## Installation with NPM
`npm i bookshelf-dump --save`

## Example usage

#### Bookshelf.js
```js
const knex = require('knex')(require('./knexfile'));
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('bookshelf-dump');
module.exports = bookshelf;
```

#### Model.js
```js
const bookshelf = require('../bookshelf');

const Event = bookshelf.Model.extend({
  tableName: 'table_name',
  hasTimestamps: true,
});

module.exports = bookshelf.model('Event', Event);
```

#### Controller.js
```js
const Model = require('./model');

// req.body = { name: "New Name", description: "Updated" }
const update = async (req, res) => {
  try {
    // model.attributes = { name: "Name", description: "Original" }
    let model = await Model.where('name', req.params.name).fetch();
    model.dump(req.body);

    model = await model.save(); // model.attribute = { name: "New Name", description: "Updated" }

    return res.json(model);
  } catch(e) {
    return res.json({
      errors: e
    });
  }
}
```

## Testing
Testing of the plugin is seamless as it uses the mocha.js testing framework with the chai.js TDD and BDD 
assertion library.

To test the plugin simply run `npm test`