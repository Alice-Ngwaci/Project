
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  
  //Modal

  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,

  MDBContainer,
  MDBCard,
  MDBCardBody,

  //Table

  MDBTable,
  MDBTableHead,
  MDBTableBody,

}
from 'mdb-react-ui-kit';

import { useState, useEffect } from 'react'

//Components

import Alert from '../components/alert';

//Employee Data

import { useGlobalContext } from '../context/context'

//firebase

import { auth, db, storage } from '../firebase/firebaseConfig';
import {collection, addDoc, Timestamp,  query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//Profile 

import placeholder from '../assets/images/placeholder.png'

function Meet() {

  //Global Context

  const { setupMeeting, meetings } = useGlobalContext()

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
   
    
  //create meeting modal

  const [centredModal, setCentredModal] = useState(false)
  const toggleShow = () => setCentredModal(!centredModal)

  //Inputs

    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');


    //register firebase
    const meetup = () => {

      //Validate inputs

      if (!title || !email || !location || !time ||!date ) {
        showAlert(true, 'danger', 'info-circle', 'All input field are required')
      } else {

        Create()
        
      }

    }


   //create function

   const Create = () => {
   
     const Item = {

       id: auth.currentUser.uid,
       meetingTitle: title,
       email: email,
       location: location,
       time: time,
       date: date

     }
     setupMeeting(Item);

     addDoc(collection(db, 'Notifications'), {
     
        user_id: auth.currentUser.uid,
        email: email,
        details: `Meeting ${title} set for ${date} at ${time} to join. Location: ${location} .`,
        
    })

    sendEmail()
    
    !toggleShow()
     
  }

   //upload file

   const [currentid, setCurrentID] = useState([])

   useEffect(() => {
      
    const q = query(collection(db, 'file_data'))

    getDocs(q)
     .then((snapshot) =>{
       var id;
     
     snapshot.docs.forEach((doc) =>{

       id = doc.id;
       setCurrentID(id)
       
       })
   }) 

  })

  console.log(currentid)


   const uploadFile = (e) => {

      e.preventDefault()

      const file = e.target.files[0];
 
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on("state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
        console.log(prog);
      
      },
      (err) => console.log(err),
      () => {
        const createdAt = Timestamp.now()
        getDownloadURL(uploadTask.snapshot.ref)

        .then(url =>   updateDoc(doc(db, 'file_data', currentid),{
    
          image_url: url, 
          created: createdAt
      
        }));
      
        // .then(url =>  addDoc(collection(db, 'file_data'), { 
        //   user_id: auth.currentUser.uid,
        //   email: auth.currentUser.email,
        //   image_url: url, 
        //   created: createdAt}));
        
      })

  }

  //reset modal

  useEffect(() => {

    if(centredModal){
      null
    }else{
      setTitle("")
      setEmail("")
      setLocation("")
      setDate("")
      setTime("")
    }
  })

  //send email

  // const sendEmail = () => {

  //   // const client = new SMTPClient({
  //   //   user: 'user',
  //   //   password: 'password',
  //   //   host: 'smtp.your-email.com',
  //   //   ssl: true,
  //   // });

  //   // const message = new Message({
  //   //   text: 'i hope this works',
  //   //   from: 'you <username@outlook.com>',
  //   //   to: 'someone <someone@your-email.com>, another <another@your-email.com>',
  //   //   cc: 'else <else@your-email.com>',
  //   //   subject: 'testing emailjs',
  //   //   attachment: [
  //   //     {
  //   //       data:
  //   //         '<html>i <i>hope</i> this works! here is an image: <img src="cid:my-image" width="100" height ="50"> </html>',
  //   //     },
  //   //     { path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
  //   //     {
  //   //       path: 'path/to/image.jpg',
  //   //       type: 'image/jpg',
  //   //       headers: { 'Content-ID': '<my-image>' },
  //   //     },
  //   //   ],
  //   // });
    
  //   // // send the message and get a callback with an error or details of the message that was sent

  //   // client.send(message, (err, message) => {
  //   //   console.log(err || message);
  //   // });
  
  // }

  return (
    <div style={{padding: '150'}}>

    <MDBContainer className="my-1" width="100px">
      
      <MDBCard style={{width: '700px', marginTop: '-20px'}}>
     
      <MDBCardBody>

      <div className='d-flex flex-row mt-1 mb-3' style={{fontSize: 10}}>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="p fw-bold mt-2">MHASIBU SACCO</span>

                <a href="https://calendar.google.com/"
                style={{
                  
                  float: 'right',
                  marginLeft: '30%'
                  
                  }}>
                <MDBBtn
              
                  rounded
                  size="sm"
                 
              >
                <MDBIcon far icon="calendar" className="me-2" /> 
                Event Calendar
              </MDBBtn>
              </a>
              </div>
        
              <MDBBtn
                style={{
                backgroundColor: 'InfoBackground',
                float: 'right',
                marginTop: '-53px'
                }}
                rounded
                size="sm"
                onClick={toggleShow}
              >
                <MDBIcon fas icon="handshake" className="me-2" /> 
                Setup Meeting
             </MDBBtn>

        <MDBTable className='mt-2' align="middle" style={{marginLeft: '50', marginRight: '50'}} >
        <MDBTableHead>
        <tr>

            <th scope="col">Email</th>
            <th scope="col">Agenda</th>
            <th scope="col">Location</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            
        </tr>
        </MDBTableHead>
        <MDBTableBody style={{marginLeft: '150'}}>
        {meetings.map((task) => (
            <tr key={task.key}>
            <td>
                <div className="d-flex align-items-center">
               
                    <img
                    src={placeholder}
                    alt="Default user icon"
                    style={{
                        cursor: 'pointer',
                        height: '45px',
                        width: '45px',
                        borderRadius: '50%',
                    }}
                    />
                
                <div className="ms-3">
                    <p className="fw-bold mb-1">{task.email}</p>
                </div>
                </div>
            </td>

            <td>
                <p className="fw-normal mb-1">{task.meetingTitle}</p>
            </td>

            <td>
                <p className="fw-normal mb-1">{task.location}</p>
            </td>

            <td>
                <p className="fw-normal mb-1">{task.date}</p>
            </td>

            <td>
                <p className="fw-normal mb-1">{task.time}</p>
            </td>

            </tr>
        ))}
        </MDBTableBody>
    </MDBTable>

    </MDBCardBody>
    </MDBCard>
    </MDBContainer>

    {/* direct order create direct modal */}
       <>
          <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog xl scrollable centered>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>
                    <MDBIcon fas icon="handshake text-success" className="me-3" />
                    Setup Meeting
                  </MDBModalTitle>
                 
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                    style={{ fontSize: 10, fontWeight: 'bold' }}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalBody style={{padding: '25px'}}>

                  {alert.show && <Alert {...alert} removeAlert={showAlert} />}

                  <MDBInput
                    wrapperClass="mb-4 mt-4 "
                    label="Meeting Title"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4 "
                    label="Participant Email"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4 "
                    label="Location"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    id="formControlLg"
                    type="date"
                    size="lg"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    id="formControlLg"
                    type="time"
                    size="lg"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />

                  <MDBInput wrapperClass='mb-4'
                    id='formControlLg'
                    type='file' size="lg" 
                    onChange={uploadFile}
                  />
                
                </MDBModalBody>

                <MDBModalFooter className="modal-footer">
                <MDBBtn
                    // className="mb-4 px-5"
                    color="warning"
                    size="lg"
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -2,
                      borderRadius: 4,
                      fontSize: 10
                    }}
                    onClick={() => {
                      
                      !toggleShow()

                    }}
                  >
                    
                    Close

                </MDBBtn>
                &nbsp;&nbsp;
                <MDBBtn
                    // className="mb-4 px-5"
                    color="info"
                    size="lg"
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -2,
                      borderRadius: 4,
                      fontSize: 10
                    }}
                    onClick={() => {
                     meetup()
                    }}
                  >
                    
                    Setup Meeting

                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>

  </div>
      
  );
}

