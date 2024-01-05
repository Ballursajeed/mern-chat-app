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
<div className='bg-blue-50 h-screen flex items-center'>
 <form onSubmit={handleSubmit} className='w-64 mx-auto mb-12'>
   <input
     type="name"
     name="name"
     placeholder="name"
     onChange={handleChange}
     className="block w-full rounded-sm p-2 mb-2 border" id="Name" aria-describedby="emailHelp" />

    <input
    type="email"
    name="email"
     placeholder="email"
     onChange={handleChange}
     className="block w-full rounded-sm p-2 mb-2 border" id="exampleInputEmail1" aria-describedby="emailHelp" />

    <input
     onChange={handleChange}
    type="password"
     name="password"
     placeholder='password'
    className="block w-full rounded-sm p-2 mb-2 border" id="exampleInputPassword1" />
  <button type="submit" className="bg-blue-500 text-white block w-full rounded-sm p-2">Submit</button>
  <button
        onClick={() => navigate("/chats")}
       >Already have an Account? Then login</button>
</form>

</div>

      )
}

export default Register;