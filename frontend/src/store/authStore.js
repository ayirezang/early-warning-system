import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      teacherId: "",
      firstName: "",
      lastName: "",
      subject: "",
      setUser: (user) =>
        set({
          teacherId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          subject: user.subject,
        }),
      clearUser: () =>
        set({
          teacherId: "",
          firstName: "",
          lastName: "",
          subject: "",
        }),
    }),
    { name: "auth" },
  ),
);
export default useAuthStore;
