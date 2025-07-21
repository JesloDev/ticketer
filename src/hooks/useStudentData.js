import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoader } from "../stores/useLoader";

const apiUrl = import.meta.env.VITE_BASE_URL;

export function useStudentData() {
  const [students, setStudents] = useState([]);
  const { setLoading } = useLoader();

  const getRegisterations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/record`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("An error occured");
      }

      const { records } = await response.json();

      const filteredRecords = records.filter((v) => v.matric_number);

      setStudents(filteredRecords);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRegisterations();
  }, []);

  const updateStudent = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/record/update_metadata`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const res = await response.json();

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, ...res.updated_record } : student
        )
      );
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = (id) =>
    setStudents((prev) => prev.filter((student) => student.id !== id));

  return { students, updateStudent, deleteStudent };
}
