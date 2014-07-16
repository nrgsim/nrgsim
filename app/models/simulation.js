/*jslint node: true */
"use strict";

var mongoose = mongoose || require('mongoose'),
  Schema = mongoose.Schema;

var SimulationSchema = new Schema({
  userInput: Object,
  finished: { type: Boolean, default: false },
  results: Object
});


SimulationSchema.statics.create = function(data) {
  var Simulation = this;
  return new Simulation(data);
};

mongoose.model('Simulation', SimulationSchema);
