// import {
//   Alert,
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormHelperText,
// //   IconButton,
//   MenuItem,
//   Paper,
//   Switch,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// import { createStudentFns, getStudentsFns, studentDeleteFns, studentStatusChangeFns } from "../services/helper/api-functions/students.functions";
// import { studentSchema, type StudentPayloadType } from "../services/validation/CRUDformSchema";

// import { studentFormField } from "../services/json/studentForm.json";
// import type { Students as StudentType} from "../types/interface/student.interface";

// const Students = () => {
//   const navigate = useNavigate();

//   const [students, setStudents] = useState<StudentType[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isError, setIsError] = useState<string | null>(null);

//   const [params, setParams] = useState({
//     page: 1,
//     limit: 5,
//     search: "",
//   });

//   const [openDialog, setOpenDialog] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const {
//     register,
//     control,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<StudentPayloadType>({
//     resolver: yupResolver(studentSchema),
//   });

//   // ============ GET STUDENTS =============

//   useEffect(() => {
//     const fetchStudentsData = async () => {
//       setIsLoading(true);
//       setIsError(null);

//       const response = await getStudentsFns(params);

//       setIsLoading(false);

//       if (response.success && response.data) {
//         setStudents(response.data);
//         console.log("response:", response);
//       } else {
//           setStudents([]);
//         setIsError(response.message);
//       }
//     };

//     fetchStudentsData();
//   }, [params]);

//   // ============ CREATE STUDENT =============

//   const onSubmit = async (data: StudentPayloadType) => {
//     setIsLoading(true);

//     const response = await createStudentFns(data);

//     setIsLoading(false);

//     if (response.success) {
//       toast.success(response.message);

//       setStudents((previous) => [response.data as StudentType, ...previous]);

//       reset();
//       setImagePreview(null);
//       setOpenDialog(false);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   // ============ CHANGE STUDENT STATUS =============

//   const handleStatusChange = async (
//     id: string,
//     currentStatus: boolean,
//   ) => {
//     const newStatus = !currentStatus;

//     const response = await studentStatusChangeFns({
//       id,
//       status: newStatus,
//     });

//     if (response.success) {
//       setStudents((previous) =>
//         previous.map((student) =>
//           student.$id === id
//             ? { ...student, status: newStatus }
//             : student,
//         ),
//       );

//       toast.success("Student status updated successfully!");
//     } else {
//       toast.error(response.message);
//     }
//   };

//   // ============ DELETE STUDENT =============

//   const handleDelete = async (id: string) => {
//     const response = await studentDeleteFns(id);

//     if (response.success) {
//       setStudents((previous) =>
//         previous.filter((student) => student.$id !== id),
//       );

//       toast.success(response.message);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   // ============ PROFILE IMAGE UPLOAD =============

//   const handleImageChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];

//     if (file) {
//       setValue("profilePhoto", file, {
//         shouldValidate: true,
//       });

//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 3 }}>
//       {/* ============ ERROR MESSAGE ============= */}

//       {isError && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {isError}
//         </Alert>
//       )}

//       {/* ============ STUDENT HEADING ============= */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <Typography variant="h4">Students</Typography>

//         <TextField
//           placeholder="Search students..."
//           value={params.search}
//           onChange={(event) =>
//             setParams((previous) => ({
//               ...previous,
//               search: event.target.value,
//               page: 1,
//             }))
//           }
//           sx={{ width: "280px" }}
//         />

//         <Button
//           variant="contained"
//           onClick={() => setOpenDialog(true)}
//         >
//           Add Student
//         </Button>
//       </Box>

//       {/* ============ STUDENT TABLE ============= */}

//       <TableContainer component={Paper}>
//         <Table size="small" aria-label="student table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Student</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Course</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <CircularProgress size={28} />
//                 </TableCell>
//               </TableRow>
//             ) : students.length > 0 ? (
//               students.map((row) => (
//                 <TableRow key={row.$id}>
//                   <TableCell>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                       }}
//                     >
//                       <Avatar
//                         src={row.profileImageUrl}
//                         alt={row.name}
//                         sx={{ width: 40, height: 40 }}
//                       />

//                       <Typography variant="body2" sx={{fontWeight:600}}>
//                         {row.name}
//                       </Typography>
//                     </Box>
//                   </TableCell>

//                   <TableCell>{row.email}</TableCell>
//                   <TableCell>{row.phone}</TableCell>
//                   <TableCell>{row.course}</TableCell>

//                   {/* ============ STATUS SWITCH ============ */}

//                   <TableCell>
//                     <Switch
//                       checked={row.status}
//                       onChange={() =>
//                         handleStatusChange(row.$id, row.status)
//                       }
//                     />

//                     <Typography
//                       variant="caption"
//                       color={row.status ? "success.main" : "text.secondary"}
//                     >
//                       {row.status ? "Active" : "Inactive"}
//                     </Typography>
//                   </TableCell>

//                   {/* ============ ACTION BUTTONS ============ */}

//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: 0.5 }}>
//                       <Button
//                         size="small"
//                         onClick={() =>
//                           navigate(`/details/${row.$id}`)
//                         }
//                       >
//                         View
//                       </Button>

