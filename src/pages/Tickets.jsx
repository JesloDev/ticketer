import TicketTable from "../components/table/TicketTable";

const Tickets = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 h-dvh overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <TicketTable />
    </div>
  );
};

export default Tickets;
