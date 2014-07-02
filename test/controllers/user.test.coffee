expect = require('chai').expect
sinon = require('sinon')
underscore = require('underscore')
require('../../app/models/user')
mongoose = require('mongoose')
User = mongoose.model('User')
controller = require('../../app/controllers/user')

request = null
response = null
next = null

beforeEach (done) ->
  request =
    i18n: { t: (s) -> }
    flash: (s) ->
    logout: ->
    user: {}
    body: {}
  response =
    render: (path, data) ->
    redirect: (path) ->
  next = sinon.spy()
  done();

xdescribe 'user page controller', ->
  
  it 'has a method passport which does not do anything', (done) ->
    sinon.spy(response, 'render')
    sinon.spy(response, 'redirect')
    controller.passport(request, response)
    expect(response.render.called).to.be.false
    expect(response.redirect.called).to.be.false
    done()
  
  it 'has a method session which redirects to the "/" view', (done) ->
    sinon.spy(response, 'redirect')
    controller.session(request, response, next)
    expect(response.redirect.calledOnce).to.be.true
    expect(response.redirect.calledWith('/')).to.be.true
    done()

  it 'has a method authCallback which redirects to the "/"" view', (done) ->
    sinon.spy(response, 'redirect')
    controller.authCallback(request, response, next)
    expect(response.redirect.calledOnce).to.be.true
    expect(response.redirect.calledWith('/')).to.be.true
    done()

  it 'has a method login which renders the "user/login" view', (done) ->
    t = sinon.spy(request.i18n, 't')
    sinon.spy(request, 'flash')
    sinon.spy(response, 'render')
    controller.login(request, response, next)
    expect(request.i18n.t.calledOnce).to.be.true
    expect(request.i18n.t.calledWith('user.login')).to.be.true
    expect(request.flash.calledOnce).to.be.true
    expect(request.flash.calledWith('error')).to.be.true
    expect(response.render.calledOnce).to.be.true
    expect(response.render.calledWith('user/login', sinon.match.object)).to.be.true
    done()

  it 'has a method logout which redirects to the "/login" view', (done) ->
    sinon.spy(request, 'logout')
    sinon.spy(response, 'redirect')
    controller.logout(request, response)
    expect(request.logout.calledOnce).to.be.true
    expect(response.redirect.calledOnce).to.be.true
    expect(response.redirect.calledWith('/login')).to.be.true
    done()
  
  it 'has a method signup which renders the "user/signup" view', (done) ->
    sinon.spy(request.i18n, 't')
    sinon.spy(response, 'render')
    controller.signup(request, response)
    expect(request.i18n.t.calledOnce).to.be.true
    expect(request.i18n.t.calledWith('user.signup')).to.be.true
    expect(response.render.calledOnce).to.be.true
    expect(response.render.calledWith('user/signup', sinon.match.object)).to.be.true
    done()
  
  it 'has a method create which renders the "user/signup" view if it cannot create a user', (done) ->
    sinon.stub(User, 'create').returns({ save: (callback) -> callback('err') })
    sinon.spy(response, 'render')
    controller.create(request, response, next)
    expect(response.render.calledOnce).to.be.true
    expect(response.render.calledWith('user/signup', sinon.match.object)).to.be.true
    User.create.restore()
    done()
  
  it 'has a method create which logs in after successfully creating a user and redirects to the "/" page', (done) ->
    request.logIn = (user, callback) ->
      callback()
    sinon.stub(User, 'create').returns({ save: (callback) -> callback() })
    sinon.spy(request, 'logIn')
    sinon.spy(response, 'redirect')
    controller.create(request, response, next)
    expect(request.logIn.calledOnce).to.be.true
    expect(request.logIn.calledWith(sinon.match.object, sinon.match.func)).to.be.true
    expect(response.redirect.calledOnce).to.be.true
    expect(response.redirect.calledWith('/')).to.be.true
    User.create.restore()
    done()
  
  it 'has a method create which tries to log in after successfully creating a user and calls next if the login fails', (done) ->
    request.logIn = (user, callback) ->
      callback('err')
    sinon.stub(User, 'create').returns({ save: (callback) -> callback() })
    sinon.spy(request, 'logIn')
    sinon.spy(next)
    controller.create(request, response, next)
    expect(request.logIn.calledOnce).to.be.true
    expect(request.logIn.calledWith(sinon.match.object, sinon.match.func)).to.be.true
    expect(next.calledOnce).to.be.true
    expect(next.calledWith('err')).to.be.true
    User.create.restore()
    done()
  
  it 'has a method edit which renders the "user/edit" view to edit the currently logged in user', (done) ->
    sinon.spy(response, 'render')
    controller.edit(request, response)
    expect(response.render.calledOnce).to.be.true
    expect(response.render.calledWith('user/edit', { user: {}, stringify: JSON.stringify })).to.be.true
    done()

  it 'has a method update which renders the "user/edit" view if the user could not be updated', (done) ->
    request.user.save = (callback) ->
      callback('err', 'doc')
    sinon.spy(underscore, 'extend')
    sinon.spy(request.user, 'save')
    sinon.spy(response, 'render')
    controller.update(request, response)
    expect(underscore.extend.calledOnce).to.be.true;
    expect(underscore.extend.calledWith(request.user, request.body))
    expect(request.user.save.calledOnce).to.be.true;
    expect(response.render.calledOnce).to.be.true
    expect(response.render.calledWith('user/edit')).to.be.true
    underscore.extend.restore()
    done();

  it 'has a method update which redirects to the "/" page if the user could be updated', (done) ->
    request.user.save = (callback) ->
      callback(null, 'doc')
    sinon.spy(underscore, 'extend')
    sinon.spy(request.user, 'save')
    sinon.spy(response, 'redirect')
    controller.update(request, response)
    expect(underscore.extend.calledOnce).to.be.true;
    expect(underscore.extend.calledWith(request.user, request.body))
    expect(request.user.save.calledOnce).to.be.true;
    expect(response.redirect.calledOnce).to.be.true
    expect(response.redirect.calledWith('/')).to.be.true
    underscore.extend.restore()
    done();
  