import UploadPic from ".././assets/upload.png";

const DownloadRecord = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white aspect-square w-[300px] rounded-lg shadow-sm">
      <img src={UploadPic} alt="upload" className="w-[150px] rotate-180" />

      <label className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full cursor-pointer shadow transition duration-200">
        Download Document
        <input
          type="file"
          accept=".pdf,.csv,.xlsx"
          // onChange={handleFile}
          className="hidden"
        />
      </label>

      {/* Progress Bar */}
      {/* {phase && (
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
      )} */}

      {/* {message && <p className="mt-4 text-sm text-gray-700">{message}</p>} */}
    </div>
  );
};

export default DownloadRecord;
