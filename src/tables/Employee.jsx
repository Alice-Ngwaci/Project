
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import {collection, addDoc, Timestamp} from 'firebase/firestore';


function Employee() {

  //Global Context

  const { employees, addEmployee } = useGlobalContext()

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
   
    
  //create account modal direct order

  const [centredModal, setCentredModal] = useState(false)
  const toggleShow = () => setCentredModal(!centredModal)

  //Inputs

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [salary, setSalary] = useState('')
    const [url, setURL] = useState('')
    const [password, setPassword] = useState('123456')

    //register firebase
    const register = () => {

      if (!username || !email || !department || !salary ||!url ) {
        showAlert(true, 'danger', 'info-circle', 'All input field are required')
      } else {

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
            const user = userCredential.user;
            console.log("hey");
  
            addDoc(collection(db, 'user_data'), {
                role: "user",
                user_id: user.uid,
                email: email,
                department: department,
                salary: salary,
                url: url,
                created: Timestamp.now() 
            })
  
            addDoc(collection(db, 'Notifications'), {
              user_id: user.uid,
              email: email,
              details: "Your Account has been created successfully",
              
          })
  
  
        })
        .catch((error) => {
          
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });

        Create()
        
      }

     

     
    
    }


   //create function
   const number = Math.floor(Math.random() * 100);

   const Create = () => {
   
     const Item = {

       id: number,
       name: username,
       email: email,
       department: department,
       salary: salary,
       imageId: url

     }
     addEmployee(Item);
    
     !toggleShow()
     
  }

  //reset modal

  useEffect(() => {

    if(centredModal){
      null
    }else{
      setUserName("")
      setEmail("")
      setDepartment("")
      setSalary("")
      setURL("")
    }
  })

  return (
    <div style={{padding: '150'}}>

    <MDBContainer className="my-1" width="100px">
      
      <MDBCard style={{width: '670px', marginTop: '-20px'}}>
     
      <MDBCardBody>

      <div className='d-flex flex-row mt-1 mb-3' style={{fontSize: 10}}>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="p fw-bold mt-2">MHASIBU SACCO</span>
              </div>
        
        <MDBBtn
            style={{
            backgroundColor: 'InfoBackground',
            float: 'right',
            marginTop: '-50px'
            }}
            rounded
            size="sm"
            onClick={toggleShow}
        >
            Create Account
        </MDBBtn>

        <MDBTable className='mt-2' align="middle" style={{marginLeft: '50', marginRight: '50'}} >
        <MDBTableHead>
        <tr>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            
        </tr>
        </MDBTableHead>
        <MDBTableBody style={{marginLeft: '150'}}>
        {employees.map((task) => (
            <tr key={task.key}>
            <td>
                <div className="d-flex align-items-center">
               
                    <img
                    src={task.imageId}
                    alt="Default user icon"
                    style={{
                        cursor: 'pointer',
                        height: '45px',
                        width: '45px',
                        borderRadius: '50%',
                    }}
                    />
                
                <div className="ms-3">
                    <p className="fw-bold mb-1">{task.name}</p>
                </div>
                </div>
            </td>

            <td>
                <p className="fw-normal mb-1">{task.email}</p>
            </td>

            <td>
                <p className="fw-normal mb-1">{task.department}</p>
            </td>

            <td>
                <p className="fw-normal mb-1">${task.salary}</p>
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
                    <MDBIcon fas icon="user-plus text-success" className="me-3" />
                    Register New Employee
                  </MDBModalTitle>
                 
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                    style={{ fontSize: 10, fontWeight: 'bold' }}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalBody>

                  {alert.show && <Alert {...alert} removeAlert={showAlert} />}

                  <MDBInput
                    wrapperClass="mb-4 mt-4 mx-4"
                    label="UserName"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4 mx-4"
                    label="Email"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-4"
                    label="Department"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-4"
                    label="Salary"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-4"
                    label="Paste Profile URL"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                    required
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
                      register()
                    }}
                  >
                    
                    Create Account

                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>

  </div>
      
  );
}

export default Employee;