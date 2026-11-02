export interface studentFormFieldType {
name: string;
label: string;
type: string;
placeholder: string;
  options?: string[];

}



export const studentFormField:studentFormFieldType[] = [
  {
    name: "name",
    label: "Student Name",
    type: "text",
    placeholder: "Enter Student Name",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter Phone Number",
  },
  {
  name: "email",
  label: "Email Address",
  type: "email",
  placeholder: "Enter Email Address",
},
  {
    name: "course",
    label: "Course",
    type: "select",
    placeholder: "Select Course",
    options: [
      "Information Technology",
      "Computer Science",
      "Electronics & Communication",
      "Mechanical Engineering",
      "Civil Engineering",
      "Other",
    ],
  },
  {
    name: "profilePhoto",
    label: "Profile Photo",
    type: "file",
    placeholder: "Upload Profile Photo",
  },
];