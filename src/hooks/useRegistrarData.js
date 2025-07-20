import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_BASE_URL;

export function useRegistrarData() {
  const [students, setStudents] = useState([]);

  const getRegisterations = async () => {
    const response = await fetch(`${apiUrl}/receipt_records`);

    if (!response.ok) {
      throw new Error("An error occured");
    }

    const result = await response.json();

    setStudents(result);
  };

  useEffect(() => {
    getRegisterations();
  }, []);

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updatedData } : student
      )
    );

    // Simulate API call
    return Promise.resolve("Updated successfully");
  };

  const deleteStudent = (id) =>
    setStudents((prev) => prev.filter((student) => student.id !== id));

  return { students, updateStudent, deleteStudent };
}
