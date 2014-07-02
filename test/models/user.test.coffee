expect = require('chai').expect
mongoose = require('mongoose')
crypto = require('crypto')
require('../../app/models/user')
User = mongoose.model('User')

describe 'User Model', ->

  disconnect = false;
  userDataOne = { name:"Test1", email:"test1@test.com", provider:"local", password:"pwd" };
  userDataTwo = { name:"Test2", email:"test2@test.com", provider:"local", password:"pwd" };
  userOne = null

  beforeEach (done) ->
    if (mongoose.connection.readyState == 0)
      mongoose.connect('mongodb://localhost/user_test');
      disconnect = true;
    userOne = new User(userDataOne)
    userOne.save((err) ->
      if (err)
        throw err
      done()
      )

  afterEach (done) ->
    userOne.remove((err) ->
      if (err)
        throw err
      done()
      )
    if (disconnect)
      mongoose.disconnect();

  it 'can create a new User object with a constructor', (done) ->
    user = new User(userDataTwo)
    expect(user.get('name')).to.equal('Test2')
    expect(user.get('email')).to.equal('test2@test.com')
    expect(user.get('provider')).to.equal('local')
    expect(user.get('hashed_password') && user.get('hashed_password')).to.not.equal('pwd')
    expect(user.get('salt')).not.to.be.null;
    expect(user.get('_id')).not.to.be.null;
    done()

  it 'has a method `makeSalt` to generate a password salt', (done) ->
    salt = userOne.makeSalt()
    expect(salt).not.to.be.null
    expect(salt.length).to.be.above(0)
    done()

  it 'has a method `encryptPassword` that will encrypt a value with salt', (done) ->
    userOne.set('salt', 1234567890)
    encryptedPassword = userOne.encryptPassword('pwd')
    expect(encryptedPassword).to.equal('9c6b54dea59db6a67b90358a383b5a5a058ef081')
    done()

  it 'has a method `authenticate` that will return true if it can validate a password', (done) ->
    expect(userOne.authenticate('pwd')).not.to.be.null
    done()

  it 'has a virtual `password` member that will generate a salt and encrypt the password', (done) ->
    user = new User({ name: 'Test3', email: 'test3@test.com' })
    expect(user.get('hashed_password')).not.to.exist
    expect(user.get('salt')).not.to.exist
    user.set('password', 'pwd')
    expect(user.get('hashed_password')).to.exist
    expect(user.get('salt')).to.exist
    done()

  it 'has a name validator that will return an error if the name is blank', (done) ->
    user = new User({ name: "", email: "test3@test.com", password: "pwd", provider: "local" })
    user.save((err, user) ->
      expect(err).to.exist
      done()
      )

  it 'has a name validator that will return an error if the name is null', (done) ->
    user = new User({ name: null, email: "test3@test.com", password: "pwd", provider: "local" })
    user.save((err, user) ->
      expect(err).to.exist
      done()
      )

  it 'has an email validator that will return an error if the name is blank', (done) ->
    user = new User({ name: "Test3", email: "", password: "pwd", provider: "local" })
    user.save((err, user) ->
      expect(err).to.exist
      done()
      )

  it 'has an email validator that will return an error if the name is null', (done) ->
    user = new User({ name: "Test3", email: null, password: "pwd", provider: "local" })
    user.save((err, user) ->
      expect(err).to.exist
      done()
      )

  it 'can save a user in the database', (done) ->
    user = new User(userDataTwo)
    user.save((err, user) ->
      if (err)
        throw err
      user.remove((err) ->
        if (err)
          throw err
        )
      done()
    )

  it 'will throw an error if trying to save with no password', (done) ->
    user = new User({ name: "Test3", email: "test3@test.com" })
    expect(user.save).to.throw(Error)
    done()

  it 'will throw an error if trying to save with no email when the provider is local', (done) ->
    user = new User({ name: "Test3", password: "pwd", provider: "local" })
    expect(user.save).to.throw(Error)
    done()
  
  it 'can retrieve a user from the database by id',(done) ->
    id = userOne.get('_id')
    User.findById(id, (err, user) ->
      if (err)
        throw err
      expect(user).to.exist
      expect(user.get('name')).to.equal('Test1')
      expect(user.get('email')).to.equal('test1@test.com')
      done()
    )
