import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useTicketData } from "../../hooks/useTicketData";
import Button from "../Button";
import Loader from "../Loader";
import AssignTicketModal from "../modals/AssignTicketModal";
import ViewTicketModal from "../modals/ViewTicketModal";

export default function TicketTable() {
  const { tickets, loading, error, assignTicket } = useTicketData();
  const [selected, setSelected] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [visibleTokens, setVisibleTokens] = useState({}); // key: token_id, value: true/false

  const toggleTokenVisibility = (id) => {
    setVisibleTokens((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const columns = [
    { accessorKey: "token_id", header: "Ticket ID" },
    {
      accessorKey: "token",
      header: "Ticket Number",
      cell: ({ row }) => {
        const t = row.original;
        const isVisible = visibleTokens[t.token_id];

        return (
          <div className="flex items-center space-x-2">
            <span>{isVisible ? t.token : "******"}</span>
            <button onClick={() => toggleTokenVisibility(t.token_id)}>
              {isVisible ? (
                <BsEyeSlash
                  size={16}
                  className="text-gray-600 cursor-pointer"
                />
              ) : (
                <BsEye size={16} className="text-gray-600 cursor-pointer" />
              )}
            </button>
          </div>
        );
      },
    },
    { accessorKey: "usage", header: "Usage" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const t = row.original;
        return t.usage === "available" ? (
          <Button
            text="Assign"
            onClick={() => setSelected(t)}
            className="bg-green-700 text-white px-2 py-1 mx-0"
          />
        ) : (
          <Button
            text="View"
            onClick={() => setViewing(t)}
            className="bg-blue-600 text-white px-2 py-1 mx-0"
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: tickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full shadow">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="p-2 text-left">
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
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                Loading <Loader />
              </td>
            </tr>
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No tickets available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selected && (
        <AssignTicketModal
          ticket={selected}
          onClose={() => setSelected(null)}
          onAssign={async (matric) => {
            const success = await assignTicket(selected.token, matric);
            if (success) {
              setSelected(null);
            }
          }}
        />
      )}

      {viewing && (
        <ViewTicketModal ticket={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  );
}
