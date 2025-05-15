
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContent = createContext();

const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    
    const getAuthState = async () => {
        const savedAuthState = localStorage.getItem('isLoggedIn');

        if (savedAuthState) {
            setIsLoggedIn(true);
            getUserData();
        } else {
            try {
                
                const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
                if (data.success) {
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', 'true');
                    getUserData();
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
            if (data.success) {
                setUserData(data.userData);
                localStorage.setItem('userData', JSON.stringify(data.userData));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }
        getAuthState();
    }, []);

    const value = { backendUrl, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData };

    return <AppContent.Provider value={value}>{props.children}</AppContent.Provider>;
};

export { AppContent, AppContextProvider };
