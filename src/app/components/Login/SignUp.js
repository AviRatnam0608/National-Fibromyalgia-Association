import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from 'src/app/services/authService.js';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            console.log("Signed up successfully!");
            history.push('/dashboard'); 
        } catch (error) {
            console.error("Signup failed", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;