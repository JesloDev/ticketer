import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";

export default function AssignTicketModal({ ticket, onAssign, onClose }) {
  const [matric, setMatric] = useState("");
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="fixed inset-0 bg-[#0000009d] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Assign Ticket</h3>
        <p className="text-sm mb-2 text-gray-600">
          Ticket Number: <strong>{ticket.token}</strong>
        </p>
        <form>
          {errors.assign_ticket && (
            <span className="text-red-300">*required</span>
          )}
          <input
            type="text"
            {...register("assign_ticket", { required: true })}
            value={matric}
            onChange={(e) => setMatric(e.target.value)}
            placeholder="Enter Matric Number"
            className="border px-2 py-1 rounded-lg w-full"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="bg-gray-500 text-white mx-0"
            />
            <Button
              text="Assign"
              type="submit"
              onClick={() => matric && onAssign(matric)}
              className="bg-green-700 text-white mx-0 "
            />
          </div>
        </form>
      </div>
    </div>
  );
}
