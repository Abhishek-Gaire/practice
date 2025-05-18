import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-lg font-bold">MERN App</Link>
                {authContext?.token ? (
                    <div>
                        <Link to="/dashboard" className="mr-4">Dashboard</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;