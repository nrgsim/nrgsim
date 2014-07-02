
app = require('../../server')
assert = require('assert');


#module.exports =
#  'GET /': ->
#    assert.response app, { url: "/home" }, { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" }}, (res) ->
#      assert.includes(res.body, '<title>Express</title>')


#describe 'contact page', ->
 # before (done) ->
#    this.server = http.createServer(app).listen(3000)
#    done()

#  it 'should show contact a form'
#  it 'should refuse empty submissions'
  # ...

 # after (done) ->
  #  this.server.close(done)
