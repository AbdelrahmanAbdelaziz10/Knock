import React, { createContext, useState } from 'react';

export const CartCountContext = createContext();

const CartCountProvider = ({ children }) => {

    let allCartItems = JSON.parse(localStorage.getItem('all-cart-items'))

    const [count, setCount] = useState(() => {
        if (allCartItems) return allCartItems.length
        return 0
    });

    return (
        <CartCountContext.Provider value={{ count, setCount }}>
            {children}
        </CartCountContext.Provider>
    );
};

export default CartCountProvider