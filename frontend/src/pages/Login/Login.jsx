import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!validator.isEmail(email)) {
            setError("Invalid Email");
            return;
        }
        
        if (!password) {
            setError("Password is required");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });
            
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                toast.success("Login successful!");
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again later.");
            }
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Login - NotedlyAI";
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-[#1a0223]">
            <div className="w-full max-w-md p-8 m-4 bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        Welcome Back
                    </h3>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            className="w-full p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-90 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-70"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>

                    <p className="text-gray-300 text-center mt-6">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-purple-400 font-medium hover:text-pink-400 transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;