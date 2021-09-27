
import { Avatar, IconButton } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { useCollection } from 'react-firebase-hooks/firestore'
import { InsertEmoticon, Mic, ArrowBack,Send } from '@material-ui/icons'
import Message from './Message'
import firebase from 'firebase'
import TimeAgo from 'timeago-react'
const ChatScreen = ({ chat, messages }) => {
    const endOfmessageRef=useRef(null)
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input,setInput]=useState('')
    const [messagesSnapShot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'))
    const [recipientSnapShot]=useCollection(
        db.collection('users').where('email','==',getRecipientEmail(chat.users, user))
        )
        
        
        
       
        const showMessages = () => {
            if (messagesSnapShot) {
                // console.log('this is done')
                return messagesSnapShot.docs.map(message =>{
                    // console.log(message.data())
                    
                    return(
                        <Message
                        key={message.id} 
                        user={message.data().user} 
                        message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
             
                 />
                )})
            }else{
                JSON.parse(messages).map(message=>(
                    <Message
                    key={message.id} 
                    user={message.user} 
                    message={message} />
           ))
        }

    }

   const scrollToBottom=()=>{
       endOfmessageRef.current.scrollIntoView({
           behavior:"smooth",
           block:"start",
       })
   }

    const sendMessage=(e)=>{
        e.preventDefault();
       if(input.trim().length===0){
           setInput('')
           return null;
       }
        db.collection('users').doc(user.uid).set({
            lastseen:firebase.firestore.FieldValue.serverTimestamp(),

        },{merge:true})
        scrollToBottom();
         const t=  firebase.firestore.FieldValue.serverTimestamp()
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:t,
            message:input,
            user:user.email,
            photoURL:user.photoURL ,           

        })
        
        setInput('');
    }
    const moveBackToHomeScreen = () => {
        router.push('/')
    }
    const recipientEmail=getRecipientEmail(chat.users, user)
   const recipient=recipientSnapShot?.docs?.[0]?.data(); 
     
    return (
        <Container>
            <Header>
                {window.innerWidth < 500 ? (
                    <div className="back">

                        <IconButton>

                            <ArrowBack onClick={moveBackToHomeScreen} />
                        </IconButton>
                      {recipient?( <Avatar src={recipient.photoURL} className="userAvatar" />):( <Avatar className="userAvatar" >{recipientEmail[0]}</Avatar>)}
                       
                    </div>) : 
                     (<div style={{alignItems:"center"}}>{recipient? <Avatar src={recipient.photoURL} className="userAvatar" />:<Avatar className="userAvatar" >{recipientEmail[0]}</Avatar>}</div>)
                    
                    }

                <HeaderInformation >
                    <h3 className="recipientEmail"> {recipientSnapShot?recipient?recipient?.name:recipientEmail:"Loading"}</h3>
                    {recipientSnapShot?(
                    <p>Last Active : {' '}
                       {recipient?.lastseen?.toDate ? (
                           <TimeAgo datetime={recipient?.lastseen?.toDate()} />
                       ):"Unavailable"}
                    </p>
                    ):<p>Loading Last active ...</p>}
                </HeaderInformation>
                {window.innerWidth > 500 ? (<HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>) : null}


            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfmessageRef}/>
            </MessageContainer>
            <InputContainer className="InputContainer">
                <InsertEmoticon />
                <div style={{flex:"1",backgroundColor:"whitesmoke",borderRadius:'10px' ,display:'flex'}}>
                <Input value={input} onChange={e=>setInput(e.target.value)}  onKeyPress={event => {
                if (event.key === 'Enter') {
                  sendMessage(event)
                }
              }} />
                <IconButton disabled={!input} onClick={sendMessage}><Send /></IconButton>
                    </div>
                
                <Mic />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen


const Container = styled.div``;


const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top:0;
display: flex;
padding: 11px;
align-items: center;
`;

const HeaderInformation = styled.div`
margin-left: 15px;
flex:1;

>h3{
    margin-bottom: 3px;

}
>p{
    font-size: 14px;
    color: gray;
}
`;


const HeaderIcons = styled.div``;


const MessageContainer = styled.div`
padding: 30px;
background-color: #e5ded8;
min-height: 90vh;
`;


const EndOfMessage = styled.div`
margin-bottom:50px;
`;

const InputContainer = styled.div`

display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: white;
z-index: 100;
@media only screen and (max-width: 500px) {
    padding-bottom: 20px;
}
`;

const Input = styled.input`
flex: 1;
outline: 0;
border:none;
border-radius: 10px;
background-color: whitesmoke;
padding: 20px;
margin-left: 15px;
margin-right: 2px;



`;

