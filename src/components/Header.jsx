import { useContext } from "react";
import LogoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <h1>فست فود ملورین</h1>
        <Button darkbtn>تا ۱۰٪ تخفیف</Button>
      </div>
      <nav>
        <Button darkbtn onClick={handleShowCart}>
          سبد خرید({totalItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
