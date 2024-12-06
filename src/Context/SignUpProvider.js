import React, { createContext, useContext, useState } from "react";

const SignUpContext = createContext();

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);

    const setResponse = (data) => {
        setResponseData(data);
    };

    return (
        <SignUpContext.Provider value={{ responseData, setResponse }}>
            {children}
        </SignUpContext.Provider>
    );
};
