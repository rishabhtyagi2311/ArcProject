import React from 'react'
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedRoom, UserAuthDetails } from '../../Atoms/atoms';
import {getSocket} from '../../services/socket.js' ;
import { Editor } from '@tinymce/tinymce-react';





function DoubtRoom() {
  const [content, setContent] = useState('');

  const handleEditorChange = (content, editor) => {
    console.log('Content:', content);
    setContent(content);
  };
  const room = useRecoilValue(selectedRoom)
  const [msg , setMsg] = useState()
  const [messages, setMessage] = useState([])
  const  socket = useMemo( () => 
    {
      const socket = getSocket()
      return socket.connect()
    })
  const userDetails = useRecoilValue(UserAuthDetails)
 
useEffect( () =>{

      socket.emit("ins-join-room" , {
        roomId: room,
        userId: userDetails.userID
      }
    )

      socket.on("success-join" , (msg) =>{
            console.log(msg);

            
      })

      socket.on("new-message", (data) => {
        setMessage((prev) => [...prev, data]);
      });

} , [])

function sendMsg() {
  if (msg) {
    socket.emit("new-message", {
      message: msg,
      roomId: room
    });
    setMsg(""); 
  }
}
  return (
    <div>

    {
        messages && messages.length > 0 &&  
        messages.map((item, index) => (
          <div key={index}>{item.message}</div>
        ))
      
    }



      <input
        type="text"
        value={msg || ""}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <button onClick={ () => {
            sendMsg()

      }}>
          send
      </button>
      
      <Editor
        apiKey="69vkkz3yw0et1cmvfknnbxkbg7u73aj1a1eduzmhhb0s31yn" 
        
        init={{
          height: 200,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  )
}

export default DoubtRoom
