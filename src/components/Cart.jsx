import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  const userPregressCtx = useContext(UserProgressContext);
  function handleClose() {
    userPregressCtx.hideCart();
  }
  function handleCheckOut() {
    userPregressCtx.showCheckout();
  }
  const cartCtx = useContext(CartContext);
  const cartTotol = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  return (
    <Modal
      className="cart"
      open={userPregressCtx.progress === "cart"}
      onClose={userPregressCtx.progress === "cart" ? handleClose : null}
    >
      <h2>سبد خرید</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotol)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          بستن
        </Button>
        {cartCtx.items.length > 0 ? (
          <Button onClick={handleCheckOut}> رفتن به صفحه پرداخت</Button>
        ) : null}
      </p>
    </Modal>
  );
}

export default Cart;
