const getRecipientEmail=(users,userLoggedIn)=>{
    // console.log(users,userLoggedIn)
       return users.filter(userToFilter=> userToFilter !== userLoggedIn.email)[0]

}
export default getRecipientEmail