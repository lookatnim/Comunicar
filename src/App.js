import './App.css';
import cLogo from './img/comunicar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {db} from "./firebase-config"
import { useState, useEffect } from 'react';
import { getDocs , collection, addDoc ,doc ,deleteDoc} from "firebase/firestore";
import Edit from "./Edit";




function App() {
  const [newName,setNewName] = useState([""]);
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState([0]);
  const [contacts, setContacts] = useState([]);
  const contactCollectionRef = collection(db,"contactData");

  const createContact = async () => {
    await addDoc(contactCollectionRef,{name:newName,email:newEmail,mobile:Number(newMobile)});
    window.location.reload();
  }

  const deleteContact = async (id) =>{
    const contactDoc = doc(db,"contactData",id);
    await deleteDoc(contactDoc);
    window.location.reload();
  }

  

  useEffect (()=>{
    const getContacts = async () => {
      const data = await getDocs(contactCollectionRef);
      setContacts(data.docs.map((doc)=>({...doc.data(),id: doc.id})));
    };
    getContacts();
  },[]);

  


  return (
    <div className="App">
      <div className="wrapper">
      <div className="nav">
        <div id="logo">
          <img src={cLogo} alt='#'/>
        </div>
        <div id="searchBar">
          <input type="text" placeholder='Search'/>
          <button><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></button>
        </div>
      </div>
          <div className="body">
            <div className="displayData">          
                <h1>Name</h1>
                <h1>Email</h1>
                <h1>Mobile</h1>
              {contacts.map((con) => {
              return (
                <div className={con.id}>
                  <h2>{con.name}</h2>
                  <h2>{con.email}</h2>
                  <h2>{con.mobile}</h2>                  
                  <Edit id={con.id} name={con.name} email = {con.email} mobile = {con.mobile}/>
                  <button id='delete' onClick={()=>{deleteContact(con.id)}}> Delete </button>
                </div> 
              )
            })}
            </div>
          </div>
          <div className="addcontac">
            <h2><FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> Create New Contact</h2> 
            <div id="name">
            <input placeholder='Enter Name' type='text' onChange={(event)=>{setNewName(event.target.value);}} />
            </div>
            <div id="email">
            <input placeholder='Enter Email' type='text' onChange={(event)=>{setNewEmail(event.target.value);}} />
            </div>
            <div id="mobile">
            <input placeholder='Enter Mobile' type='text' onChange={(event)=>{setNewMobile(event.target.value);}} />
            </div>
            <div id="sbtn">
            <button id='save' onClick={createContact}>Save</button>
            </div>          
          </div>
      </div>
      </div>
    
  );
}

export default App;
