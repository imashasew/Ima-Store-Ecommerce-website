// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { AdminPage } from "./adproduct";
import { Product, CartItem } from "./types";
import { Login } from "./login";
import { Signup } from "./signup";
import { Footer } from "./footer";  // Import Footer component

// Image Imports
import headphonesImage from "./assets/images/headphones.jpeg";
import smartwatchImage from "./assets/images/smartwatch1.jpeg";
import cameraLensImage from "./assets/images/camera-lens.jpeg";
import laptopImage from "./assets/images/laptop.jpg";
import phoneImage from "./assets/images/phone.jpeg";
// App Component (Wraps Router)
export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

// Component to handle routes
function AppRoutes() {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Wireless Headphones", price: 3120.00, image: headphonesImage },
    { id: 2, name: "Smart Watch 1GEN", price: 2200.00, image: smartwatchImage },
    { id: 3, name: "Iphone-16pro max", price: 330000.00, image: phoneImage },
    { id: 4, name: "Laptop-HP 12OH", price:231400.00, image: laptopImage },
    { id: 5, name: "Laptop-DEL 130G", price: 231700.00, image: laptopImage},
    { id: 6, name: "Smart Watch 2GEN", price: 4250.00, image: smartwatchImage },
    { id: 7, name: "Camera Lens-345K", price: 8330.00, image: cameraLensImage },
    { id: 8, name: "Laptop-MSI-342L", price: 41900.00, image: laptopImage },
    
    { id: 10, name: "Smart Watch 3GEN-TY8", price: 9300.00, image: smartwatchImage },
    { id: 11, name: "Camera Lens-ZONY", price: 12400.00, image: cameraLensImage },
    { id: 12, name: "Laptop-ASUS-IO7YU", price: 311600.00, image: laptopImage },
    { id: 9, name: "Wireless Headphones-12WE", price: 5100.00, image: headphonesImage }
  ]);

  // Add to Cart Logic
  const handleAddToCart = (product: Product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems((current) =>
      quantity === 0
        ? current.filter((item) => item.product.id !== productId)
        : current.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
    );
  };

  // Filter Products by Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Admin Add Product
  const handleAddProduct = (newProduct: { name: string; price: string; image: string }) => {
    setProducts((prev) => [
      ...prev,
      { id: prev.length + 1, name: newProduct.name, price: parseFloat(newProduct.price), image: newProduct.image }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header with Navigation */}
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => navigate("/login")}
        onSignupClick={() => navigate("/signup")} user={undefined} onLogout={undefined}      />

      {/* Routing Logic */}
      <Routes>
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
              {/* Search Box */}
              <div className="flex justify-center">
  <input
    type="text"
    placeholder="Search products..."
    className="p-2 mb-4 border border-gray-300 rounded"
    style={{ width: '30%' }}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>
<br></br><br></br>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>

              <br />

              {/* Admin Toggle Button */}
              <div className="flex justify-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mb-6"
                  onClick={() => setIsAdmin((prev) => !prev)}
                >
                  {isAdmin ? "Close " : "Go to Add Product"}
                </button>
              </div>

              {/* Admin Product Management */}
              {isAdmin && <AdminPage onAddProduct={handleAddProduct} />}
            </main>
          }
        />
        

        <Route path="/login" element={<Login onSwitchToSignup={() => navigate("/signup")} />} />
        <Route path="/signup" element={<Signup onSwitchToLogin={() => navigate("/login")} />} />
      </Routes>

      {/* Shopping Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={handleUpdateQuantity} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
