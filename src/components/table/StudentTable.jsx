import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import NoRecord from "../../assets/no_record.png";
import { useStudentData } from "../../hooks/useStudentData";
import Button from "../Button";
import EditStudentModal from "../modals/EditModal";
import ViewModal from "../modals/ViewModal";

export default function StudentTable() {
  // const [editingStudent, setEditingStudent] = useState(null);
  const [editData, setEditData] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const { students, updateStudent, deleteStudent, handleDownloadCSV } =
    useStudentData();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return students.length > 0
      ? students.filter((s) =>
          Object.values(s).some((v) =>
            String(v).toLowerCase().includes(search.toLowerCase())
          )
        )
      : [];
  }, [search, students]);

  const handleDelete = async (id, matric) => {
    await deleteStudent(id, matric);
    toast.success("Deleted!");
  };

  const columns = useMemo(
    () => [
      { header: "Firstname", accessorKey: "first_name" },
      { header: "Lastname", accessorKey: "last_name" },
      { header: "Othername", accessorKey: "other_name" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phone_number" },
      { header: "Matric No", accessorKey: "matric_number" },
      { header: "Faculty", accessorKey: "faculty" },
      { header: "Level", accessorKey: "level" },
      { header: "Department", accessorKey: "department" },
      { header: "Token", accessorKey: "token" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="text-blue-500  hover:underline px-2 py-0.5 rounded-full text-sm cursor-pointer"
              onClick={() => setViewingStudent(row.original)}
            >
              View
            </button>
            <button
              className="text-yellow-500  hover:underline px-2 py-0.5 rounded-full text-sm cursor-pointer"
              onClick={() => setEditData(row.original)}
            >
              Edit
            </button>
            <Button
              text="Delete"
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded-full text-sm cursor-pointer"
              onClick={() =>
                handleDelete(row.original.id, row.original.matric_number)
              }
            />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded-lg"
      />

      <Button
        text="Download CSV"
        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer mr-0 mb-1"
        onClick={handleDownloadCSV}
      />

      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 whitespace-nowrap text-gray-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  <img
                    src={NoRecord}
                    alt="no record"
                    className="w-[200px] mx-auto"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* 
      {editingStudent && (
        <EditModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={(updated) => {
            setData((prev) =>
              prev.map((s) => (s.id === updated.id ? updated : s))
            );
            setEditingStudent(null);
          }}
        />
      )} */}

        {editData && (
          <EditStudentModal
            key={editData?.id}
            student={editData}
            onClose={() => setEditData(null)}
            onSave={async (data) => {
              await updateStudent(editData.id, data);
              setEditData(null);
            }}
          />
        )}

        {viewingStudent && (
          <ViewModal
            key={viewingStudent?.id}
            student={viewingStudent}
            onClose={() => setViewingStudent(null)}
          />
        )}
      </div>
    </>
  );
}
