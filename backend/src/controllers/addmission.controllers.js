import asyncHandler from "../middlewares/asyncHandler.js";
import addMissionFormModel from "../models/addmission_form.models.js";

export const createAddMissionController = asyncHandler(
  async (req, res, next) => {
    const {
      rollNumber,
      name,
      father_name,
      mobile_number,
      phone_number,
      present_address,
      permanent_address,
      date_of_birth,
      city,
      email,
      student_status,
      education_qualification,
      professional_qualification,
      select_course,
      document_attached,
      select_software,
      name_of_person_for_commision,
      commision_paid,
      commision_date,
      commision_voucher_number,
      course_fees,
      down_payment,
      date_of_joining,
      no_of_installments,
    } = req.body;
    console.log(req.body);
    console.log(req.file);
    const file = req?.file?.filename;
    switch (true) {
      case !rollNumber:
        res.status(400);
        throw new Error("Please provide roll Number field!");
        return;
      case !file:
        res.status(400);
        throw new Error("Please provide image field!");
        return;
      case !name:
        res.status(400);
        throw new Error("Please provide name field!");
        return;
      case !father_name:
        res.status(400);
        throw new Error("Please provide father Name field!");
        return;
      case !mobile_number:
        res.status(400);
        throw new Error("Please provide mobile number field!");
        return;
      case !phone_number:
        res.status(400);
        throw new Error("Please provide phone number field!");
        return;
      case !present_address:
        res.status(400);
        throw new Error("Please provide present address field!");
        return;
      case !permanent_address:
        res.status(400);
        throw new Error("Please provide permanent address field!");
        return;
      case !date_of_birth:
        res.status(400);
        throw new Error("Please provide date of birth field!");
        return;
      case !city:
        res.status(400);
        throw new Error("Please provide city field!");
        return;
      case !email:
        res.status(400);
        throw new Error("Please provide email field!");
        return;
      case !student_status:
        res.status(400);
        throw new Error("Please provide student status field!");
        return;
      case !education_qualification:
        res.status(400);
        throw new Error("Please provide education qualification field!");
        return;
      case !professional_qualification:
        res.status(400);
        throw new Error("Please provide professional qualification field!");
        return;
      case !select_course:
        res.status(400);
        throw new Error("Please provide select course field!");
        return;
      case !document_attached:
        res.status(400);
        throw new Error("Please provide document attached  field!");
        return;
      case !select_software:
        res.status(400);
        throw new Error("Please provide select software field!");
        return;
      case !name_of_person_for_commision:
        res.status(400);
        throw new Error("Please provide name of person for commision field!");
        return;
      case !commision_paid:
        res.status(400);
        throw new Error("Please provide commision paid field!");
        return;
      case !commision_date:
        res.status(400);
        throw new Error("Please provide commision date field!");
        return;
      case !commision_voucher_number:
        res.status(400);
        throw new Error("Please provide commision voucher number field!");
        return;
      case !course_fees:
        res.status(400);
        throw new Error("Please provide course fees field!");
        return;
      case !down_payment:
        res.status(400);
        throw new Error("Please provide down payment field!");
        return;
      case !date_of_joining:
        res.status(400);
        throw new Error("Please provide date of joining field!");
        return;
      case !no_of_installments:
        res.status(400);
        throw new Error("Please provide number of installements  field!");
        return;

      default:
        break;
    }

    const existedAddmission = await addMissionFormModel.findOne({ email });

    if (existedAddmission) {
      return res.status(400).json({
        success: false,
        message: "Admission already done with this email!",
      });
      // throw new Error("with this email addmission already done!");
    }

    let newAddmission = await addMissionFormModel.create({
      ...req.body,
      image: file,
    });

    res
      .status(200)
      .json({ success: true, message: "Addmission done successfully!!" });
  }
);
