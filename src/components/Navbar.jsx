import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../UI/Button";

function Navbar() {
  const userPregressCtx = useContext(UserProgressContext);

  function handleShowLogin2() {
    userPregressCtx.showLogin();
  }

  return (
    <div className="navbar">
      <ul className="navlist">
        <li>تماس با ما</li>
        <li>درباره</li>
        <li>صفحه اصلی</li>
      </ul>
      <Button onClick={handleShowLogin2}>ورود</Button>
    </div>
  );
}

export default Navbar;
