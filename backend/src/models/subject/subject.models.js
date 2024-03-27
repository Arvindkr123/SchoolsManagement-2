import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true,
    },
    fullMark: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseType",
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const SubjectModel = mongoose.model("Subject", subjectSchema);

export default SubjectModel;
