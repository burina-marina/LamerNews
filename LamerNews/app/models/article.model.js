var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ArticleSchema = new Schema({
    title:          { type: String, required: true },
    link:           { type: String, required: true },
    author:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
    posted_date:    { type: Date, default: Date.now },
    comments_count: { type: Number, default: 0 },
    rating:         { type: Number, default: 0 },
    votes:          [ { type: Schema.Types.ObjectId, ref: 'User'} ]
});

module.exports = mongoose.model('Article', ArticleSchema);
