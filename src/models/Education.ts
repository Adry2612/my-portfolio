var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var educationSchema = Schema({
  name: String,
  description: String,
  startDate: String,
  endDate: String,
  icon: String,
});

export default mongoose.models.Education ||
  mongoose.model('Education', educationSchema);
