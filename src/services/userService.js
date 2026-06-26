import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

export const getUserById = async (uid) => {
  const docRef = doc(db, "users", uid);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(
    collection(db, "users")
  );

  const users = [];

  querySnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return users;
};

export const updateUserRole = async (uid, role) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    role,
  });
};
export const deleteUser = async (
  uid
) => {
  await deleteDoc(
    doc(db, "users", uid)
  );
};