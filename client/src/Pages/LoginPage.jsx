import { use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const[redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);



async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
        const {data} = await axios.post('/login',{email,password}, {withCredentials:true} );
        setUser(data);
        alert('Login successful');
        setRedirect(true);
        navigate("/");
    }catch(e){
        alert('Login failed. Please try again');
    }
    
}




    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input 
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={ev => setEmail(ev.target.value)} />
                <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={ev=> setPassword(ev.target.value )} />
                <button className="primary">login</button>
                <div className="text-center py-2 text-gray-500">
                    Dont have an account yet?
                    <Link className="underline text-black" to= {'/register'}> Register Now</Link>
                </div>
            </form>
            </div>
            
        </div>
    ); 
}
