'use strict';

var Reflux = require('reflux');
var ProfileApi = require('../webapi/Profile').ProfileApi;

var Actions = Reflux.createActions([
    'fetchLibrary', 'libraryFetched',
    'fetchSelf', 'selfFetched'
]);

Actions.fetchLibrary.listen(function () {
    ProfileApi.getLibrary().then(Actions.libraryFetched);
});

Actions.fetchSelf.listen(function() {
    ProfileApi.getSelf().then(Actions.selfFetched);
});


module.exports = Actions;