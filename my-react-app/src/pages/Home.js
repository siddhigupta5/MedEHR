import React from 'react'
import {Grid} from '@mui/material';
// import Button from "../components/Button";
import {useNavigate} from 'react-router-dom';
import {About} from '../components/About';
import {Footer} from '../components/Footer';
import './Home.css';

function Home() {
  const navigate=useNavigate();
  function handleClick (){
    navigate("/register")
  }
  function handleClicklogin (){
    navigate("/login")
  }
  return (
    <div className="home">
    <div className="App-header">
<h2 className="big-heading">MedEHR</h2>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
  
    <div className="title-text">
         <p>A WEB2.0 APP</p>
         <h1 className="title">Stay Safe. Stay Healthy.</h1>
         <p>A one stop destination to store all your medical records with complete security and easy accessibility. </p>
         <div className="btn">
         <button className="buttons" onClick={(e)=>handleClick()}>Register</button>
         </div>
         <div className="btn">
         <button className="buttons" onClick={(e)=>handleClicklogin()}>Log In</button>

         </div>
    </div>
 
  </Grid>
  <Grid item xs={12} sm={6}>
   
    <img src="images/HomePage.png" className="pic" alt="homepage"/>

  </Grid>
 </Grid>
 </div>
 <About/>
 <Footer/>
    </div>
  )
}

export default Home