import { createContext, useState } from "react";
const UserProgressContext = createContext({
  progress: "", //cart , checkout, login
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showLogin: () => {},
  hideLogin: () => {},
});
export function UserProgressContextProvider({ children }) {
  const [userPregress, setUserProgress] = useState("");
  function showLogin() {
    setUserProgress("login");
  }
  function hideLogin() {
    setUserProgress("");
  }
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  const userProgressCtx = {
    progress: userPregress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    showLogin,
    hideLogin,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
export default UserProgressContext;
