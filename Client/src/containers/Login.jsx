import React, { useState } from 'react';
import {LoginBg} from  "../assets"; 
import {Logo} from "../assets";
import {FaEnvelope, FaLock, FcGoogle} from "../assets/icons"
import {LoginInput} from "../components"
import {motion} from "framer-motion";
import { HiScale } from 'react-icons/hi2';
import { buttonClick } from '../animations';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { app } from "../config/firebase.config" 
import { validateUserJWTToken } from '../api';
import {useNavigate} from "react-router-dom";

const Login = () => {

const [userEmail, setUserEmail] = useState("");
const [isSignUp, setIsSignUp] = useState(false);
const [password, setPassword] = useState('');
const [confirm_password, setConfirm_Password] = useState();
const navigate= useNavigate();

const firebaseAuth = getAuth(app) 



const provider = new GoogleAuthProvider();


const loginWithGoogle = async () =>{ 
  await signInWithPopup(firebaseAuth, provider).then(userCred => {
firebaseAuth.onAuthStateChanged(cred => {
   if(cred){
    cred.getIdToken().then(token => {
       validateUserJWTToken(token).then(data =>{
        console.log(data);
       })
       navigate("/",{replace:true})
    })
   }
})

  })
};

const signUpWithEmailPass = async () =>{
if(userEmail === ''|| password === '' || confirm_password === ''){

}
else{
  if(password ===confirm_password){
         setUserEmail("")
         setConfirm_Password("")
         setPassword("")
await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
  firebaseAuth.onAuthStateChanged(cred => {
    if(cred){
     cred.getIdToken().then(token => {
        validateUserJWTToken(token).then(data =>{
         
          console.log(data);
        })
        navigate("/",{replace:true})
     })
    }
 })
})
  }else{
  
  }
}

}


const signInWithEmailPass = async () => { 
if( userEmail !== "" && password !== "") {
await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred =>{
  firebaseAuth.onAuthStateChanged(cred => {
    if(cred){
     cred.getIdToken().then(token => {
        validateUserJWTToken(token).then(data =>{
         
          console.log(data);
        })
        navigate("/",{replace:true})
     })
    }
 })
})
}else{

}
}


  return (
    <div className="w-screen h-screen relative overflow-hidden flex">

<img src={LoginBg} className=" w-full h-full object-cover absolute top-0 left-0" alt="" />
<div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
  <div className='flex items-center justify-center gap-4 w-full'>
    <img src={Logo} className="w-12" alt="" />
    <p className="text-headingColor font-semibold text-2xl">
    ShreeRadheKrishn
    </p>
  </div>
  <p className='text-3xl font-semibold text-headingColor'>RadheRadhe</p>
  <p className='text-xl text-textColor -mt-6'>{isSignUp ? "SignUp" : "SignIn"} Here</p>
<div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
  <LoginInput placeHolder= {"Email Here"} icon={<FaEnvelope className="text-xl text-textColor"/>} inputState={userEmail} inputStateFunc={setUserEmail} type="email" isSignUp={isSignUp} />
  <LoginInput placeHolder= {"Password Here"} icon={<FaLock className="text-xl text-textColor"/>} inputState={password} inputStateFunc={setPassword} type="password" isSignUp={isSignUp} />
  {
    isSignUp && ( <LoginInput placeHolder= {"Confirm Password Here"} icon={<FaLock className="text-xl text-textColor"/>} inputState={confirm_password} inputStateFunc={setConfirm_Password} type="password" isSignUp={isSignUp}
    />
    )}
{!isSignUp ? (<p>Doesn't have an account: <motion.button {...buttonClick} className='text-red-400 underline cursor-pointer bg-transparent' onClick={() => setIsSignUp(true)}>Create One</motion.button></p>) : (<p> Already have an account: <motion.button {...buttonClick} className='text-red-400 underline cursor-pointer bg-transparent' onClick={() => setIsSignUp(false)}>Sign-in Here</motion.button></p>)}
 {isSignUp ?  <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-250' onClick={signUpWithEmailPass}>
Sign Up
  </motion.button> :  <motion.button {...buttonClick} onClick={signInWithEmailPass} className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-250'>
Sign In
  </motion.button>}

</div>
<div className='flex items-center justify-between gap-16 '>
  <div className='w-24 h-[1px] rounded-md bg-white'>

  </div>
  <p className='text-white'>or</p>
  <div className='w-24 h-[1px] rounded-md bg-white'>

</div>
</div>
<motion.div {...buttonClick} className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4' onClick={loginWithGoogle}>
<FcGoogle className='text-3xl'/>
<p classsName="capitalize text-base text-headingColor" >Signin with Google</p>
</motion.div>
</div>
    </div>
  )
}

export default Login
