
import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = (props) =>  {
  const location = useLocation();
  const navigate = useNavigate();

  //console.log("hiiiii");

  const { contacts } = location.state || {}; // Set a default empty object if location.state is null or undefined
const { id, name, email } = contacts || {}; // Set default values for id, name, and email if contact is null or undefined

  //const { id, name, email } = location.state.contact; 
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(name);
  
 // const {updateContactHandler} = useContactsCrud();
  

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    props.updateContactHandler({id, name: newName, email : newEmail});
    setNewName("");
    setNewEmail("")
    navigate("/");
  };

    return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
}

export default EditContact;
