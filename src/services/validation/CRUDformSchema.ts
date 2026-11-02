import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name must be at most 32 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  course: yup
    .string()
    .required("Please select a course"),

  profilePhoto: yup
    .mixed<File>()
    // .required("Profile photo is required"),
});

export type StudentPayloadType = yup.InferType<typeof studentSchema>;