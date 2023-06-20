import Image from "next/image";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitForm = () => {};

    return (
        <div className="flex w-full h-screen bg-white">
            <div className="w-[60%] flex items-center justify-center bg-gray-700">
                <form className="flex flex-col" onSubmit={handleSubmitForm}>
                    <label className="flex flex-col text-sm">
                    Email
                    <input
                        className="text-black mt-1 px-2 py-1 outline rounded"
                        type="email"
                        onChange={(evt) => setEmail(evt.target.value)}
                        value={email}
                    />
                    </label>
                    <label className="flex flex-col mt-4 text-sm">
                    Password
                    <input
                        className="text-black mt-1 px-2 py-1 outline rounded"
                        type="password"
                        onChange={(evt) => setPassword(evt.target.value)}
                        value={password}
                    />
                    </label>
                    <button className="mt-8 bg-gray-200 text-black rounded py-1 hover:bg-gray-400 hover:text-white" type="submit">Iniciar sesion</button>
                </form>
            </div>
            <div className="relative w-[40%] h-[100%]">
                <Image src="/pequeno-tronco-rio-selva-tropical.jpg" alt="Left image" fill className="object-cover" />
            </div>
      </div>
    );
};

export default Login;