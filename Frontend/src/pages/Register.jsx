import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData,{
        withCredentials:true,
      });
      console.log(response);
      if(response.status === 201){
        toast.success("Registration successful!");
        setUser(response.data.newUser);
        console.log(response.data);
        navigate("/home");
      }
    }
    catch(error)
    {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error);
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-[#001E2B] flex items-center justify-center px-4">
      {/* Glow Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#112733] border border-[#1f3a47] rounded-3xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-white text-center">
            Join
            <span className="text-[#00ED64]"> HireWise</span>
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Create your account and start preparing smarter.
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
                className="w-full mt-2 bg-[#112733] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ED64]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full mt-2 bg-[#112733] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ED64]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full mt-2 bg-[#112733] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ED64]"
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
                className="w-full mt-2 bg-[#112733] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ED64]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00ED64] text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?
            <span className="text-[#00ED64] cursor-pointer ml-2">
              <Link to="/login">
              Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}