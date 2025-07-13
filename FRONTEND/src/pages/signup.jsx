import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate=useNavigate();

    return <div className="bg-slate-500 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        
        <SubHeading label={"Enter your infromation to create an account"} />

        <InputBox OnChange={e=>{
          setFirstName(e.target.value);
        }}placeholder="john" label={"First Name"} />
        <InputBox OnChange={e=>{
          setLastName(e.target.value);
        }}placeholder="Doe" label={"Last Name"} />
        <InputBox OnChange={e=>{
          setEmail(e.target.value);
        }}placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox OnChange={e=>{
          setPassword(e.target.value);
        }}placeholder="123456" label={"Password"} />
        <div className="pt-4">
        
        <Button onClick={async()=>{
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
          username,
          firstName,
          lastName,
          Password
          });
          localStorage.setItem("token",response.data.token) 
          localStorage.delete("token");
          navigate("/dashboard") 
        }}label={"Sign up"} />
        </div>
        
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}