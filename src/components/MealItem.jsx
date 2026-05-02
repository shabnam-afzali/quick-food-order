import { useContext } from "react";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";
function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  function handleRemoveMealFromCart() {
    cartCtx.removeItem(meal.id);
  }
  const cartItem = cartCtx.items.find((item) => item.id === meal.id);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {!cartItem && (
            <Button onClick={handleAddMealToCart}>افزودن به سبد</Button>
          )}

          {cartItem && (
            <div className="cart-controls">
              <Button className="small" onClick={handleRemoveMealFromCart}>
                -
              </Button>
              <span>{cartItem.quantity}</span>
              <Button className="small" onClick={handleAddMealToCart}>
                +
              </Button>
            </div>
          )}
        </p>
      </article>
    </li>
  );
}

export default MealItem;
