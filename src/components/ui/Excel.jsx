import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, AlertCircle, Loader2 } from 'lucide-react';
import api from '@/services/handleApiCalls';

function Excel() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  // File selection handler
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && /\.(xlsx|xls|csv)$/i.test(file.name)) {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Please select a valid Excel file (.xlsx, .xls, .csv)');
      setSelectedFile(null);
    }
  };

  // Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Upload file to server
  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setError('');

    try {
      const base64String = await convertToBase64(selectedFile);
      const response = await api.post('/api/excel/upload', {
        fileName: selectedFile.name,
        fileData: base64String,
      });

      if (response.data?.success) {
        setIsPopupOpen(false);
        console.log('Upload successful:', response.data.parsedData);
      } else {
        setError('Error processing file');
      }
    } catch (error) {
      setError('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  // Render upload popup
  const renderUploadPopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md mx-4 overflow-hidden bg-white shadow-2xl rounded-xl">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Upload Excel File
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPopupOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Select Excel or CSV file
            </label>
            <div className="p-6 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400">
              <div className="space-y-2">
                <Upload size={32} className="mx-auto text-gray-400" />
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: .xlsx, .xls, .csv (Max 10MB)
                </p>
              </div>
            </div>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <Upload size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-blue-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
          <Button
            variant="outline"
            onClick={() => setIsPopupOpen(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading && <Loader2 size={16} className="mr-2 animate-spin" />}
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <>
      <Button
        onClick={() => setIsPopupOpen(true)}
        className="text-white bg-blue-600 shadow-lg hover:bg-blue-700"
      >
        <Upload size={16} className="mr-2" />
        Upload Excel File
      </Button>

      {isPopupOpen && renderUploadPopup()}
    </>
  );
}

export default Excel;
