import { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";

export function useShoppingCart() {
  const shoppingCart = useContext(ShoppingCartContext);

  if (shoppingCart == null) {
    throw new Error("useShoppingCart must be used within ShoppingCartProvider");
  }

  return shoppingCart;
}
