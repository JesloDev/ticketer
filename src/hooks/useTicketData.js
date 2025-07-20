import { useEffect, useState } from "react";

export function useTicketData() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", { credentials: "include" });
      // const data = await res.json();
      const data = [
        {
          ticket_number: "0JK0l3",
          ticket_id: "20250623-MM-1",
          usage: "available",
        },
        {
          ticket_number: "SawY4W",
          ticket_id: "20250623-MM-2",
          usage: "available",
        },
        {
          ticket_number: "2cNknx",
          ticket_id: "20250623-MM-3",
          usage: "available",
        },
        {
          ticket_number: "NciCOp",
          ticket_id: "20250623-MM-4",
          usage: "available",
        },
        {
          ticket_number: "2wmnZZ",
          ticket_id: "20250623-MM-5",
          usage: "available",
        },
        {
          ticket_number: "Wsezc2",
          ticket_id: "20250623-MM-6",
          usage: "available",
        },
        {
          ticket_number: "cymuAh",
          ticket_id: "20250623-MM-7",
          usage: "available",
        },
        {
          ticket_number: "G6Kn6m",
          ticket_id: "20250623-MM-8",
          usage: "available",
        },
        {
          ticket_number: "nSrJWm",
          ticket_id: "20250623-MM-9",
          usage: "available",
        },
        {
          ticket_number: "xBFqoI",
          ticket_id: "20250623-MM-10",
          usage: "available",
        },
        {
          ticket_number: "x6MvRz",
          ticket_id: "20250623-MM-11",
          usage: "available",
        },
        {
          ticket_number: "Eo9pzu",
          ticket_id: "20250623-MM-12",
          usage: "available",
        },
        {
          ticket_number: "cYLPQF",
          ticket_id: "20250623-MM-13",
          usage: "available",
        },
        {
          ticket_number: "njcULQ",
          ticket_id: "20250623-MM-14",
          usage: "available",
        },
        {
          ticket_number: "1TKpDY",
          ticket_id: "20250623-MM-15",
          usage: "available",
        },
        {
          ticket_number: "h7Mv9G",
          ticket_id: "20250623-MM-16",
          usage: "available",
        },
        {
          ticket_number: "NPayb8",
          ticket_id: "20250623-MM-17",
          usage: "available",
        },
        {
          ticket_number: "qbpDwq",
          ticket_id: "20250623-MM-18",
          usage: "available",
        },
        {
          ticket_number: "LkUK7e",
          ticket_id: "20250623-MM-19",
          usage: "available",
        },
        {
          ticket_number: "RMFLB3",
          ticket_id: "20250623-MM-20",
          usage: "available",
        },
        {
          ticket_number: "QaSLrS",
          ticket_id: "20250623-MM-21",
          usage: "available",
        },
        {
          ticket_number: "r1wl2R",
          ticket_id: "20250623-MM-22",
          usage: "available",
        },
        {
          ticket_number: "h0jYGd",
          ticket_id: "20250623-MM-23",
          usage: "available",
        },
        {
          ticket_number: "z27z7q",
          ticket_id: "20250623-MM-24",
          usage: "available",
        },
        {
          ticket_number: "uhkNVV",
          ticket_id: "20250623-MM-25",
          usage: "available",
        },
        {
          ticket_number: "fCzsQ4",
          ticket_id: "20250623-MM-26",
          usage: "available",
        },
        {
          ticket_number: "2vLiZJ",
          ticket_id: "20250623-MM-27",
          usage: "available",
        },
        {
          ticket_number: "98jDGd",
          ticket_id: "20250623-MM-28",
          usage: "available",
        },
        {
          ticket_number: "NVmJ0D",
          ticket_id: "20250623-MM-29",
          usage: "available",
        },
        {
          ticket_number: "C93sjK",
          ticket_id: "20250623-MM-30",
          usage: "available",
        },
        {
          ticket_number: "nAOtnr",
          ticket_id: "20250623-MM-31",
          usage: "available",
        },
        {
          ticket_number: "xglPTE",
          ticket_id: "20250623-MM-32",
          usage: "available",
        },
        {
          ticket_number: "ynyneQ",
          ticket_id: "20250623-MM-33",
          usage: "available",
        },
        {
          ticket_number: "mtVRAo",
          ticket_id: "20250623-MM-34",
          usage: "available",
        },
        {
          ticket_number: "NKE6wK",
          ticket_id: "20250623-MM-35",
          usage: "available",
        },
        {
          ticket_number: "gqbr2t",
          ticket_id: "20250623-MM-36",
          usage: "available",
        },
        {
          ticket_number: "jgnnAc",
          ticket_id: "20250623-MM-37",
          usage: "available",
        },
        {
          ticket_number: "jwL3xQ",
          ticket_id: "20250623-MM-38",
          usage: "available",
        },
        {
          ticket_number: "gPG46R",
          ticket_id: "20250623-MM-39",
          usage: "available",
        },
        {
          ticket_number: "LOuu22",
          ticket_id: "20250623-MM-40",
          usage: "available",
        },
        {
          ticket_number: "KuvXWS",
          ticket_id: "20250623-MM-41",
          usage: "available",
        },
        {
          ticket_number: "cwF5z6",
          ticket_id: "20250623-MM-42",
          usage: "available",
        },
        {
          ticket_number: "TDxzwv",
          ticket_id: "20250623-MM-43",
          usage: "available",
        },
        {
          ticket_number: "i1BeC5",
          ticket_id: "20250623-MM-44",
          usage: "available",
        },
        {
          ticket_number: "aCjGF5",
          ticket_id: "20250623-MM-45",
          usage: "available",
        },
        {
          ticket_number: "ZMfSgb",
          ticket_id: "20250623-MM-46",
          usage: "available",
        },
        {
          ticket_number: "4rkSKu",
          ticket_id: "20250623-MM-47",
          usage: "available",
        },
        {
          ticket_number: "p7dMMo",
          ticket_id: "20250623-MM-48",
          usage: "available",
        },
        {
          ticket_number: "7sOpjq",
          ticket_id: "20250623-MM-49",
          usage: "available",
        },
        {
          ticket_number: "rR6TpX",
          ticket_id: "20250623-MM-50",
          usage: "available",
        },
      ];
      setTickets(data);
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const assignTicket = async (id, matric) => {
    try {
      const res = await fetch(`/api/tickets/${id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ matric_number: matric }),
      });

      if (!res.ok) throw new Error("Failed to assign");

      setTickets((prev) =>
        prev.map((t) =>
          t.ticket_id === id
            ? { ...t, usage: "assigned", assigned_to: matric }
            : t
        )
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  return { tickets, loading, error, assignTicket };
}
