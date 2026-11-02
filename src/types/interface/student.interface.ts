// export interface StudentFormFieldType {
//   name: string;
//   label: string;
//   type: string;
//   placeholder: string;
//   options?: string[];
// }


// export interface StudentFormData {
//   name: string;
//   email: string;
//   phone: string;
//   course: string;
//   profilePhoto: File | null;
// }




export interface StudentPayload {
  name: string;
  email: string;
  phone: string;
  course: string;
  profilePhoto: File;
}

export interface Students {
  $id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  profileImageUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}