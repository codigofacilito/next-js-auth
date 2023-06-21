import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { replace } = useRouter();

    const handleSubmitForm = async (evt: { preventDefault: () => void; }) => {
        evt.preventDefault();

        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        try {
            const result = await fetch("http://localhost:3000/api/auth/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    lastName,
                    phone,
                    address
                })
            });

            const response = await result.json();

            if (response && result.status === 200) {
                replace('/auth/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex w-full h-screen bg-white">
            <div className="w-[60%] flex items-center justify-center bg-gray-700 flex-col">
                <h2 className="text-2xl mb-4">Registro</h2>
                <form className="flex flex-col w-2/5" onSubmit={handleSubmitForm}>
                    <label className="flex flex-col text-sm">
                        Email
                        <input
                            className="text-black mt-1 px-2 py-1 outline rounded"
                            type="email"
                            onChange={(evt) => setEmail(evt.target.value)}
                            value={email}
                        />
                    </label>
                    <label className="flex flex-col text-sm mt-3">
                        Name
                        <input
                            className="text-black mt-1 px-2 py-1 outline rounded"
                            type="text"
                            onChange={(evt) => setName(evt.target.value)}
                            value={name}
                        />
                    </label>
                    <label className="flex flex-col text-sm mt-3">
                        Last name
                        <input
                            className="text-black mt-1 px-2 py-1 outline rounded"
                            type="text"
                            onChange={(evt) => setLastName(evt.target.value)}
                            value={lastName}
                        />
                    </label>
                    <label className="flex flex-col text-sm mt-3">
                        Phone
                        <input
                            className="text-black mt-1 px-2 py-1 outline rounded"
                            type="number"
                            onChange={(evt) => setPhone(evt.target.value)}
                            value={phone}
                        />
                    </label>
                    <label className="flex flex-col text-sm mt-3">
                        Address
                        <input
                            className="text-black mt-1 px-2 py-1 outline rounded"
                            type="text"
                            onChange={(evt) => setAddress(evt.target.value)}
                            value={address}
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
                    <label className="flex flex-col mt-4 text-sm">
                        Confirm Password
                        <input
                            className="text-black mt-1 px-2 py-1 outline rounded"
                            type="password"
                            onChange={(evt) => setConfirmPassword(evt.target.value)}
                            value={confirmPassword}
                        />
                    </label>
                    {error ? <p className="text-red-500 mt-4">{error}</p> : null}
                    <button
                        className="mt-8 bg-gray-200 text-black rounded py-1 hover:bg-gray-400 hover:text-white"
                        type="submit"
                        disabled={!email || !password || !name || !lastName || !phone || !address}
                    >
                            Registrarse
                    </button>
                </form>
            </div>
            <div className="relative w-[40%] h-[100%]">
                <Image
                    src="/forest-path.png"
                    alt="Left image"
                    fill
                    className="object-cover"
                />
            </div>
      </div>
    );
};

export default SignUp;