import { useState } from "react";
import Button from "../Button";

export default function EditStudentModal({ student, onClose, onSave }) {
  const [form, setForm] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-[#0000009d] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[600px]">
        <h3 className="text-lg font-semibold mb-4">Edit Student</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(form).map(
            ([key, value]) =>
              key !== "id" &&
              key !== "token" &&
              key !== "source" &&
              key !== "timestamp" &&
              key !== "token_id" &&
              key !== "usage" &&
              key !== "username" &&
              key !== "role" && (
                <div key={key}>
                  <label className="block text-sm text-gray-600 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded w-full px-2 py-1"
                  />
                </div>
              )
          )}
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            text="Cancel"
            onClick={onClose}
            className="bg-gray-500 text-white mr-0"
          />
          <Button
            text="Save"
            onClick={() => onSave(form)}
            className="bg-sky-600 text-white ml-0 mr-0"
          />
        </div>
      </div>
    </div>
  );
}
