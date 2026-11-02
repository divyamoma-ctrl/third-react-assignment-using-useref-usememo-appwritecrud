// import * as yup from "yup";
// import { products } from "../json/ProductOrderForm.json";


// const orderSchema = yup.object({
//   customerName: yup
//     .string()
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters"),

//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Enter a valid email address"),

//   phone: yup
//     .string()
//     .required("Phone number is required")
//     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

//   quantity: yup
//     .number()
//     .typeError("Quantity must be a number")
//     .integer("Quantity must be a whole number")
//     .min(1, "Quantity must be at least 1")
//     .required("Quantity is required"),

//  productId: yup
//   .number()
//   .required("Please select a product")
//   .oneOf(
//     products.map((product) => product.id),
//     "Please select a product"
//   ),
// });

// export default orderSchema;



// import * as yup from "yup";
// import { products } from "../json/ProductOrderForm.json";

// const orderSchema = yup.object({
//   customerName: yup
//     .string()
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters"),


//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Enter a valid email address"),
 
//   phone: yup
//     .string()
//     .required("Phone number is required")
//     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
 

//   quantity: yup
//     .number()
//     .typeError("Quantity must be a number")
//     .integer("Quantity must be a whole number")
//     .min(1, "Quantity must be at least 1")
//     .required("Quantity is required"),
   

//   productId: yup
//     .number()
//     .required("Please select a product")
//     .oneOf(
//       products.map((product) => product.id),
//       "Please select a product"
//     )
  
// });

// export default orderSchema;







import * as yup from "yup";
import { products } from "../json/ProductOrderForm.json";

const orderSchema = yup.object({
  customerName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),

  productId: yup
    .number()
    .required("Please select a product")
    .oneOf(
      products.map((product) => product.id),
      "Please select a product"
    ),
});

export type OrderFormData = yup.InferType<typeof orderSchema>;

export default orderSchema;
