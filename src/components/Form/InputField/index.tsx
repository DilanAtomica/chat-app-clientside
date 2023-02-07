import React from 'react';
import "./index.css";
import {AiFillUnlock} from "react-icons/ai";
import {GoAlert} from "react-icons/go";
import {BsFillPersonFill} from "react-icons/bs";

type inputFieldProps = {
    label: "Email" | "Password" | "Confirm Password" | "Username",
    showPassword?: boolean,
    setShowPassword?: (showPassword: boolean) => void,
    errorMsg: string | undefined,
    obligated: boolean,
    register: any
}

function InputField({label, showPassword, setShowPassword, errorMsg, register, obligated}: inputFieldProps) {
    return (
        <div className="inputContainer">
            <label htmlFor={label === "Email" ? "emailInput" : "passwordInput"}>{obligated && "*"}{label}:</label>
            <div style={{border: errorMsg ? "1px solid #F7BE61" : "1px solid black"}} className="inputFieldContainer">

                {(label === "Email" || label === "Username")
                    ? <BsFillPersonFill id="avatarIcon" />
                    : <AiFillUnlock id="lockIcon" />}

                {label === "Password"
                    ? <input  {...register("password")} role="passwordInput" type={showPassword ? "text" : "password"}
                              placeholder="" id="passwordInput"
                              style={{backgroundColor: errorMsg ? "#FFEAC8" : "white"}} />
                : label === "Confirm Password"
                    ? <input  {...register("confirmPassword")} role="confirmPasswordInput" type={showPassword ? "text" : "password"}
                              placeholder="" id="confirmPasswordInput" style={{backgroundColor: errorMsg ? "#FFEAC8" : "white"}}/>

                : label === "Email"
                    ? <input  {...register("email")} type="email" placeholder="example@domain.com" id="emailInput"
                              style={{backgroundColor: errorMsg ? "#FFEAC8" : "white"}}/>

                : label === "Username"
                     ? <input  {...register("username")} type="text" placeholder="" id="usernameInput"
                               style={{backgroundColor: errorMsg ? "#FFEAC8" : "white"}}/>: <></>}

                {(label === "Password" || label === "Confirm Password") &&
                 <button onClick={() => setShowPassword && setShowPassword(!showPassword)} type="button"
                         role={label === "Password" ? "showPasswordBtn" : "showConfirmPasswordBtn"}>
                    {showPassword ? "Hide" : "Show"}
                </button>}

            </div>

            {errorMsg &&
            <div className="errorMsgContainer">
                <p className="errorMsg"><GoAlert id="alertIcon" />{errorMsg}</p>
            </div>}
        </div>
    );
}

export default InputField;