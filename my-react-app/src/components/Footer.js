import React,{Component} from 'react';
import './Footer.css';

export class Footer extends Component {

  render() {

    return(

      <div
        className="footer"
        style={{ backgroundImage: `url('/images/Footer.png')` }}
      >

        <div className='footer-container'>

          <h1 className='footer-heading'>
            We are here, for your Care!!
          </h1>

          <p>
            Thank you for providing us your documents.
            We assure you to keep them safe and secure.
          </p>

        </div>

      </div>

    )
  }
}