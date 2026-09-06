import React,{Component} from 'react';
import './About.css';
import {Grid} from '@mui/material';

export class About extends Component{
render(){
    return(
        <div className="about">
            <h1 className="sub-heading">About</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <img src="images/EHR.png" className="ehr" alt="ehr"/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <div className='grid-block'>
              <h2 className="sub-heading">What is an EHR?</h2>
               <p>An Electronic Health Record is an electronic version of a patients medical history. EHR can be very useful as it has :</p>
                <p className="points"><img src="images/check.png" alt="check"/>  Less Medical Errors.</p>
                <p className="points"><img src="images/check.png" alt="check"/>  Easy Accessibility.</p>
                <p className="points"><img src="images/check.png" alt="check"/>  Complete track of Medical Status.</p>

              </div>
               
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <div className='grid-block'>
              <h2 className="sub-heading">How is it secured?</h2>
               <p>It assures security as it uses a highly decentralized network of blockchain technology. Blockchain is preferred as per its key features:</p>
                <p className="points"><img src="images/check.png" alt="check"/> Decentralization. </p>
                <p className="points"><img src="images/check.png" alt="check"/> Immutability.</p>
                <p className="points"><img src="images/check.png" alt="check"/> Smart Contracts.</p>

              </div>
               
              </Grid>
              <Grid item xs={12} sm={6}>
              <img src="images/Secured.png" className="ehr" alt="secured"/>
              </Grid>
            </Grid>
        </div>
    )
}
}
