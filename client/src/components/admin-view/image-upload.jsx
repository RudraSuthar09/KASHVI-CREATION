import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedMediaUrl,
  setUploadedMediaUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);


  // Handle file changes from input or drag-and-drop
  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    if (selectedFiles.length > 0) setImageFile(selectedFiles[0]); // Set first selected file as imageFile
  }

  // Handle drag over event
  function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add("border-[#8b6b45]", "bg-[#fff9f0]");
  }

  // Handle drag leave event
  function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove("border-[#8b6b45]", "bg-[#fff9f0]");
  }

  // Handle file drop event
  function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove("border-[#8b6b45]", "bg-[#fff9f0]");
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    if (droppedFiles.length > 0) setImageFile(droppedFiles[0]); // Set first dropped file as imageFile
  }

  // Handle removal of file
  function handleRemoveFile(index) {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      if (updatedFiles.length === 0) {
        setImageFile(null); // Reset imageFile when all files are removed
      } else if (index === 0) {
        setImageFile(updatedFiles[0]); // Set the first remaining file as imageFile
      }
      return updatedFiles;
    });
  }

  // Upload files to cloud storage (e.g., Cloudinary)
  const uploadMediaToCloudinary = useCallback(async () => {
    if (files.length === 0) return;
  
    setImageLoadingState(true);
  
    const formData = new FormData();
    files.forEach((file) => formData.append("media", file));
  
    try {
      console.log("Uploading to backend:", [...formData.entries()]);
  
      const response = await axios.post("http://localhost:5000/api/admin/products/upload-media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Response:", response);
  
      if (response?.data?.success) {
        setUploadedMediaUrl(response.data.result.urls);
      } else {
        console.error("Upload failed:", response?.data);
      }
    } catch (error) {
      console.error("Media upload failed:", error);
    } finally {
      setImageLoadingState(false);
    }
  }, [files, setImageLoadingState, setUploadedMediaUrl]);
  

  useEffect(() => {
    if (files.length > 0) uploadMediaToCloudinary();
  }, [files, uploadMediaToCloudinary]);

  //preview for image and video
  const renderFilePreview = (file) => {
  const fileUrl = URL.createObjectURL(file);
  if (file.type.startsWith("image/")) {
    return (
      <img
        src={fileUrl}
        alt={file.name}
        className="w-12 h-12 object-cover rounded-md"
        //onLoad={() => URL.revokeObjectURL(fileUrl)}
      />
    );
  } else if (file.type.startsWith("video/")) {
    return (
      <video
        src={fileUrl}
        className="w-12 h-12 object-cover rounded-md"
       // onLoadedMetadata={() => URL.revokeObjectURL(fileUrl)}
      />
    );
  }
  return <FileIcon className="w-12 h-12 text-[#b2966c] flex-shrink-0" />;
};
  return (
    <div className={`w-full mt-6 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-3 block text-gray-800">Upload Images and Videos</Label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60 cursor-not-allowed" : ""
        } border-2 border-dashed border-[#b2966c] rounded-lg p-6 transition-all duration-200 hover:border-[#8b6b45] hover:bg-[#fff9f0] shadow-sm`}
      >
        <Input
          id="media-upload"
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          disabled={isEditMode}
        />
        {files.length === 0 ? (
          <Label
            htmlFor="media-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center min-h-[160px] space-y-3 text-gray-600 hover:text-gray-800`}
          >
            <UploadCloudIcon className="w-12 h-12 text-[#b2966c] transition-transform duration-200 group-hover:scale-110" />
            <div className="text-center space-y-2">
              <span className="font-medium block">Drag & drop your images here</span>
              <span className="text-sm text-gray-500">or click to browse files</span>
            </div>
            <div className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG, GIF</div>
          </Label>
        ) : imageLoadingState ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full bg-gray-100 rounded-md" />
            <Skeleton className="h-4 w-2/3 bg-gray-100 rounded-md" />
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                <div className="flex items-center flex-1 min-w-0">
                  {renderFilePreview(file)}
                  <p className="ml-3 text-sm font-medium text-gray-700 truncate">{file.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-4 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XIcon className="w-5 h-5" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {!imageLoadingState && files.length > 0 && (
        <p className="text-xs text-gray-500 mt-2 text-center">{files.length} file(s) ready for upload</p>
      )}
    </div>
  );
}

export default ProductImageUpload;
