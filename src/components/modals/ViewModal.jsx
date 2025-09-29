import Button from "../Button";

export default function ViewModal({ student, onClose }) {
  const entries = Object.entries(student);

  return (
    <div className="fixed inset-0 bg-[#000000c9] flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white w-[600px] rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
          Student Details
        </h2>
        <div className="space-y-1 text-sm">
          {entries.map(([key, value], index) => (
            <div
              key={key}
              className={`flex justify-between px-4 py-2 rounded ${
                index % 2 === 0 ? "bg-gray-200" : "bg-white"
              }`}
            >
              <span className="font-medium capitalize text-gray-600">
                {key.replace(/_/g, " ")}:
              </span>
              <span className="text-gray-800 text-right">
                {value?.toString() || "-"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            text="Close"
            onClick={onClose}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full shadow transition m-0"
          />
        </div>
      </div>
    </div>
  );
}
