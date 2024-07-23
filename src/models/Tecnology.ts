import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tecnologySchema = new Schema({
  name: String,
  description: String,
  state: String,
  category: String,
  icon: String,
});

export default mongoose.models.Tecnology ||
  mongoose.model('Tecnology', tecnologySchema);
