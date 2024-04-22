export type Gender = "Male" | "Female" | "Unspecified";

export const getStoredGender = (): Gender => {
  const storedValue = localStorage.getItem("Gender");
  return storedValue === "Male" || storedValue === "Female" ? storedValue : "Unspecified";
};

export const toggleGender = (currentGender: Gender): Gender => {
  return currentGender === "Male" ? "Female" : "Male";
};
