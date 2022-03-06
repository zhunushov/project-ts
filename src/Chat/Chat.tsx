import { addDoc, collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, firebase } from '../Auth/Firebase';
import { useAuth } from '../store/action-creators/auth';


const Chat = () => {
    const user = useAuth()
    const [values, setValues] = useState('')

    const  messegesCollenction = collection(db, "message")
    const [ messages, loading ] = useCollectionData(
        query(messegesCollenction, orderBy('createAt'))
    )

    const getMessage = async  () => {
            try {
               const res = await query(collection(db, "message")) 
                 onSnapshot(res, item => {
                 item.forEach((elem) => {
                     messages?.push(elem)
                 } )
               })
            } catch (error) {
               console.log(error);
            }
    }

    useMemo(() => {
        getMessage()
    }, [])

    if(loading) {
        return <h1>loading...</h1>
    }
        
    const sendMessage = async () => {
        try {
            await addDoc(collection(db, "message"), {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: values,
                createAt: firebase.firestore.FieldValue.serverTimestamp() 
            }) 
            setValues('')
         } catch (error) {
            console.log(error);
         }
    } 
    
    return (
        <div>
            <div style={{width: "80%", height: "60vh", border: "1px solid gray", overflow: "auto "}}>
                   {
                     messages ? messages?.map(mes => (
                       <div style={{margin: "10px",
                              border: user.uid === mes.uid ? "2px solid green" : "2px dashed red",
                              marginLeft: user.uid === mes.uid ? "auto" : "10px",
                              width : 'fit-content', padding: "5px"}}
                              key={mes.id} >
                           <span >
                               <img src={mes.photoURL} />
                               <div> {mes.displayName}</div>
                           </span>
                           <div>{mes.text} </div>
                           
                       </div>
                    ))
                    : <h1>loading...</h1>
                   }
                </div>
            <input type="text" value={values} onChange={e => setValues(e.target.value)} />
            <button onClick={sendMessage}>send</button>
        </div>
    );
};

export default Chat;