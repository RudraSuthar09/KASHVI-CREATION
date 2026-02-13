import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div>
        <div className="relative">
          <img
            src={product?.media[0] || 'https://res.cloudinary.com/dpzxcxyqv/image/upload/v1739898388/bujwu2zzbilwtc1l54tt.webp'}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 truncate">{product?.title}</h2>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-[#f8f4f0] rounded-b-lg">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="bg-[#0a373b] hover:bg-[#085b60] text-white font-semibold px-4 py-2 rounded-md transition duration-200 ease-in-out"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="bg-[#e53e3e] hover:bg-[#c53030] text-white font-semibold px-4 py-2 rounded-md transition duration-200 ease-in-out"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
