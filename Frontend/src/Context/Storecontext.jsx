import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context outside the component
 export const StoreContext = createContext(null);

 const StoreContextProvider = (props) => {
  // State management
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [foodList, setFoodList] = useState([]);
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      return newCart;
    });

    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 0) {
        newCart[itemId] -= 1;
        if (newCart[itemId] === 0) {
          delete newCart[itemId];
        }
      }
      return newCart;
    });

    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      if (quantity > 0) {
        const itemInfo = foodList.find(product => product._id === itemId);
        return total + (itemInfo?.price || 0) * quantity;
      }
      return total;
    }, 0);
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load cart data
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.success ? response.data.cartData : {});
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems({});
    }
  };

  // Initial data loading
  useEffect(() => {
    const initialize = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    };
    initialize();
  }, []);

  // Load cart when token changes
  useEffect(() => {
    if (token) loadCartData(token);
  }, [token]);

  // Context value
  const contextValue = {
    food_list: foodList,
    cartItems,
    setcartItem: setCartItems,
    addToCart,
    removeFromCart,
    getTotalcartAmount: getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Named exports for context and provider;
export default StoreContextProvider;