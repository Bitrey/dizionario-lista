var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parolaItaSchema = new Schema({
    parola: String,
    significato: String
});

var ParolaIta = mongoose.model("parolaIta", parolaItaSchema);

module.exports = ParolaIta;