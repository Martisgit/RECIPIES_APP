import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
});

export default mongoose.model("Recipe", recipeSchema);
