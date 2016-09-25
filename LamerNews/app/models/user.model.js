var mongoose   = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:          { type: String, required: true, unique: true },
    password:          { type: String, required: true },
    email:             { type: String, required: true, unique: true},
    registration_date: { type: Date, default: Date.now },
    comments_count:    { type: Number, default: 0 },
    articles_count:    { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
