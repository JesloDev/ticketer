import StudentTable from "../components/table/StudentTable";

const RegisteredStudents = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Student Records</h1>
      <StudentTable />
    </div>
  );
};

export default RegisteredStudents;
