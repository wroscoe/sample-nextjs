import { useState } from 'react';

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Upload error');
    }
    setUploading(false);
  };

  return (
    <div className="p-10">
      <h3 className="text-2xl font-bold mb-4">Upload PDF</h3>
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={handleFileChange}
        className="mb-2"
      />
      {file && (
        <p className="text-sm mb-2">Selected file: {file.name}</p>
      )}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="py-2 px-4 border bg-blue-500 text-white"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
