var mongoose   = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author:       { type: Schema.Types.ObjectId, ref: 'User' },
    article:      { type: Schema.Types.ObjectId, ref: 'Article'},
    comment_body: { type: String, required: true },
    posted_date:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
