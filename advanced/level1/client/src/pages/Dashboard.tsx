import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface User {
    email: string;
    role: string;
}

const Dashboard: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${authContext?.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
                setUserData(data);

                if (authContext?.role === 'admin') {
                    const { data: users } = await axios.get('http://localhost:5000/api/users/all', config);
                    setAllUsers(users);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [authContext]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Dashboard</h1>
            {userData && (
                <div className="mb-4">
                    <h2 className="text-xl">Your Profile</h2>
                    <p>Email: {userData.email}</p>
                    <p>Role: {userData.role}</p>
                </div>
            )}
            {authContext?.role === 'admin' && (
                <div>
                    <h2 className="text-xl mb-2">All Users</h2>
                    <ul>
                        {allUsers.map((user) => (
                            <li key={user.email} className="border p-2 mb-2">
                                {user.email} - {user.role}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;