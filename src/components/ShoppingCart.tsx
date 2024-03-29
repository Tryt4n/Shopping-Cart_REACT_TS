// Context
import { useShoppingCart } from "../context/useShoppingCart";
// Data
import storeItems from "../data/items.json";
// Bootstrap
import { Offcanvas, Stack } from "react-bootstrap";
// Components
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";

type ShoppingCartPropsType = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartPropsType) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas
      show={isOpen}
      placement="end"
      onHide={closeCart}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              {...item}
            />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