//                       <Button size="small">
//                         Edit
//                       </Button>

//                       <Button
//                         size="small"
//                         color="error"
//                         onClick={() => handleDelete(row.$id)}
//                       >
//                         Delete
//                       </Button>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No students found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* ============ ADD STUDENT DIALOG ============= */}

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Add Student</DialogTitle>

//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <DialogContent>
//             {studentFormField.map((field) =>
//               field.type === "file" ? (
//                 <Box key={field.name} sx={{ mb: 2 }}>
//                   <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                     {field.label}
//                   </Typography>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 2,
//                     }}
//                   >
//                     <Avatar
//                       src={imagePreview || undefined}
//                       sx={{ width: 70, height: 70 }}
//                     />

//                     <Button variant="outlined" component="label">
//                       Upload Image

//                       <input
//                         hidden
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                     </Button>
//                   </Box>

//                   <FormHelperText error>
//                     {errors.profilePhoto?.message}
//                   </FormHelperText>
//                 </Box>
//               ) : field.type === "select" ? (
//                 <Controller
//                   key={field.name}
//                   name="course"
//                   control={control}
//                   render={({ field: controllerField }) => (
//                     <TextField
//                       {...controllerField}
//                       select
//                       label={field.label}
//                       placeholder={field.placeholder}
//                       fullWidth
//                       margin="normal"
//                       error={!!errors.course}
//                       helperText={errors.course?.message}
//                     >
//                       {field.options?.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   )}
//                 />
//               ) : (
//                 <TextField
//   key={field.name}
//   label={field.label}
//   type={field.type}
//   placeholder={field.placeholder}
//   fullWidth
//   margin="normal"
//   {...register(field.name as "name" | "email" | "phone")}
//   error={!!errors[field.name as "name" | "email" | "phone"]}
//   helperText={
//     errors[field.name as "name" | "email" | "phone"]?.message
//   }
// />
//               ),
//             )}
//           </DialogContent>

//           <DialogActions sx={{ px: 3, pb: 2 }}>
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 setOpenDialog(false);
//                 reset();
//                 setImagePreview(null);
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <CircularProgress size={22} color="inherit" />
//               ) : (
//                 "Add Student"
//               )}
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>
//     </Container>
//   );
// };

// export default Students;

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getStudentsFns,
  studentDeleteFns,
  studentStatusChangeFns,
} from "../services/helper/api-functions/students.functions";

import type { Students as StudentType } from "../types/interface/student.interface";

const Students = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    search: "",
  });

  // ============ GET STUDENTS =============

  useEffect(() => {
    const fetchStudentsData = async () => {
      setIsLoading(true);
      setIsError(null);

      const response = await getStudentsFns(params);

      setIsLoading(false);

      if (response.success && response.data) {
        setStudents(response.data);
      } else {
        setStudents([]);
        setIsError(response.message);
      }
    };

    fetchStudentsData();
  }, [params]);

  // ============ CHANGE STUDENT STATUS =============

  const handleStatusChange = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    const response = await studentStatusChangeFns({
      id,
      status: newStatus,
    });

    if (response.success) {
      setStudents((previous) =>
        previous.map((student) =>
          student.$id === id ? { ...student, status: newStatus } : student,
        ),
      );

      toast.success("Student status updated successfully!");
    } else {
      toast.error(response.message);
    }
  };

  // ============ DELETE STUDENT =============

  const handleDelete = async (id: string) => {
    const response = await studentDeleteFns(id);

    if (response.success) {
      setStudents((previous) =>
        previous.filter((student) => student.$id !== id),
      );

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* ============ ERROR MESSAGE ============= */}

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {isError}
        </Alert>
      )}

      {/* ============ STUDENT HEADING ============= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">Students</Typography>

        <TextField
          placeholder="Search students..."
          value={params.search}
          onChange={(event) =>
            setParams((previous) => ({
              ...previous,
              search: event.target.value,
              page: 1,
            }))
          }
          sx={{ width: "280px" }}
        />

        <Button variant="contained" onClick={() => navigate("/crud/add")}>
          Add Student
        </Button>
      </Box>

      {/* ============ STUDENT TABLE ============= */}

      <TableContainer component={Paper}>
        <Table size="small" aria-label="student table">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : students.length > 0 ? (
              students.map((row) => (
                <TableRow key={row.$id}>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={row.profileImageUrl}
                        alt={row.name}
                        sx={{ width: 40, height: 40 }}
                      />

                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.course}</TableCell>

                  {/* ============ STATUS SWITCH ============ */}

                  <TableCell>
                    <Switch
                      checked={row.status}
                      onChange={() => handleStatusChange(row.$id, row.status)}
                    />

                    <Typography
                      variant="caption"
                      color={row.status ? "success.main" : "text.secondary"}
                    >
                      {row.status ? "Active" : "Inactive"}
                    </Typography>
                  </TableCell>

                  {/* ============ ACTION BUTTONS ============ */}

                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Button
                        size="small"
                        onClick={() => navigate(`/details/${row.$id}`)}
                      >
                        View
                      </Button>

                      <Button
                        size="small"
                        onClick={() => navigate(`/crud/edit/${row.$id}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(row.$id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Students;
