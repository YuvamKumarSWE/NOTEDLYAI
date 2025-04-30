import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiEdit3, FiLayers, FiSearch, FiShield } from "react-icons/fi";

function LandingPage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.title = "NotedlyAI - Your Smart Note Taking Assistant";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-[#1a0223] text-white overflow-hidden overflow-y-hidden">
            {/* Navbar */}
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    NotedlyAI
                </div>
                <div className="space-x-4">
                    <button 
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 rounded-lg hover:text-purple-300 transition-all">
                        Log In
                    </button>
                    <button 
                        onClick={() => navigate("/signup")}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container mx-auto px-6 pt-12 pb-24">
                <div className="flex flex-col md:flex-row items-center">
                    <div className={`md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                            Supercharge Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Notes</span> with AI
                        </h1>
                        <p className="text-lg mb-10 text-gray-300 max-w-lg">
                            Capture ideas, organize thoughts, and boost your productivity with our intelligent note-taking solution.
                        </p>
                        <div className="space-x-4">
                            <button 
                                onClick={() => navigate("/signup")}
                                className="px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 shadow-lg shadow-purple-500/30 transition-all text-lg font-medium">
                                Get Started — Free
                            </button>
                        
                        </div>
                    </div>
                    <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="relative">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-20"></div>
                            
                            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 p-5 z-10">
                                <div className="flex space-x-2 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="border-b border-gray-700 pb-3 mb-4">
                                    <div className="font-medium text-lg">My Project Notes</div>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        "Meeting summary with client",
                                        "Project milestones and deadlines",
                                        "Research findings for new feature"
                                    ].map((note, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-gray-800/70 hover:bg-gray-800 transition-all cursor-pointer">
                                            <div className="text-sm font-medium">{note}</div>
                                            <div className="text-xs text-gray-400 mt-1">Updated {i + 1} hour{i !== 0 ? 's' : ''} ago</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-900/30 backdrop-blur-md py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FiEdit3 className="text-pink-500" size={24} />,
                                title: "Smart Editing",
                                description: "Write and format your notes with our intuitive editor"
                            },
                            {
                                icon: <FiLayers className="text-purple-500" size={24} />,
                                title: "Organization",
                                description: "Keep your notes organized "
                            },
                            {
                                icon: <FiSearch className="text-blue-500" size={24} />,
                                title: "Instant Search",
                                description: "Find your notes in seconds "
                            },
                            {
                                icon: <FiShield className="text-green-500" size={24} />,
                                title: "Secure Storage",
                                description: "Your notes are encrypted and securely stored"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                                <div className="bg-gray-700/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button 
                            onClick={() => navigate("/signup")}
                            className="px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 shadow-lg shadow-purple-500/20 transition-all text-lg font-medium">
                            Start Using NotedlyAI
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default LandingPage;