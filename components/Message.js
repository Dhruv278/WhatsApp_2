import React from 'react'
import styled from 'styled-components'
import {auth} from './../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import moment from 'moment'
const Message = ({user,message}) => {
    const [logenInUser]=useAuthState(auth)
    // console.log(user)
    const TypeOfmessage=(user===logenInUser.email?Sender :reciever);
  

  
    return (
        <Container>
            <TypeOfmessage>{message.message}
          <TImestamp>  {message.timestamp?moment(message.timestamp).format('LT'):"..."}</TImestamp>
            </TypeOfmessage>
          
        </Container>
    )
}

export default Message

const Container=styled.div``;

const MessageElement=styled.p`
width:fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom:26px ;
position: relative;
text-align: right;


`;

const Sender=styled(MessageElement)`
margin-left: auto;
background-color: #dcf8c6;

`
;

const reciever=styled(MessageElement)`
background-color: whitesmoke;
text-align:left;
`;

const TImestamp=styled.span`
color:gray;
padding:10px;
font-size: 9px;
position:absolute;
bottom:0;
text-align:right;
right: 0;
`;
