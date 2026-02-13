import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Now an array
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrls, "uploadedImageUrls");

  function handleUploadFeatureImage() {
    if (uploadedImageUrls.length === 0) return; // Prevent empty uploads

    uploadedImageUrls.forEach((imageUrl) => {
      dispatch(addFeatureImage(imageUrl)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFile(null);
          setUploadedImageUrls([]); // Reset after upload
        }
      });
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedMediaUrl={uploadedImageUrls} // Updated prop name
        setUploadedMediaUrl={setUploadedImageUrls} // Ensure this updates an array
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full bg-[#0a373b] hover:bg-[#085b60]"
        disabled={uploadedImageUrls.length === 0} // Disable if no images uploaded
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div key={index} className="relative">
              <img
                src={featureImgItem.image}
                alt={`Uploaded ${index}`}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
