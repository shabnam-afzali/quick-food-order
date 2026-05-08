import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartToltal = cartCtx.items.reduce(
    (totlaPrice, item) => totlaPrice + item.quantity * item.price,
    0
  );
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const userProgressCtx = useContext(UserProgressContext);
  function handleClose() {
    userProgressCtx.hideCart();
  }
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify(
        JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        })
      )
    );
  }
  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        بستن{" "}
      </Button>
      <Button>ثبت سفارش</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === "checkout"}>
        <h2>موفقیت‌آمیز</h2>
        <p>سفارش شما با موفقیت ثبت شد!</p>
        <p>
          طی چند دقیقه آینده جزئیات بیشتر را از طریق ایمیل برایتان ارسال خواهیم
          کرد.
        </p>

        <p className="modal-actions">
          <Button onClick={handleFinish}>بستن</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <p>مبلغ کل : {currencyFormatter.format(cartToltal)} تومان</p>
        <Input label="نام" type="text" id="name" />
        <Input label="ایمیل" type="email" id="email" />
        <Input label="خیابان" type="text" id="Street" />
        <div className="control-row">
          <Input label="کد پستی" type="text" id="postal-code" />{" "}
          <Input label="شهر" type="text" id="city" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
