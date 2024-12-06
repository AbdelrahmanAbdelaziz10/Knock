import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const useEmailContext = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const setEmailValue = (newEmail) => {
    setEmail(newEmail);
  };
  // console.log(email)

  return (
    <EmailContext.Provider value={{ email, setEmailValue }}>
      {children}
    </EmailContext.Provider>
  );
};
