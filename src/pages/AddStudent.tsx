
import {

  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createStudentFns } from "../services/helper/api-functions/students.functions";
import {
  studentSchema,
  type StudentPayloadType,
} from "../services/validation/CRUDformSchema";

import { studentFormField } from "../services/json/studentForm.json";

const AddStudent = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentPayloadType>({
    resolver: yupResolver(studentSchema),
  });

  // ============ CREATE STUDENT =============

  const onSubmit = async (data: StudentPayloadType) => {
    setIsLoading(true);

    const response = await createStudentFns(data);

    setIsLoading(false);

    if (response.success) {
      toast.success(response.message);

      reset();
      setImagePreview(null);

      navigate("/crud");
    } else {
      toast.error(response.message);
    }
  };

  // ============ PROFILE IMAGE UPLOAD =============

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("profilePhoto", file, {
        shouldValidate: true,
      });

      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="text"
          onClick={() => navigate("/crud")}
          sx={{ mb: 1 }}
        >
          Back to Students
        </Button>

        <Typography variant="h4" sx={{fontWeight:600}}>
          Add Student
        </Typography>

        <Typography color="text.secondary">
          Enter the student details below.
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {studentFormField.map((field) =>
            field.type === "file" ? (
              <Box key={field.name} sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {field.label}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    src={imagePreview || undefined}
                    sx={{ width: 70, height: 70 }}
                  />

                  <Button variant="outlined" component="label">
                    Upload Image

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>

                <FormHelperText error>
                  {errors.profilePhoto?.message}
                </FormHelperText>
              </Box>
            ) : field.type === "select" ? (
              <Controller
                key={field.name}
                name="course"
                control={control}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    select
                    label={field.label}
                    placeholder={field.placeholder}
                    fullWidth
                    margin="normal"
                    error={!!errors.course}
                    helperText={errors.course?.message}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            ) : (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                fullWidth
                margin="normal"
                {...register(
                  field.name as "name" | "email" | "phone",
                )}
                error={
                  !!errors[field.name as "name" | "email" | "phone"]
                }
                helperText={
                  errors[field.name as "name" | "email" | "phone"]
                    ?.message
                }
              />
            ),
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/crud")}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Add Student"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddStudent;
