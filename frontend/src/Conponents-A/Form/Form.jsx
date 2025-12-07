import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import "./Form.css"


const Form = () => {
    return (
        <div className='forms'>
            <div className="FormPage">
                <h1 className='Welcome'>Welcome</h1>
                <input type="text" placeholder='Email' className='Input1'/>
                <input type="text" placeholder='Password' className='Input2'/>
                <button className='FormButton'>Login</button>

                <div className="bottomBar">
                    <h5>Forgot Password</h5>
                    <h4>Sing Up</h4>
                </div>

                <div className="AuthBar">
                    <h4>OR LOGIN WITH</h4>
                    <div className="Auths">
                        <FcGoogle  className='FacebookIcon1'/>
                        <SiFacebook className='FacebookIcon'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form