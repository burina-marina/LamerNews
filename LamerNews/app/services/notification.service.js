'use strict';

var notification = {

    serverErr: function (res) {
        res.status(500).send({status: '500', message: "Server error!"});
    },

    notFound: function (res) {
        res.status(404).send({status: '404', message: "Not found"})
    },

    accessErr: function (res) {
        return res.status(403).send({status: '403', message: "You haven't access!"});
    },

    goodRequest: function (res) {
        return res.status(200).send({status: '200', message: 'successful'})
    }

};

module.exports = notification;

