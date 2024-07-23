import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const proyectSchema = new Schema({
  name: String,
  img: String,
  deploy_url: String,
  repo_url: String,
  labels: String,
});

export default mongoose.models.Proyect ||
  mongoose.model('Proyect', proyectSchema);
