import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      teacherId: "",
      firstName: "",
      lastName: "",
      subject: "",
      role: "",
      setUser: (user) =>
        set({
          teacherId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          subject: user.subject,
          role: user.role,
        }),
      clearUser: () =>
        set({
          teacherId: "",
          firstName: "",
          lastName: "",
          subject: "",
          role: "",
        }),
    }),
    { name: "auth" },
  ),
);
export default useAuthStore;
