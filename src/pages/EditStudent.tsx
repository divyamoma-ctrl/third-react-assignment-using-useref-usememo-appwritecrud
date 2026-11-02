
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const EditStudent = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      {/* BACK BUTTON */}

      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowLeft size={18} />}
        onClick={() => navigate("/crud")}
        sx={{ mb: 3 }}
      >
        Back to Students
      </Button>

      {/* PAGE HEADING */}

      <Typography variant="h4" color="text.primary" sx={{ mb: 3 }}>
        Edit Student
      </Typography>

      {/* FUTURE ENHANCEMENT NOTE */}

      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 2,
          }}
        >
          <Sparkles size={23} color="#8B72FF" />

          <Typography variant="h6" color="primary.dark">
            Future Enhancement
          </Typography>
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          Currently, instead of implementing the complete student editing
  functionality, Active/Inactive status management has been
  implemented using Appwrite. This allows the admin to change
  a student's status directly from the Students list.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "primary.light",
            borderRadius: 2,
            lineHeight: 1.8,
          }}
        >
            Full student editing functionality, including profile image
  updates, will be implemented in a future update. Since managing
  profile images involves additional Appwrite Storage and
  file-handling operations, the complete edit functionality
  has been postponed for now.
        </Typography>
      </Paper>
    </Container>
  );
};

export default EditStudent;
