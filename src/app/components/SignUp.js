import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from 'src/app/services/authService.js';
import { authService, firestoreOperations } from '../services'; 

function SignUp() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [institution, setInstitution] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [expertise, setExpertise] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredentials = await authService.signUpWithEmail(email, password); // Make sure to collect password if not already
            const userId = userCredentials.user.uid;
            await firestoreOperations.createUserProfileDocument(userId, {
                name,
                title,
                institution,
                email,
                address,
                phone,
                department,
                expertise,
                supervisorName,
                additionalInfo
                // other fields as necessary
            });
        } catch (error) {
            console.error("Failed to create user", error);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input value={institution} onChange={e => setInstitution(e.target.value)} placeholder="Institution or Company" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" type="tel" />
            <input value={department} onChange={e => setDepartment(e.target.value)} placeholder="Department" />
            <input value={expertise} onChange={e => setExpertise(e.target.value)} placeholder="Expertise" />
            <input value={supervisorName} onChange={e => setSupervisorName(e.target.value)} placeholder="Supervisor's Name and Title" />
            <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} placeholder="Additional Information" />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;