import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
//after refreshing we were losing the data....
//so we will use local storage....useeffect..stringyfy...json etc
///baad mein we are using api
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import api from '../api/contacts';
import EditContact from "./EditContact";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const[searchTerm,setSearchTerm] = useState("");
  const[searchResults,setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    //to add contacts in the api...post call
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);

  //  console.log(contacts)
  
    setContacts([...contacts, response.data]);
  };

  

  //edit..update
  const updateContactHandler =async (contact) => {
    console.log(contact)
    
    const response = await api.put(`/contact/${contact.id}`,contact);
   
    // console.log(contact);
    // console.log(response.data);
    const {id,name,email} = response.data;


    setContacts(contacts.map((contact)=>{
      return contact.id === id? {...response.data} : contact;
    }));
  }


  //delete ffunction
  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact)=>{
        // console.log(Object.values(contact));
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  }
  //retrieveContacts from json api made ..fetch call
  //////now we are using data stores in our own api....not using localstorage
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div className="ui container">
    <Router>
      <Header />
      <Routes>
       <Route 
         path="/" exact 
         Component={()=>(<ContactList contacts={searchTerm.length<1 ?contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} setTerm={setSearchTerm} searchKeyword = {searchHandler}/> 
         )} 
        />
       <Route 
         path="/add" 
         Component={()=>(<AddContact addContactHandler={addContactHandler} />
         )}  
       />
     <Route path="/edit/:id" contacts={contacts} element={<EditContact updateContactHandler={updateContactHandler} />} />

       <Route path="/contact/:id" contacts={contacts} Component={ContactDetail}/>
      </Routes>
      
      
      {/* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
    </Router>

    </div>
  );
}

export default App;

// /* <Route 
//          path="/" exact 
//          //1st approach was component..which rerenders everytime...2nd approach is better
//          render={(props)=>(<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)}
//     />
//     <Route 
//          path="/add" 
//          render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler} />)} 
//     /> */


