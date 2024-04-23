import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../src/app/firebase'; 
import { doc, setDoc } from 'firebase/firestore';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [institution, setInstitution] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [expertise, setExpertise] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const router = useRouter();

    const toggleForm = () => setIsLogin(!isLogin);

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email address is already in use.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/operation-not-allowed':
                return 'This operation is not allowed. Please contact support.';
            case 'auth/weak-password':
                return 'The password is too weak. Please enter a stronger password.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError({});

        if (!isLogin && !passwordRegex.test(password)) {
            setError({ password: 'Password must meet the requirements.' });
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                router.push('/Dashboard');
            } else {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                const userData = {
                    email,
                    name,
                    title,
                    institution,
                    address,
                    phone,
                    department,
                    expertise,
                    supervisorName,
                    additionalInfo,
                    identity: 'researcher'
                };
                await setDoc(doc(db, 'Profiles', userCred.user.uid), userData);
                router.push('/Dashboard');
            }
        } catch (error) {
            console.error('Authentication failed: ', error);
            setError({ form: getErrorMessage(error.code) });
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-lg font-bold mb-4 text-center">{isLogin ? 'Login' : 'Signup'}</h1>
                {error.form && <p className="text-red-500">{error.form}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                        {!isLogin && password && !passwordRegex.test(password) && <p className="text-red-500 text-xs italic">Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.</p>}
                    </div>
                    {!isLogin && (
                        <>
                            {/* Additional signup fields */}
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="institution">Institution or Company:</label>
                                <input type="text" id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone:</label>
                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="department">Department:</label>
                                <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="expertise">Expertise – Area of Specialty:</label>
                                <input type="text" id="expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="supervisorName">Name and Title of Supervisor:</label>
                                <input type="text" id="supervisorName" value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)} required className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                            <div>
                                <label htmlFor="additionalInfo">Additional Information:</label>
                                <textarea id="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} className="border rounded w-full py-2 px-3 text-black mb-4" />
                            </div>
                        </>
                    )}
                    <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4" disabled={loading || (password && !passwordRegex.test(password) && !isLogin)}>
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