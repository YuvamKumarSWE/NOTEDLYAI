import { useEffect } from "react";
import {Link} from "react-router-dom"
import PasswordInput from "../../components/PasswordInput";
const Login = () => {

    useEffect(() => {
        document.title = "Login - NotedlyAI"
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        
        console.log(email);
    }
    return (
        <div className="flex justify-center items-center mt-32 m-5">
           <div className="w-96 p-6 bg-white rounded-lg shadow-xl" >
            <form action="" onSubmit={handleSubmit}>
                <h3 className="text-2xl mb-7" >Login</h3>

                <input type="text" placeholder="Email" className="input-box" />
                <PasswordInput placeholder="Password" />
                
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