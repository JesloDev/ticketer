import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_BASE_URL;

export function useStudentData() {
  const [students, setStudents] = useState([]);

  const getRegisterations = async () => {
    const response = await fetch(`${apiUrl}/record`);

    if (!response.ok) {
      throw new Error("An error occured");
    }

    const { records } = await response.json();

    const filteredRecords = records.filter((v) => v.matric_number);

    setStudents(filteredRecords);
  };

  useEffect(() => {
    getRegisterations();
  }, []);

  const updateStudent = async (id, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/record/update_metadata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const res = await response.json();

      // setStudents((prev) =>
      //   prev.map((student) =>
      //     student.id === id ? { ...student, ...records } : student
      //   )
      // );
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteStudent = (id) =>
    setStudents((prev) => prev.filter((student) => student.id !== id));

  return { students, updateStudent, deleteStudent };
}
