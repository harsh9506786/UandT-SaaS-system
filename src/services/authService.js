import { auth, db } from "../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

export const signupUser = async (name, email, password) => {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    role: "employee",
    createdAt: new Date(),
  });

  return user;
};

export const loginUser = async (
  email,
  password
) => {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};