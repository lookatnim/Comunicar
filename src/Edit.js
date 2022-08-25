import { useState ,useEffect } from "react";
import {db} from "./firebase-config"
import { getDocs , collection ,doc ,updateDoc} from "firebase/firestore";
import './edit.css';


const Edit = (props) =>{
    const { id , name, email, mobile } = props;
    const [expand,setExpand] = useState(false);
    const toggelExpand = () => {
        setExpand(prevExpand => !prevExpand)
    }

    const [newName,setNewName]= useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newMobile, setNewMobile] = useState([0]);
    const [contacts, setContacts] = useState([]);
    const contactCollectionRef = collection(db,"contactData");
    //const userDoc = doc(db,"contactData",id);

    //update data
  const updateContact = async () =>{
    const userDoc = doc(db,"contactData",id);
    //const newField = {name : newName, email : newEmail, mobile : newMobile};
    if(name != newName){
      const newField = {name : newName};
      await updateDoc(userDoc,newField);
    }
    if(email != newEmail){
      const newField = {email : newEmail};
      await updateDoc(userDoc,newField);
    }
    if(mobile != newMobile){
      const newField = {mobile : newMobile};
      await updateDoc(userDoc,newField);
    }
    //await updateDoc(userDoc,newField);
    window.location.reload();
  }



    useEffect (()=>{
        const getContacts = async () => {
          const data = await getDocs(contactCollectionRef);
          setContacts(data.docs.map((doc)=>({...doc.data(),id: doc.id})));
        };
        getContacts();
      },[]);
    
    return(
        <div className="edit">
            <button id="edit" onClick={toggelExpand}>Edit</button>
            {
                expand && <div>
                    <input type="text" defaultValue={name}  onChange={(event)=>{setNewName(event.target.value);}} />
                    <input defaultValue={email} onChange={(event)=>{setNewEmail(event.target.value)}}/>
                    <input defaultValue={mobile} onChange={(event)=>{setNewMobile(event.target.value)}}/>
                    <button onClick={()=>updateContact()}>Save</button>
                </div>
            }
        </div>
    )
}

export default Edit;