"use client";

import Image from 'next/image';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const [visiblePassword, setVisibility] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState<boolean>(false);
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignIn = async () => {
        setLoading(true);
        setClicked(true);

        if (email.length === 0 || password.length === 0) {
            setLoading(false);
            return;
        }

        const res = await fetch('/api/auth/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (res.status === 200) {
            const data = await res.json();
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('token', data.jwt);
            storage.setItem('type', data.type);
            storage.setItem('id', data.id);

            setLoading(false);
            if (data.type === "collaborateur") router.push("/collaborator/home");
            if (data.type === "RH") router.push("/RH/home");
            if (data.type === "TLorSTL") router.push("/TL_STL/home");
        } else {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className='bg-[url("/bg.png")] bg-cover bg-center h-screen w-screen'>
            <div className='bg-gradient-to-b from-[rgb(0,166,188,0.5)] via-[rgb(246,255,255,0.5)] to-[rgb(76,175,78,0.5)] h-screen w-screen'>
                <header>
                    <Image src="/logo.png" alt="Logo" width={180} height={38} priority />
                </header>
                <main className='flex flex-col items-center justify-center'>

                    <form className='bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 items-start justify-center lg:w-[50vw] w-[80vw] ' onSubmit={e => e.preventDefault()}>
                        <div className='text-center w-full'><h1 className='text-3xl'>Sign In</h1></div>
                        <label>Business Email or ID</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='text'
                            placeholder='Enter your email or Id'
                            className='border-black border-solid border rounded-md p-2 w-full'
                        />
                        {clicked && email.length === 0 && <p className='text-red-500'>Email is required</p>}
                        
                        <label>Password</label>
                        <div className='border-black border-solid border rounded-md p-2 flex items-center w-full'>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type={visiblePassword ? "text" : "password"}
                                placeholder='Enter your password'
                                className='outline-none w-full'
                            />
                            {visiblePassword
                                ? <FaEyeSlash className='cursor-pointer' onClick={() => setVisibility(false)} />
                                : <FaEye className='cursor-pointer' onClick={() => setVisibility(true)} />}
                        </div>
                        {clicked && password.length === 0 && <p className='text-red-500'>Password is required</p>}

                        <div className='flex flex-col lg:flex-row md:flex-row justify-between w-full'>
                            <div>
                                <input
                                    checked={remember}
                                    type='checkbox'
                                    className='m-2'
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <label>Remember me</label>
                            </div>
                            <a className='text-[#E86969] cursor-pointer'>Forgot Password?</a>
                        </div>
                        {error && <p className='text-red-500'>Invalid email or password</p>}
                    </form>

                    <button
                        type="button"
                        className='bg-gradient-to-r from-[#4CAF4F] to-[#0E64D2] text-white px-4 py-2 rounded-lg mt-4 lg:w-[50vw] w-[80vw]'
                        onClick={handleSignIn}
                    >
                        {loading ? "...." : "Sign In"}
                    </button>
                </main>
            </div>
        </div>
    );
}