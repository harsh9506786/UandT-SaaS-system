import { useEffect, useState } from "react";
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

function EditTaskModal({ open, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSave = async () => {
    if (!title.trim() || !description.trim() || !task) return;
    await onSave(task.id, { title, description });
    onClose();
  };

  return (
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
        ✏️ Edit Task
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography sx={{ color: "#94a3b8", mb: 3, mt: 1 }}>
          Editing task assigned to{" "}
          <Box component="span" sx={{ color: "#f8fafc", fontWeight: 700 }}>
            {task?.assignedToName}
          </Box>
        </Typography>

        <TextField
          label="Task title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: 3,
              background: "rgba(255,255,255,.03)",
            },
            "& .MuiInputLabel-root": { color: "#94a3b8" },
            "& fieldset": { borderColor: "rgba(255,255,255,.1)" },
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
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: 3,
              background: "rgba(255,255,255,.03)",
            },
            "& .MuiInputLabel-root": { color: "#94a3b8" },
            "& fieldset": { borderColor: "rgba(255,255,255,.1)" },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "#6366f1",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#8b5cf6",
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{ color: "#94a3b8", textTransform: "none", fontWeight: 600 }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTaskModal;