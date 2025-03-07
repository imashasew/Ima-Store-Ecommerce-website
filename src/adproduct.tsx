import { useState } from "react";

// Define types for the new product and the prop function
interface Product {
  name: string;
  price: string;
  image: string;
}

interface AdminPageProps {
  onAddProduct: (newProduct: Product) => void;
}

export function AdminPage({ onAddProduct }: AdminPageProps) {
  const [newProduct, setNewProduct] = useState<Product>({ name: "", price: "", image: "" });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result as string }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    onAddProduct(newProduct);
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg" style={{ backgroundColor: "#000000" }}>
      <h2 className="text-xl font-semibold mb-4" style={{ color: "#ffffff" }}>Add New Product</h2>

      <input 
        type="text" 
        placeholder="Product Name" 
        className="p-2 border border-gray-300 rounded w-full mb-2" 
        value={newProduct.name} 
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
      />

      <input 
        type="text" 
        placeholder="Price" 
        className="p-2 border border-gray-300 rounded w-full mb-2" 
        value={newProduct.price} 
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
      />

      {/* File Upload Input */}
      <input 
        type="file" 
        accept="image/*" 
        className="p-2 border border-gray-300 rounded w-full mb-2"
        onChange={handleImageUpload} 
      />

      {/* Show Image Preview if Uploaded */}
      {newProduct.image && (
        <div className="mt-2">
          <h3 className="text-white text-lg">Image Preview:</h3>
          <img 
            src={newProduct.image} 
            alt="Product Preview" 
            className="w-full h-48 object-cover rounded-md shadow-sm"
          />
        </div>
      )}

      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </div>
  );
}
