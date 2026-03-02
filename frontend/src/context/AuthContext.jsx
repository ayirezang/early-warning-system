import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  return (
    <AuthContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        subject,
        setSubject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
