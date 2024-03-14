import mongoose from "mongoose";

const admissionFormSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    present_address: {
      type: String,
      required: true,
    },
    permanent_address: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    student_status: {
      type: String,
      required: true,
    },
    education_qualification: {
      type: String,
      required: true,
    },
    professional_qualification: {
      type: String,
      required: true,
    },
    select_course: {
      type: String,
      required: true,
    },
    document_attached: {
      type: String,
      required: true,
    },
    select_software: {
      type: String,
      required: true,
    },
    name_of_person_for_commision: {
      type: String,
      required: true,
    },
    commision_paid: {
      type: String,
      required: true,
    },
    commision_date: {
      type: Date,
      required: true,
    },
    commision_voucher_number: {
      type: String,
      required: true,
    },
    course_fees: {
      type: String,
      required: true,
    },
    down_payment: {
      type: String,
      required: true,
    },
    date_of_joining: {
      type: Date,
      required: true,
    },

    no_of_installments: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const admissionFormModel = mongoose.model("Students", admissionFormSchema);
export default admissionFormModel;
