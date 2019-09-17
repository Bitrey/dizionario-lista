var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parolaSchema = new Schema({
    parola: String,
    significato: String
});

var Parola = mongoose.model("parola", parolaSchema);

module.exports = Parola;