import React,{useRef,useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import { avatar, ChatEngine } from "react-chat-engine";
import {firebase} from "../firebase"

import { useAuth } from "../contexts/AuthContexts";
import axios from "axios";

const Chats =()=>{
    const history = useHistory();
    const { user } = useAuth();
    const   [isLoading,setIsLoading] = useState(true);

    const logoutNow = async() => {
        await firebase.auth().signOut();
        history.push("/");
    }

const getFiles=async(url)=>{
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg",{type: "image/jpg"});
}


    useEffect(() => {
        if (!user) {
            history.push("/");
            return;
        }
        axios.get("https://api.chatengine.io/users/me",{
            headers:{
                "project-id":"f7de09e8-b3a5-44d1-a1c3-7f96202169e4",
                "user-name":user.email,
                "user-secret":user.uid,
            }

        }).then(()=>{
            setIsLoading(false);
        }).catch(()=>{
            let formData = new FormData();
           formData.append("username",user.email);
           formData.append("email",user.email);
           formData.append("secret",user.uid);

           getFiles(user.photoURL)
                .then((avatar)=>{
                        formData.append("avatar",avatar,avatar.name);

                        axios.post("https://api.chatengine.io/users/",
                            formData,
                            {headers:{"private-key":process.env.REACT_APP_CHAT_ENGINE_KEY}}  
                         )
                    .then(()=> setIsLoading(false))
                    .catch((err)=>console.log(err))
                })
 
    })
    }, [user, history]);

    if (!user || isLoading) {
        return "Loading...";
    }


    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    FastChat
                </div>
                <div className="logout-tab" onClick={logoutNow} >
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>

    );
}
export default Chats;