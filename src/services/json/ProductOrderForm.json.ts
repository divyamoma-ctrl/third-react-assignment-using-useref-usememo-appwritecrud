// // FORM Input JSON


// export interface InputFieldsDataType {
//   name: "customerName" | "email" | "phone" | "quantity";
//   label: string;
//   type: "text" | "email" | "tel" | "number";
//   placeholder: string;
// }


// export const inputFieldsData: InputFieldsDataType[] = [
//   {
//     name: "customerName",
//     label: "Customer Name",
//     type: "text",
//     placeholder: "Enter your name",
//   },
//   {
//     name: "email",
//     label: "Email Address",
//     type: "email",
//     placeholder: "Enter your email",
//   },
//   {
//     name: "phone",
//     label: "Phone Number",
//     type: "tel",
//     placeholder: "Enter your phone number",
//   },
//   {
//     name: "quantity",
//     label: "Quantity",
//     type: "number",
//     placeholder: "Enter quantity",
//   },
// ];





// // PRODUCTS JSON

// export interface ProductType {
//   id: number;
//   name: string;
//   price: number;
// }

// export const products: ProductType[] = [
//   { id: 1, name: "Laptop", price: 50000 },
//   { id: 2, name: "Mouse", price: 500 },
//   { id: 3, name: "Keyboard", price: 1000 },
//    { id: 4, name: "Speaker", price: 2000 },
// ];



// // ORDER FORM DATA Or Payload

// export interface OrderFormData {
//   customerName: string;
//   email: string;
//   phone: string;
//   quantity: number;
//   productId: number
// }




export interface InputFieldsDataType {
  name: "customerName" | "email" | "phone" | "quantity";
  label: string;
  type: "text" | "email" | "tel" | "number";
  placeholder: string;
}

export const inputFieldsData: InputFieldsDataType[] = [
  {
    name: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Enter quantity",
  },
];

export interface ProductType {
  id: number;
  name: string;
  price: number;
}

export const products: ProductType[] = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mouse", price: 500 },
  { id: 3, name: "Keyboard", price: 1000 },
  { id: 4, name: "Speaker", price: 2000 },
];

// export interface OrderFormData {
//   customerName: string;
//   email: string;
//   phone: string;
//   quantity: number;
//   productId: number ;
// }