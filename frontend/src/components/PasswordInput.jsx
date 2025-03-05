import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const PasswordInput = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input 
                value={value} 
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="input-box" 
            />
            <button 
                type="button"
                onClick={togglePassword}
                className="text-xl absolute right-3 top-6 transform -translate-y-1/2 text-blue-500 hover:text-gray-400"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;