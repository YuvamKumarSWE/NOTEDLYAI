import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeolder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative input-box">
            <input 
                value={value} 
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                placeholder={placeolder || "Password"}
                className="" 
            />
            <button 
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;