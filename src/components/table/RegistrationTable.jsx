import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import NoRecord from "../../assets/no_record.png";
import { useRegistrarData } from "../../hooks/useRegistrarData";
import ViewModal from "../modals/ViewModal";

export default function RegistrationTable() {
  const [viewingStudent, setViewingStudent] = useState(null);
  const { students } = useRegistrarData();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return students.filter((s) =>
      Object.values(s).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, students]);

  const columns = useMemo(
    () => [
      { header: "Firstname", accessorKey: "first_name" },
      { header: "Lastname", accessorKey: "last_name" },
      { header: "Othername", accessorKey: "other_name" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phone_number" },
      { header: "Matric No", accessorKey: "matric_number" },
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
