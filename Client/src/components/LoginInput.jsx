import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { fadeInOut } from '../animations';
import { MdVisibility, MdVisibilityOff, MdErrorOutline } from 'react-icons/md';

const LoginInput = ({ placeHolder, icon, inputState, inputStateFunc, type, isSignUp }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? 'shadow-md shadow-red-400' : 'shadow-none'
      }`}
    >
      {icon}
      <input
        type={isPasswordVisible ? 'text' : type}
        placeholder={placeHolder}
        className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none'
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onInvalid={() => setShowError(true)}
        onInput={() => setShowError(false)}
        autoComplete='off'
      />
      {type === 'password' && (
        <button
          type='button'
          className='focus:outline-none'
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <MdVisibilityOff className='text-headingColor text-xl' />
          ) : (
            <MdVisibility className='text-headingColor text-xl' />
          )}
        </button>
      )}
      {showError && (
        <MdErrorOutline className='text-red-500 text-xl' />
      )}
    </motion.div>
  );
};

export default LoginInput;
