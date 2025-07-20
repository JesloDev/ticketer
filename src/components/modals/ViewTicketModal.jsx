export default function ViewTicketModal({ ticket, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-gray-600">Ticket Number:</span>{" "}
            {ticket.ticket_number}
          </p>
          <p>
            <span className="font-medium text-gray-600">Ticket ID:</span>{" "}
            {ticket.ticket_id}
          </p>
          <p>
            <span className="font-medium text-gray-600">Assigned To:</span>{" "}
            {ticket.assigned_to || "-"}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
