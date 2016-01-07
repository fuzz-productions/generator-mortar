var MortarJS           = require('../bootstrap').MortarJS;

var assign             = require('react/lib/Object.assign');
var ModelStore         = MortarJS.Stores.ModelStore;
var AppDispatcher      = MortarJS.Dispatcher;

var AppActionConstants = require('../constants/AppActionConstants');
var ActionTypes        = AppActionConstants.ActionTypes.users;

/**
 * Data stores
 * @type {Array}
 * @private
 */
// Store for user table data
var _resourceListData = [];
var _user = {};

/**
 * User store logic
 *
 * @type {*|exports}
 */
var UsersResourceStore = assign({}, ModelStore, {
	getResourceListData: function () {
		return [
			{},
			{},
			{}
		]
	},


	getResourceById: function (id) {
		// http://stackoverflow.com/questions/12553274/getting-index-of-an-arrays-element-based-on-its-properties
		var index = _resourceListData.map(function(item) {
			return item.id
		}).indexOf(Number(id));

		return _resourceListData[index];
	},

	getUser: function () {
		return _user;
	}
});

/**
 * Event Listeners
 */
UsersResourceStore.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {
		case 'USERS_LISTED':
			_resourceListData = action.data;

			UsersResourceStore.emitChange();
			break;

		case 'USERS_RECEIVED':
			_user = action.data;

			UsersResourceStore.emitChange();
			break;

		case 'USERS_UPDATED':
			UsersResourceStore.emitChange();
			break;

		case 'USERS_CREATED':
			_user = action.data;
			UsersResourceStore.emitChange();
			break;
	}
});

module.exports = UsersResourceStore;
