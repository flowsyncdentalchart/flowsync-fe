import "./button.css";

const Button = ({ children, type = "button", onClick }) => {
  return (
    <button className="button-login" type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;