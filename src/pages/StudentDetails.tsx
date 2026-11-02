
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Students as StudentType } from "../types/interface/student.interface";

import { studentDetailsFns } from "../services/helper/api-functions/students.functions";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  // ============ GET STUDENT DETAILS ============

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (!id) {
        setIsError("Student ID is missing");
        return;
      }

      setIsLoading(true);
      setIsError(null);

      const response = await studentDetailsFns(id);

      setIsLoading(false);

      if (response.success) {
        setStudent(response.data as StudentType);
      } else {
        setIsError(response.message);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {isError}
        </Alert>

        <Button onClick={() => navigate("/")}>
          Back to Students
        </Button>
      </Container>
    );
  }

  if (!student) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back to Students
      </Button>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 3,
            }}
          >
            <Avatar
              src={student.profileImageUrl}
              alt={student.name}
              sx={{
                width: 100,
                height: 100,
                fontSize: 32,
              }}
            />

            <Box>
              <Typography variant="h5">
                {student.name}
              </Typography>

              <Typography color="text.secondary">
                {student.course}
              </Typography>

              <Chip
                label={student.status ? "Active" : "Inactive"}
                color={student.status ? "success" : "default"}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Student Information
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Student ID
              </Typography>
              <Typography>{student.$id}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Full Name
              </Typography>
              <Typography>{student.name}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Email Address
              </Typography>
              <Typography>{student.email}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Phone Number
              </Typography>
              <Typography>{student.phone}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Course
              </Typography>
              <Typography>{student.course}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Account Status
              </Typography>
              <Typography>
                {student.status ? "Active" : "Inactive"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentDetails;
