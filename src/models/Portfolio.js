import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
  type: String,
  scale: Number,
});

const SettingsSchema = new mongoose.Schema(
  {
    colors: {
      primary: String,
      secondary: String,
      background: String,
      text: String,
    },
    modelColor: String,
    animations: String,
    lighting: String,
    material: {
      metalness: Number,
      roughness: Number,
    },
    models: [ModelSchema],
  },
  { strict: false }
);

const PortfolioSchema = new mongoose.Schema(
  {
    userId: String,
    templateId: String,
    publishedAt: Date,
    status: String,
    settings: SettingsSchema,
    userData: {
      name: String,
      title: String,
      bio: String,
      skills: String,
      socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
      },
    },
  },
  { strict: false }
);

mongoose.models = {};
export default mongoose.model("Portfolio", PortfolioSchema);
