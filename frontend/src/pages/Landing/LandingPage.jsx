import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

 
  return (
    <div className="flex justify-center items-center h-screen bg-[#1a0223d5]">
        <div className="w-96 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold mb-4">Welcome to NotedlyAI</h1>
            <p className="text-gray-700 mb-4">
            Your AI-powered note-taking assistant. Capture, organize, and manage your notes effortlessly.
            </p>
            <div className="flex justify-between">
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
                <button
                    onClick={handleSignUp}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                    Sign Up
                </button>
            
            </div>
        </div>
 </div>
  );
}

export default LandingPage;