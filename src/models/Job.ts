import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  name: String,
  description: String,
  startDate: String,
  endDate: String,
  tecnologies: [String],
  icon: String,
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
