
import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'
const Chat = ({messages,chat}) => {
    const [user]=useAuthState(auth);
    // console.log(chat)
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users,user)}</title>
            </Head>
          
            {window.innerWidth>500 ? <Sidebar />:null}
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat


export async function getServerSideProps(context){
    // console.log("working1")
 const ref=db.collection('chats').doc(context.query.id);

 const messagesRes=await ref
                            .collection('messages')
                            .orderBy("timestamp","asc")
                            .get()

 const messages=messagesRes.docs.map(doc=>({
     id:doc.id,
     ...doc.data()
 })).map(message=>({
     ...message,
     timestamp:message.timestamp.toDate().getTime()
 }))
      const chatRes=await ref.get();        
      const chat={
          id:chatRes.id,
          ...chatRes.data()
              }       
            //   console.log(messages,chat)
      return {
          props:{
              messages:JSON.stringify(messages),
              chat:chat
          }
      }      
}


const Container=styled.div`
display: flex;

`;

const ChatContainer=styled.div`
flex:1;
overflow:scroll ;
height: 100vh;

::-webkit-scrollbar{
    display: none;

}
-ms-overflow-style:none;
scrollbar-width: none;
`;