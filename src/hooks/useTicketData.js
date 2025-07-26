import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_BASE_URL;

export function useTicketData() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const didFetch = useRef(false);

  useEffect(() => {
    if (!didFetch.current) {
      fetchTickets();
      didFetch.current = true;
    }
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/tickets`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!data) {
        throw new Error("Unable to fetch tickets");
      }

      toast.success("Successfully retrieved tickets");
      setTickets(data);
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const assignTicket = async (token, matric) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ matric_number: matric, token }),
      });

      const data = await response.json();

      if (
        response.status === 400 ||
        response.status === 404 ||
        response.status === 409
      )
        throw new Error(data.error);

      if (!response.ok) throw new Error(`Failed to assign ticket to ${matric}`);

      const {
        message,
        updated_ticket: { token_id, usage },
        updated_record: matric_number,
      } = data;

      setTickets((prev) => {
        console.log({ prev });

        prev.map((t) => {
          t.token_id === token_id ? { ...t, usage: usage, matric_number } : t;
        });
      });
      toast.success(message || "Ticket assigned");
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { tickets, loading, error, assignTicket };
}
