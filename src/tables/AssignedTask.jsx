import React from 'react'
import ReactLoading from "react-loading";

import {

  MDBIcon,
  MDBContainer,
  MDBCard,
  MDBCardBody,

  //Table

  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,

} from 'mdb-react-ui-kit';
  
  //Profile 

  import placeholder from '../assets/images/placeholder.png'

  import empty from '../assets/images/empty.svg'

//Global Data

import { useGlobalContext } from '../context/context'

//React

import { useState, useEffect } from 'react'

//firebase

import { auth, db } from '../firebase/firebaseConfig';

import {
  collection,
  query,
  where,
  getDocs
 
} from 'firebase/firestore'

//Components

import Alert from '../components/alert';

export default function AssignedTask({assignedTask}) {

  //Global Context

  const { task, remove } = useGlobalContext()

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

  //Performing task

  const [loading, setLoading] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null)

  console.log(selectedUserId)

  const handleClick = () => {

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
    }, 5000);

    setTimeout( showAlert(true, 'success', 'info-circle', 'Task completed'), 5000)

  }

  //user_data

  const [department, setDepartment] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'user_data'),where('email','==',`${auth.currentUser.email}`))
     
    getDocs(q)
       .then((snapshot) =>{
         var id;
       
       snapshot.docs.forEach((doc) =>{

         id = doc.data().department;
        
         console.log(id)
         setDepartment(id)
         
         })
     }) 

  })

  return (
    <div>

    {alert.show && <Alert {...alert} removeAlert={showAlert} />}

    {loading && <div className='text-center, alignItem: center' style={{position: 'absolute', zIndex: '1000'}}><ReactLoading
          type="spinningBubbles"
          color="#ADD8E6"
          height={100}
          width={50}
          
         
        /><p className='text-info' style={{fontWeight: 'bold', fontSize: 10}}>Performing Task</p></div> }

      <MDBContainer style={{width: "900px"}}>
      
      <MDBCard >
     
            <MDBCardBody>

            <div className='d-flex flex-row mt-1 mb-3' style={{fontSize: 10}}>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="p fw-bold mt-2">MHASIBU SACCO</span>
            </div>

       
        {!task.length > 0 ? (
        <>
        
        <div><img src={empty} style={{marginLeft: '20%'}} width="500px"/> No Tasks</div>

        </>

        ):(

        <>
      
        <MDBTable className='mt-2' align="middle" style={{marginLeft: '50', marginRight: '50'}} >
        <MDBTableHead>
        <tr>
            <th scope="col">ClientEmail</th>
            <th scope="col">Title</th>
            <th scope="col">Details</th>
            <th scope="col">Department</th>
            <th scope="col">Review</th>
        </tr>
        </MDBTableHead>
        <MDBTableBody style={{marginLeft: '150'}}>

        {task.map((tasks) => (<>
  
            <tr key={tasks.key}>
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
                    <p className="fw-bold mb-1">{tasks.email}</p>
                </div>
                </div>
            </td>

            <td>
                <p className="fw-normal mb-1">{tasks.title}</p>
            </td>

            <td>
                <p className="fw-normal mb-1">{tasks.details}</p>
            </td>

            <td>
            {tasks.department === "Information Technology" ? (
            <>
             <MDBBadge color="success" pill>
                {tasks.department}
             </MDBBadge>
            </>
            ):(
            <>

            {tasks.department === "Human Resource" ? (
            <>
             <MDBBadge color="info" pill>
                {tasks.department}
             </MDBBadge>
            </>
            ):(
            <MDBBadge color="warning" pill>
                {tasks.department}
             </MDBBadge>
            )}


            </>)}
           
            </td>

            <td>
            <MDBBtn
                  style={{
                    backgroundColor: 'InfoBackground',
                    float: 'right',
                  }}
                  rounded
                  size="sm"
                  onClick={() =>  {handleClick(); remove(tasks.id)}}
                 
                >
                  Task
                </MDBBtn>
            </td>

            </tr>

           </> 
        ))}
        
        
        </MDBTableBody>
        </MDBTable>
        </>

    )}


    </MDBCardBody>

    </MDBCard>

    </MDBContainer>
          
    </div>
    
  )
}
