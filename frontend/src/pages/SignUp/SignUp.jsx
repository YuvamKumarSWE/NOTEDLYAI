import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Name is required");
            return;
        }

        if (!validator.isEmail(email)) {
            setError("Invalid Email");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        //API call FOR FUTURE
        console.log("SignUp");
    }

    useEffect(() => {
        document.title = "Sign Up - NotedlyAI"
    }, [])
   
    return (
        <div className="flex justify-center items-center mt-32 m-5">
           <div className="w-96 p-6 bg-white rounded-lg shadow-xl">
            <form onSubmit={handleSubmit}>
                <h3 className="text-2xl mb-7">Sign Up</h3>

                <input 
                    type="text" 
                    placeholder="Name" 
                    className="input-box" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Email" 
                    className="input-box" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <PasswordInput 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button type="submit" className="btn-primary">Sign Up</button>

                <p className="text-sm text-center mt-4"> 
                    Already have an account?{" "} 
                    <Link to="/login" className="text-blue-500 font-medium underline">Login</Link>
                </p>
            </form>
           </div>
        </div>
    )
}   

export default SignUp;