const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Require knex and bookshelf for testing purposes.
const config = require('../knexfile');
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
// Require and Load the bookshelf default attributes plugin
const plugin = require('../index');
bookshelf.plugin(plugin);

describe('bookshelf-dump', function() {
  var TestModel;
  before(function() {
    TestModel = bookshelf.Model.extend({
      tableName: 'users',
      // parse: true
    });
  });

  beforeEach(async function() {
    return knex.migrate.latest();
  });

  afterEach(async function() {
    return knex.migrate.rollback();
  });

  after(async function() {
    return knex.destroy();
  });

  it('it should only get the attributes of an object that exist as a column', async function() {
    const user = new TestModel();
    await user.dump({
      invalid: 'something',
      username: 'Steven',
      age: 14,
      premium: false
    });

    await user.save();

    expect(user.get('invalid')).to.be.undefined;
    user.get('username').should.equal('Steven');
  });

  it('it should error if an object isn\'t passed to it', async function() {
    const user = new TestModel();

    await user.dump(['this', 'isnt', 'valid']).should.be.rejected;
    await user.dump(null).should.be.rejected;
    await user.dump('Something').should.be.rejected;
    await user.dump(function() {}).should.be.rejected;
    await user.dump({ one: 'one', two: 'two'}).should.be.fulfilled;
  });

  it.skip('it should only allow properties of the columns type to be set', function() {

  });
});
