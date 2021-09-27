import React from 'react'
import styled from 'styled-components'
import {Avatar} from '@material-ui/core'
import getRecipientEmail from '../utils/getRecipientEmail'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth,db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter} from 'next/router'
import {useHistory} from 'react-router-dom'
const Chat = ({id,users}) => {
    const router=useRouter();
    const [user]=useAuthState(auth)
    const recipientEmail=getRecipientEmail(users,user)
    const [recipientSnapshot]=useCollection(db.collection('users').where('email','==',recipientEmail))
    const recipient=recipientSnapshot?.docs?.[0]?.data()
    // console.log(recipient)
    // console.log(window.innerWidth,window.outerWidth)
     const enterChat=()=>{
        // console.log('helloj')
        router.push(`/chat/${id}`)
     }
    return (
        <Container onClick={enterChat}>
            {recipient?(

                <UserAvatar src={recipient?.photoURL} />
            ):(
            <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )
            }
            <p>{recipientSnapshot?recipient?recipient?.name:recipientEmail:"Loading"}</p>
        </Container>
    )
}

export default Chat


const Container=styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover{
    background-color: #e9eaeb;
}

`;

const UserAvatar=styled(Avatar)`
margin:5px;
margin-right: 15px;
`;