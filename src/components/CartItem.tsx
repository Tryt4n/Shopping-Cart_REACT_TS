// Context
import { useShoppingCart } from "../context/useShoppingCart";
// Data
import storeItems from "../data/items.json";
// Types
import { CartItemType } from "../context/ShoppingCartContext";
// Utils
import { formatCurrency } from "../utils/formatCurrency";
// Bootstrap
import { Button, Stack } from "react-bootstrap";

export function CartItem({ id, quantity }: CartItemType) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item === null) return null;

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-center"
    >
      <img
        src={item?.imgUrl}
        alt={item?.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.name}{" "}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{ fontSize: ".65em" }}
            >
              x{quantity}
            </span>
          )}
        </div>
        <div
          className="text-muted"
          style={{ fontSize: ".75em" }}
        >
          {item && formatCurrency(item.price)}
        </div>
      </div>
      <div>{item && formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