export default Meet;

// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBIcon,
//   MDBInput
// }
// from 'mdb-react-ui-kit';

// import { useState } from 'react'

// //Components

// import Alert from '../components/alert';

// //Firebase
// import { auth, db } from '../firebase/firebaseConfig';
// import {collection, addDoc, Timestamp} from 'firebase/firestore';

// //Admin

// function Meet() {

//    //alerts

//    const [alert, setAlert] = useState({
//     show: false,
//     msg: '',
//     type: '',
//     icon: '',
//     })
  
//     const showAlert = (show = false, type = '', icon = '', msg = '') => {
//     setAlert({ show, type, icon, msg })
//     }

//     const [url, setURL] = useState('');
//     const [time, setTime] = useState('');
//     const [date, setDate] = useState('');
//     const [email, setEmail] = useState('');

//     console.log(email);



//     const meet = () => {

//         if ( !url || !time || !date ) {
//           showAlert(true, 'danger', 'info-circle', 'All input fields are required')
//         }else {

//           addDoc(collection(db, 'Notify'), {
//             role: "admin",
//             user_id: auth.currentUser.uid,
//             email: auth.currentUser.email,
//             details: `Meeting set for ${date} at ${time} to join. Copy link on new tab: ${url} .`,
//             url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z7Pci22-XfJWvMLXeQ2VFYMOfIURf4cwwA&usqp=CAU",
//             created: Timestamp.now() 
//         })

