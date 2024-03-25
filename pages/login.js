import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/app/firebase';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const toggleForm = () => setIsLogin(!isLogin);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/Dashboard');
        } catch (error) {
            console.error('Authentication failed: ', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-lg font-bold mb-4 text-center">{isLogin ? 'Login' : 'Signup'}</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                    </div>
                    <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4" disabled={loading}>
                        {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Signup')}
                    </button>
                </form>
                <button onClick={toggleForm} className="text-sm text-primary hover:underline">
                    {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;