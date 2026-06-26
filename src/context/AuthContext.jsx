import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase/config";

import {
  getUserById,
} from "../services/userService";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          firebaseUser
        ) => {
          if (
            firebaseUser
          ) {
            const userData =
              await getUserById(
                firebaseUser.uid
              );

            setUser({
              uid: firebaseUser.uid,
              ...userData,
            });
          } else {
            setUser(null);
          }
        }
      );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);