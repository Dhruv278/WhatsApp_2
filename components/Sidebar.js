
import React from 'react'
import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { auth, db } from './../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatListPage from './ChatListPage'
function Sidebar() {
    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatSnapShot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat ');
        if (!input) {
            return null
        }
        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            // we need to add chat into DB 'chat' collection
            db.collection('chats').add({
                users: [user.email, input],

            })

        }

    }

    const chatAlreadyExists = (recipientEmail) => {
        return !!chatSnapShot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0)
    }
    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <IconContainers>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconContainers>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search In chats" />

            </Search >
            <SidebarButton onClick={createChat} style={{backgroundColor:"#dcf8c6",cursor:"pointer"}}>Start a new chat</SidebarButton>

            {/* List of chats */}
            <ChatListPage chatSnapShot={chatSnapShot} />


        </Container>
    )
}

const Container = styled.div`
flex:0.45 ;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 350px;
@media  only screen  and (max-width:500px){
    max-width:100% ;
} 
overflow-y:scroll ;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

`
const Header = styled.div`
display: flex;
position: sticky;
top: 0;
background-color:#efefef;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 50px;
height: 80px;
border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover{
    opacity: 0.8 ;
}
`;
const IconContainers = styled.div``;


const Search = styled.div`
display: flex;
align-items: center;
padding:5px;
border-radius:2px;
`;

const SearchInput = styled.input`
outline-width: 0;
border:none;
flex: 1;

`;


const SidebarButton = styled(Button)`
width: 100%;

&&&{
border-top:2px solid whitesmoke ;
border-bottom: 2px solid whitesmoke;
}
`

export default Sidebar
