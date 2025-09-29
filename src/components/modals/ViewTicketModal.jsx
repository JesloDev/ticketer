export default function ViewTicketModal({ ticket, onClose }) {
  return (
    <div className="fixed inset-0 bg-[#0000009d] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-gray-600">Ticket:</span>{" "}
            {ticket.token}
          </p>
          <p>
            <span className="font-medium text-gray-600">Ticket ID:</span>{" "}
            {ticket.token_id}
          </p>
          <p>
            <span className="font-medium text-gray-600">Assigned To:</span>{" "}
            {ticket.matric_number || "-"}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
