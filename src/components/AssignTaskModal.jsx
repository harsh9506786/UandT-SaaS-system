import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function AssignTaskModal({ open, onClose, selectedEmployee }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const handleAssignTask = async () => {
    if (!title.trim() || !description.trim() || !selectedEmployee) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        assignedTo: selectedEmployee.id,
        assignedToName: selectedEmployee.name,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");

      setSuccessOpen(true); // pehle success dikhao
    } catch (error) {
      console.error("Task assign error:", error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#111827 !important",
              color: "#fff",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,.08)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#f8fafc",
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          📋 Assign Task
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Typography
            sx={{
              color: "#94a3b8",
              mb: 3,
              mt: 1,
            }}
          >
            Assigning task to{" "}
            <Box
              component="span"
              sx={{
                color: "#f8fafc",
                fontWeight: 700,
              }}
            >
              {selectedEmployee?.name}
            </Box>
          </Typography>

          <TextField
            label="Task title"
            m
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: 3,
                background: "rgba(255,255,255,.03)",
                mb:4
              },
              

              "& .MuiInputLabel-root": {
                color: "#94a3b8",
              },

              "& fieldset": {
                borderColor: "rgba(255,255,255,.1)",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "#6366f1",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#8b5cf6",
              },
            }}
          />

          <TextField
            label="Task description"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: 3,
                background: "rgba(255,255,255,.03)",
              },

              "& .MuiInputLabel-root": {
                color: "#94a3b8",
              },

              "& fieldset": {
                borderColor: "rgba(255,255,255,.1)",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "#6366f1",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#8b5cf6",
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#94a3b8",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAssignTask}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 3,
              px: 3,
              background: "linear-gradient(135deg,#6366f1 0%, #8b5cf6 100%)",

              "&:hover": {
                background: "linear-gradient(135deg,#7c3aed 0%, #9333ea 100%)",
              },
            }}
          >
            Assign Task
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: 4,
            textAlign: "center",
            p: 2,
          },
        }}
      >
        <DialogContent>
          <CheckCircleIcon
            sx={{
              fontSize: 70,
              color: "#22c55e",
              mb: 2,
            }}
          />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Task Assigned Successfully
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
            }}
          >
            Task assigned to {selectedEmployee?.name}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setSuccessOpen(false);
              onClose();
            }}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AssignTaskModal;
