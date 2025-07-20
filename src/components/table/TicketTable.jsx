import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTicketData } from "../../hooks/useTicketData";
import Button from "../Button";
import AssignTicketModal from "../modals/AssignTicketModal";
import ViewTicketModal from "../modals/ViewTicketModal";

export default function TicketTable() {
  const { tickets, loading, error, assignTicket } = useTicketData();
  const [selected, setSelected] = useState(null);
  const [viewing, setViewing] = useState(null);

  const columns = [
    { accessorKey: "ticket_id", header: "Ticket ID" },
    { accessorKey: "ticket_number", header: "Ticket Number" },
    { accessorKey: "usage", header: "Usage" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const t = row.original;
        return t.usage === "available" ? (
          <Button
            text="Assign"
            onClick={() => setSelected(t)}
            className="bg-green-500 text-white px-2 py-1 mx-0"
          />
        ) : (
          <Button
            text="View"
            onClick={() => setViewing(t)}
            className="bg-blue-500 text-white px-2 py-1 mx-0"
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
      {loading && <p>Loading...</p>}
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
            table.getRowModel().rows.map((row, i) => {
              return (
                <tr
                  key={row.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
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
            const success = await assignTicket(selected.ticket_id, matric);
            if (success) setSelected(null);
            else toast.error("Assignment failed");
          }}
        />
      )}

      {viewing && (
        <ViewTicketModal ticket={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  );
}
