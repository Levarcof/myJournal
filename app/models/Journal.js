import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },

    ambience: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    emotion: {
      type: String,
      default: null,
    },

    keywords: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Journal ||
  mongoose.model("Journal", journalSchema);