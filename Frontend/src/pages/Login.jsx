import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try
    {
      console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData,{
        withCredentials:true,
      });
      if(response.status === 200){
        toast.success("Login successful!");
        setUser(response.data.user);
        navigate("/home");
      }
    }
    catch(error)
    {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-[#001E2B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#112733] border border-[#1f3a47] rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-white text-center">
            Welcome Back to
            <span className="text-[#00ED64]"> HireWise</span>
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Login to continue your interview preparation journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-gray-300">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="w-full mt-2 bg-[#0D2530] border border-[#1f3a47] rounded-lg px-4 py-3 text-white focus:border-[#00ED64] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full mt-2 bg-[#0D2530] border border-[#1f3a47] rounded-lg px-4 py-3 text-white focus:border-[#00ED64] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00ED64] hover:bg-[#00d95b] text-black py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#00ED64] ml-2 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}