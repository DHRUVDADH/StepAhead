import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const courseModuleSchema = new Schema({
  moduleNo: {
    type: Number,
    required: true,
  },
  moduleVideo: {
    type: String,
    required: true,
  },
  moduleContent: {
    type: String,
    required: true,
  },
  moduleIsComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    courseModules: {
      type: [courseModuleSchema],
    },
    courseDuration: {
      type: Number,
      required: true,
    },
    courseAvatar: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["Basic", "Intermediate", "Advanced"],
    },
    courseUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

courseSchema.plugin(mongooseAggregatePaginate);

export const Course = mongoose.model("Course", courseSchema);
