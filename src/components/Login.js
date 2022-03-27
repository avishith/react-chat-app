import React from 'react'
import {GoogleOutlined,PhoneOutlined} from '@ant-design/icons'



import {firebase} from '../firebase'




const Login = ()=>{ 
    const loginWithGoogle = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider(); 
        firebase.auth().signInWithRedirect(provider).then((result)=>{
            console.log(result);} )
    }
    const loginWithPhone = ()=>{
        const provider = new firebase.auth.PhoneAuthProvider(); 
        firebase.auth().signInWithRedirect(provider).then((result)=>{
            console.log(result);} )
    }
  return (
    <div id="login-page">
        <div id="login-card">
            <h2>Welcome to Unichat</h2>
            <div 
                className="login-button google"
                onClick={loginWithGoogle}
            >
                    <GoogleOutlined /> Sign in with Google
            </div>
            <br/>
            <br/>

        <div className="login-button facebook"
        onClick={loginWithPhone}>
            <PhoneOutlined /> Sign in with Phone
        </div>

    </div>



    </div>
  );
}


export default Login