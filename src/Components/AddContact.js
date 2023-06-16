// import React from "react";

// class AddContact extends React.Component {
//   state = {
//     name: "",
//     email: "",
//   };

//   add = (e) => {
//     e.preventDefault();
//     if (this.state.name === "" || this.state.email === "") {
//       alert("All the fields are mandatory!");
//       return;
//     }
//     this.props.addContactHandler(this.state);
//     this.setState({ name: "", email: "" });
//     //to return to contact list page after adding
//     //this.props.history.push("/");
//    // this.navigate('/');
//   };

//   render() {
//     return (
//       <div className="ui main">
//         <h2>Add Contact</h2>
//         <form className="ui form" onSubmit={this.add}>
//           <div className="field">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={this.state.name}
//               onChange={(e) => this.setState({ name: e.target.value })}
//             />
//           </div>
//           <div className="field">
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               value={this.state.email}
//               onChange={(e) => this.setState({ email: e.target.value })}
//             />
//           </div>
 
//           <button className="ui button blue" >Add</button>

          
//         </form>
//       </div>
//     );
//   }
// }

// export default AddContact;


import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function AddContact(props) {
    const navigate = useNavigate();

    const state = {
        name:"",
        email:"",
    }
    const [data,setData] = useState(state);

    const add = (e) => {
        e.preventDefault();//to prevent default at refresh
        if(data.name === "" || data.email === ""){
            alert("All the fields are mandatory");
            return;
        }
        props.addContactHandler(data);
        setData({name:"",email:""});
        //console.log(this.sate);   
        navigate('/');
    }
    // useEffect(async()=>{
    //    const  res = await fetch('www.localhost:/apicall')
    // })
    return(
        <div className='ui main'>
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={add}>
                <div className='field'>
                 <label>Name</label>
                 <input 
                 type="text" 
                 name="name" 
                 placeholder='Name' 
                 value={data.name}
                 onChange={(e)=> setData({...data,name:e.target.value})}    
                 />
                </div>
                <div className='field'>
                 <label>Email</label>
                 <input 
                 type="text" 
                 name="email" 
                 placeholder='Email'
                 value={data.email}
                 onChange={(e)=> setData({...data,email:e.target.value})}    
                 />
                </div>
                <button className='ui button blue'> Add</button>
            </form>
        </div>
    );

}

export default AddContact ;
