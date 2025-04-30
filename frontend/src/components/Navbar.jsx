import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile'; 
import { TfiWrite } from "react-icons/tfi";
import { toast } from 'react-toastify';


const Navbar = ({ userInfo }) => {

    

    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        toast.success("Logout successful!");
        navigate("/login");
    }

    return (
        <nav className="bg-[#2b093675] shadow-md mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <TfiWrite className="text-2xl text-slate-200" />
                        <Link to="/dashboard" className="text-xl font-bold text-white"> NotedlyAI </Link>
                    </div>

                    

                    <div className="flex space-x-8">
                      <Profile userInfo={userInfo} onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;