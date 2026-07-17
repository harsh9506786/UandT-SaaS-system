import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Fetch every task across all employees (admin view)
export const getAllTasks = async () => {
  const snap = await getDocs(collection(db, "tasks"));

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// Edit a task's title/description
export const updateTask = async (taskId, updates) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updates);
};

// Delete any task (admin can delete regardless of status)
export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};