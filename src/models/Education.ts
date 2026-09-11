import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const educationSchema = Schema({
  name: String,
  description: String,
  startDate: String,
  endDate: String,
  icon: String,
});

export default mongoose.models.Education ||
  mongoose.model('Education', educationSchema);
