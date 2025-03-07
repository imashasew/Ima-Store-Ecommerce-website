import { useState } from "react";

export function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for testing (replace with backend validation in real app)
    const validEmail = "Imasha@gmail.com";
    const validPassword = "ima123";

    if (email === validEmail && password === validPassword) {
      // Store user info in localStorage (for example)
      localStorage.setItem("user", email);
      // Redirect to homepage or dashboard
      window.location.href = "/"; // Replace with your homepage or dashboard URL
    } else {
      // Show error message if credentials are incorrect
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
    <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
