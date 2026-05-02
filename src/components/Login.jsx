import { useContext } from "react";
import Modal from "../UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../UI/Button";

function Login() {
  const userPregressCtx = useContext(UserProgressContext);
  function handleClose() {
    userPregressCtx.hideLogin();
  }
  return (
    <Modal
      className="login"
      open={userPregressCtx.progress === "login"}
      onClose={handleClose}
    >
      {" "}
      <p>لطفا شماره مبایل خود را وارد کنید</p>
      <input type="text" placeholder=" (09xxxxxxxxx) شماره موبایل" />
      <Button textOnly onClick={handleClose}>
        بستن
      </Button>
    </Modal>
  );
}

export default Login;
