'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    published: {
        type: Date,
        default: Date.now
    },
    keywords: Array,
    publishedStatus: Boolean,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    // Embedded sub-document
    detail: {
        modelNumber: Number,
        hardCover: Boolean,
        reviews: Number,
        rank: Number
    }
});

module.exports = mongoose.model('Book', BookSchema);