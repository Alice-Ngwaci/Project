
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

import { useState } from 'react'

//Components

import Alert from '../components/alert';

//Firebase
import { auth, db } from '../firebase/firebaseConfig';
import {collection, addDoc, Timestamp} from 'firebase/firestore';

//Admin

function Meet() {

   //alerts

   const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
    icon: '',
    })
  
    const showAlert = (show = false, type = '', icon = '', msg = '') => {
    setAlert({ show, type, icon, msg })
    }

    const [url, setURL] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');

    console.log(email);



    const meet = () => {

        if ( !url || !time || !date ) {
          showAlert(true, 'danger', 'info-circle', 'All input fields are required')
        }else {

          addDoc(collection(db, 'Notify'), {
            role: "admin",
            user_id: auth.currentUser.uid,
            email: auth.currentUser.email,
            details: `Meeting set for ${date} at ${time} to join. Copy link on new tab: ${url} .`,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z7Pci22-XfJWvMLXeQ2VFYMOfIURf4cwwA&usqp=CAU",
            created: Timestamp.now() 
        })

        showAlert(true, 'success', 'info-circle', 'Meeting set successfully')

        setURL("")
        setTime("")
        setDate("")

        }
      
      }

  return (
    <MDBContainer className="my-1" width="100px">
      
      <MDBCard style={{width: '450px', marginTop: '-20px'}}>
     
            <MDBCardBody className='d-flex flex-column' style={{padding: '50px'}}>

              <div className='d-flex flex-row mt-3  '>
                <MDBIcon fas icon="cubes fa-3x me-1" style={{ color: '#ff6219' }}/>
                <span className="h5 fw-bold mt-3 ml-5">MHASIBU SACCO</span>
              </div>

              <h5 className="fw-normal my-4 pb-3  mb-3" style={{letterSpacing: '1px'}}>Setup Meeting</h5>

              {alert.show && <Alert {...alert} removeAlert={showAlert} />}

              <MDBInput wrapperClass='mb-4 mt-3' label='Meeting Title' id='formControlLg' type='text' size="lg"
                style={{height: 50}}
                value={url} 
                onChange={(e) => setURL(e.target.value)}
                />

                <MDBInput wrapperClass='mb-4 mt-3' label='Location' id='formControlLg' type='text' size="lg"
                style={{height: 50}}
                value={url} 
                onChange={(e) => setURL(e.target.value)}
                />
                <MDBInput wrapperClass='mb-4'  id='formControlLg' type='date' size="lg"
                style={{height: 50}}
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                />
                <MDBInput wrapperClass='mb-4'  id='formControlLg' type='time' size="lg"
                style={{height: 50}}
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                />
                 <MDBInput wrapperClass='mb-4'  id='formControlLg' label='Participant Email' type='email' size="lg"
                style={{height: 50}}
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />

              <MDBInput wrapperClass='mb-4'  id='formControlLg'  type='file' size="lg"
                style={{height: 50}}
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />


              <MDBBtn className="mb-4 px-5" color='info' size='lg' style={{fontWeight: "bold", width: '102%', marginLeft: '-5px'}} onClick={meet}>Notify</MDBBtn>
              
            </MDBCardBody>
        
      </MDBCard>

    </MDBContainer>
  );
}

export default Meet;