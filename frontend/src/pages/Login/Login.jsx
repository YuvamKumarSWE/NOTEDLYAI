import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            setError("Invalid Email");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        //API call FOR FUTURE
        console.log("Login");
    }

    useEffect(() => {
        document.title = "Login - NotedlyAI"
    }, [])
   
    return (
        <div className="flex justify-center items-center mt-32 m-5">
           <div className="w-96 p-6 bg-white rounded-lg shadow-xl" >
            <form action="" onSubmit={handleSubmit}>
                <h3 className="text-2xl mb-7" >Login</h3>

                <input type="text" placeholder="Email" className="input-box" onChange={(e) => setEmail(e.target.value) }/>

                <PasswordInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                {error && <p className="text-red-500 text-sm mt-2" >{error}</p>}

                <button type="submit" className="btn-primary" >Login</button>

                <p className="text-sm text-center mt-4" > 
                    Don't have an account?{" "} 
                    <Link to="/signup" className="text-blue-500 font-medium underline" >Sign Up</Link>
                </p>
            </form>
           </div>
        </div>
    )
}   

export default Login;