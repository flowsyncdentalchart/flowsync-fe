import "./button.css";

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button className={`button-login ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;