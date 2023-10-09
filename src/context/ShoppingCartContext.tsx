// React
import { ReactNode, createContext, useState } from "react";
// Components
import { ShoppingCart } from "../components/ShoppingCart";
// Hooks
import { useLocalStorage } from "../hooks/useLocalStorage";

export type CartItemType = {
  id: number;
  quantity: number;
};

type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItemType[];
};

type ShoppingCartProviderPropsType = {
  children: ReactNode;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export function ShoppingCardProvider({ children }: ShoppingCartProviderPropsType) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItemType[]>("shoppingCart", []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsCartOpen(true);

  const closeCart = () => setIsCartOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === id) == null) {
        return [...prevItems, { id, quantity: 1 }];
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === id)?.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  const contextValues = {
    openCart,
    closeCart,
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
    cartQuantity,
    cartItems,
  };

  return (
    <ShoppingCartContext.Provider value={contextValues}>
      <>
        {children}
        <ShoppingCart isOpen={isCartOpen} />
      </>
    </ShoppingCartContext.Provider>
  );
}
