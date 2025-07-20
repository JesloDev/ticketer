import * as pdfjsLib from "pdfjs-dist";
import { useState } from "react";
import UploadPic from ".././assets/upload.png";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.mjs";

const apiUrl = import.meta.env.VITE_BASE_URL;

const Upload = () => {
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(""); // "extracting" | "uploading"

  const handleFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = null;
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    setMessage("");
    setProgress(0);

    try {
      if (ext === "pdf") {
        await handlePDF(file);
      }
      // else if (ext === "csv") {
      //   await handleCSV(file);
      // } else if (ext === "xlsx") {
      //   await handleXLSX(file);
      // }
      else {
        setMessage("Unsupported file format.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong while reading the file.");
    }
  };

  const sendToBackend = async (data) => {
    setPhase("uploading");
    setProgress(0);

    // Simulate uploading progress (adjust as needed)
    for (let i = 1; i <= 100; i += 10) {
      await new Promise((res) => setTimeout(res, 80));
      setProgress(i);
    }

    // Send to backend (you can replace with real endpoint)
    await fetch(`${apiUrl}/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setMessage("Upload successful!");
    setProgress(100);
    setPhase("");
  };

  const handlePDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      setPhase("extracting");
      setProgress(0);

      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str).join(" ");
        extractedText += strings + " ";

        setProgress(Math.round((i / pdf.numPages) * 100));
        await new Promise((res) => setTimeout(res, 50));
      }

      const ticketNumberRegex = /ticket number\.\s*:\s*([A-Za-z0-9]+)/gi;
      const ticketBatchRegex = /ticket batch no\.\s*:\s*([A-Za-z0-9-]+)/gi;

      const ticketNumbers = [...extractedText.matchAll(ticketNumberRegex)].map(
        (m) => m[1]
      );
      const ticketBatches = [...extractedText.matchAll(ticketBatchRegex)].map(
        (m) => m[1]
      );

      if (ticketNumbers.length === 0 || ticketBatches.length === 0) {
        setMessage("Could not find ticket numbers or ticket batch numbers.");
        setPhase("");
        return;
      }

      const batch = ticketBatches[0] || "unknown";
      const finalData = ticketNumbers.map((ticket_number, index) => ({
        token: ticket_number,
        token_id: `${batch}-${index + 1}`,
        usage: "available",
      }));

      console.log({ finalData });

      await sendToBackend(finalData);
    };

    reader.readAsArrayBuffer(file);
  };

  // const handleCSV = async (file) => {
  //   Papa.parse(file, {
  //     header: true,
  //     complete: function (results) {
  //       const data = results.data;
  //       const valid = data.filter(
  //         (row) => row.ticket_number && row.ticket_batch
  //       );
  //       if (valid.length > 0) {
  //         sendToBackend(
  //           valid.map(({ ticket_number, ticket_batch }) => ({
  //             ticket_number,
  //             ticket_batch,
  //           }))
  //         );
  //       } else {
  //         setMessage("CSV missing ticket_number or ticket_batch columns.");
  //       }
  //     },
  //   });
  // };

  // const handleXLSX = async (file) => {
  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     const workbook = XLSX.read(e.target.result, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const data = XLSX.utils.sheet_to_json(sheet);

  //     const valid = data.filter((row) => row.ticket_number && row.ticket_batch);
  //     if (valid.length > 0) {
  //       sendToBackend(
  //         valid.map(({ ticket_number, ticket_batch }) => ({
  //           ticket_number,
  //           ticket_batch,
  //         }))
  //       );
  //     } else {
  //       setMessage("Excel missing ticket_number or ticket_batch columns.");
  //     }
  //   };
  //   reader.readAsBinaryString(file);
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <img src={UploadPic} alt="upload" className="w-[200px]" />

      <label className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full cursor-pointer shadow transition duration-200">
        Choose File
        <input
          type="file"
          accept=".pdf,.csv,.xlsx"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {/* Progress Bar */}
      {phase && (
        <div className="w-full max-w-md mt-6">
          <p className="text-sm text-gray-700 mb-1">
            {phase === "extracting" ? "Extracting..." : "Uploading..."}{" "}
            {progress}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-sky-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default Upload;
