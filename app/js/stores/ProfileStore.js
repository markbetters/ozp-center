'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = require('../actions/ProfileActions');
var libraryFetched = ProfileActions.libraryFetched;
var addedToLibrary = require('../actions/ListingActions').addedToLibrary;
var removedFromLibrary = require('../actions/ListingActions').removedFromLibrary;

var _library = [];

var ProfileStore = Reflux.createStore({

    init: function () {
        this.listenTo(libraryFetched, this.onLibraryFetched);
        this.listenTo(addedToLibrary, this.onAddedToLibrary);
        this.listenTo(removedFromLibrary, this.onRemovedFromLibrary);
    },

    onLibraryFetched: function (library) {
        _library = library;
        this.trigger();
    },

    getLibrary: function () {
        return _library;
    },

    onAddedToLibrary: function (listing) {
        _library.push({
            folder: null,
            listing: {
                id: listing.id(),
                imageLargeUrl: listing.imageLargeUrl(),
                imageMediumUrl: listing.imageMediumUrl(),
                launchUrl: listing.launchUrl(),
                title: listing.title(),
                uuid: listing.uuid()
            }
        });
        this.trigger();
    },

    onRemovedFromLibrary: function (listing) {
        var toRemove = _.find(_library, {
            listing: {
                id: listing.id()
            }
        });
        _library = _.without(_library, toRemove);
        this.trigger();
    },

    isListingInLibrary: function (uuid) {
        return !!_.find(
            _.map(_library, function (libraryEntry) {
                return libraryEntry.listing;
            }),
            { uuid: uuid }
        );
    }

});

module.exports = ProfileStore;