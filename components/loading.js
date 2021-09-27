import React from 'react'
import { Circle} from 'better-react-spinkit'

const Loading = () => {
    return (
        <center style={{display:"grid",placeItems:"center" ,height:"130vh"}}>
            <div>
                <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" 
                alt="whatsapp 2.0"
                height={200}
                width={200}
                style={{marginBottom: 10}}
                ></img>
                <Circle color="#3cbc2b" size={60} />
            </div>
        </center>
    )
}

export default Loading
