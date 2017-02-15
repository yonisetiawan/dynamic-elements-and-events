const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todosSchema = new Schema({
  title: String,
  description: String,
  status: String
},{
  timestamps: true
})

var Todos = mongoose.model('Todos',todosSchema)


module.exports = Todos
