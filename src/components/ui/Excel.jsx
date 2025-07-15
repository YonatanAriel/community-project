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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Excel or CSV file
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
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
            {isUploading && <Loader2 size={16} className="animate-spin mr-2" />}
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
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
      >
        <Upload size={16} className="mr-2" />
        Upload Excel File
      </Button>

      {isPopupOpen && renderUploadPopup()}
    </>
  );
}

export default Excel;
