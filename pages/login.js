import  styled  from 'styled-components';
import React from 'react'
import Head from 'next/head'
import { Button } from '@material-ui/core';
import {auth,provider} from './../firebase'


export const Login = () => {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
       
        <Container>
            <Head>
             <title>Login</title>
            </Head>
            <LoginContainer>
                <img className="login_image"src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
       
    )
}
 export default Login;


 const Container=styled.div`
 display: grid;
 place-items: center;
 height: 150vh;
 background-color: whitesmoke;
 @media only screen and (max-width: 400px) {
    height: 400px;
  
}
 `;

 const LoginContainer=styled.div`
 padding: 100px;
 display: flex;
 flex-direction: column;
 align-items: center;
 background-color: white;
 border-radius: 5px;
 box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
 @media only screen and (max-width: 500px) {
     padding: 30px;
  
}
 @media only screen and (max-width: 250px) {
     padding: 10px;
  
}

 `

 
 ;