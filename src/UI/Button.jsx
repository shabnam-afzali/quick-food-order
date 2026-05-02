function Button({ children, darkbtn, textOnly, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  if (darkbtn) {
    cssClasses = "darkBtn";
  }
  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