//         showAlert(true, 'success', 'info-circle', 'Meeting set successfully')

//         setURL("")
//         setTime("")
//         setDate("")

//         }
      
//       }

//   return (
//     <MDBContainer className="my-1" width="100px">
      
//       <MDBCard style={{width: '450px', marginTop: '-20px'}}>
     
//             <MDBCardBody className='d-flex flex-column' style={{padding: '50px'}}>

//               <div className='d-flex flex-row mt-3  '>
//                 <MDBIcon fas icon="cubes fa-3x me-1" style={{ color: '#ff6219' }}/>
//                 <span className="h5 fw-bold mt-3 ml-5">MHASIBU SACCO</span>
//               </div>

//               <h5 className="fw-normal my-4 pb-3  mb-3" style={{letterSpacing: '1px'}}>Setup Meeting</h5>

//               {alert.show && <Alert {...alert} removeAlert={showAlert} />}

//               <MDBInput wrapperClass='mb-4 mt-3' label='Meeting Title' id='formControlLg' type='text' size="lg"
//                 style={{height: 50}}
//                 value={url} 
//                 onChange={(e) => setURL(e.target.value)}
//                 />

//                 <MDBInput wrapperClass='mb-4 mt-3' label='Location' id='formControlLg' type='text' size="lg"
//                 style={{height: 50}}
//                 value={url} 
//                 onChange={(e) => setURL(e.target.value)}
//                 />
//                 <MDBInput wrapperClass='mb-4'  id='formControlLg' type='date' size="lg"
//                 style={{height: 50}}
//                 value={date} 
//                 onChange={(e) => setDate(e.target.value)}
//                 />
//                 <MDBInput wrapperClass='mb-4'  id='formControlLg' type='time' size="lg"
//                 style={{height: 50}}
//                 value={time} 
//                 onChange={(e) => setTime(e.target.value)}
//                 />
//                  <MDBInput wrapperClass='mb-4'  id='formControlLg' label='Participant Email' type='email' size="lg"
//                 style={{height: 50}}
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)}
//                 />

//               <MDBInput wrapperClass='mb-4'  id='formControlLg'  type='file' size="lg"
//                 style={{height: 50}}
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)}
//                 />


//               <MDBBtn className="mb-4 px-5" color='info' size='lg' style={{fontWeight: "bold", width: '102%', marginLeft: '-5px'}} onClick={meet}>Notify</MDBBtn>
              
//             </MDBCardBody>
        
//       </MDBCard>

//     </MDBContainer>
//   );
// }

// export default Meet;