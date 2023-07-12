
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

import { useState } from 'react'
import { useNavigate } from "react-router-dom";

//firebase

import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

import background from  '../assets/images/background.jpg'



function Login() {

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123456');

  const navigate = useNavigate();

  const login = (e) => {
      e.preventDefault();
  
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
      
          navigate('/account', { replace: true })
         
      })
      .catch((error) => {
        
        const errorMessage = error.message;
        alert(errorMessage)
       
      });
    
    }

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6' style={{padding: '10px'}}>
            <MDBCardImage   src={background} alt="login form" className='rounded-start h-100 '/>
          </MDBCol>

         

          <MDBCol md='6' style={{padding:20}}>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-3 '>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h5 fw-bold mt-3 ml-3">MHASIBU SACCO</span>
              </div>

              <h5 className="fw-normal my-4 pb-3  text-center" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg"
                style={{height: 50}}
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                style={{height: 50}}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />

              <MDBBtn className="mb-4 px-5" color='info' size='lg' style={{fontWeight: "bold", width: '102%', marginLeft: '-5px'}} onClick={login}>Login</MDBBtn>
              
            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;