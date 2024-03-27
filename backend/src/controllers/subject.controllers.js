import asyncHandler from "../middlewares/asyncHandler.js";
import SubjectModel from "../models/subject/subject.models.js";

export const addSubjectController = asyncHandler(async (req, res, next) => {
  try {
    const { subjectName, subjectCode, fullMark, passMark, course, courseType } =
      req.body;

    switch (true) {
      case !subjectName:
        return res.status(400).json({ message: "Subject Name is required" });
      case !subjectCode:
        return res.status(400).json({ message: "Subject Code is required" });
      case !fullMark:
        return res.status(400).json({ message: "Full Mark is required" });
      case !passMark:
        return res.status(400).json({ message: "Pass Mark is required" });
      default:
        break;
    }
    let existedSubject = await SubjectModel.findOne({ subjectName });
    if (existedSubject) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    let newSubject = new SubjectModel(req.body);
    newSubject.createdBy = req.user.fName + " " + req.user.lName;
    let addedSubject = await newSubject.save();
    res.json(addedSubject);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
