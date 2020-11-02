import React, { createRef, useState } from "react";

import Input from "./Input";
import { eye, eyeSlash } from "../../imageVariables/index";

const PasswordInput = props => {
  const inputRef = createRef();
  const [showPassword, setShowPassword] = useState(false);
  const { className, ...inputprops } = props;

  const handleShowClick = event => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <Input
      type={showPassword ? "text" : "password"}
      ref={inputRef}
      {...inputprops}
      suffix={
        <span className="input-password__icon" onClick={handleShowClick}>
          <img src={showPassword ? eye : eyeSlash} alt="password" />
        </span>
      }
    />
  );
};

export default PasswordInput;
