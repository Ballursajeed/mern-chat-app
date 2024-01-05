import React from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {

   const navigate = useNavigate();

  //state
const [ inputs, setInputs ] = React.useState({
   name:"",
   email:"",
   password:""
 })

 const handleSubmit = async(e) => {

 e.preventDefault()
  try {

   const { data } = await axios.post('http://localhost:8000/api/user/register',{
   	name:inputs.name,
   	 email:inputs.email,
   	 password:inputs.password,

   	 });

  console.log(data);
  console.log("Email:",inputs.email);
  console.log("Name:",inputs.name);
  console.log("password:",inputs.password);

   if (data?.success === false) {
     const errorMessage = data.message;
      toast.error(`Error: ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
  }

   if (data.success) {
       setUser(data.user.name);

        toast.success("User registered successfully");
        navigate("/chats")
   }
  }catch (error) {
     console.log(error)
  }

 }


const handleChange = (e) => {
  const { name, value } = e.target;
  setInputs((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
      return(
     <>
      <form onSubmit={handleSubmit}>
   <div className="mb-3 mt-5">
    <label htmlFor="Name" className="htmlForm-label">Name</label>
    <input
    type="name"
    name="name"
    placeholder="name"
     onChange={handleChange}
     className="htmlForm-control" id="Name" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
    <input
    type="email"
    name="email"
     onChange={handleChange}
     className="htmlForm-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password</label>
    <input
     onChange={handleChange}
    type="password"
     name="password"
    className="htmlForm-control" id="exampleInputPassword1" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<button
        onClick={() => navigate("/chats")}
       >Already have an Account? Then login</button>
     </>

      )
}

export default Register;