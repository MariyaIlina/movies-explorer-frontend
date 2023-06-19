import "./Input.css";

function Input({ label, name, value, type, onChange, error }) {
  return (
    <label className="input__label">
      {label}
      <input
        className="input"
        name={name}
        value={value}
        type={type}
        onChange={onChange}
      />
      <p className="input__error">
        <span id={error}></span>
      </p>
    </label>
  );
}
export default Input;
