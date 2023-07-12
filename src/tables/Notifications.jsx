import React from 'react'

import { useState, useEffect } from 'react'

//Profile 

import placeholder from '../assets/images/placeholder.png'

//Firebase

import { auth, db } from '../firebase/firebaseConfig';

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
 
} from 'firebase/firestore'

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBIcon,
    MDBTypography,
  
    } from "mdb-react-ui-kit";

export default function Notifications() {

  const [notification, setNotifications] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'Notifications'),where('email','==',`${auth.currentUser.email}`))

    onSnapshot(q, (querySnapshot) => {
      const list = []
      setNotifications([])

      querySnapshot.forEach((doc) => {
        list.push(doc.data())
        setNotifications((prevState) => [
          ...prevState,
          { ...doc.data(), key: doc.id },
        ])
      })
    })

  })

  const [notify, setNotify] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'Notify'))

    onSnapshot(q, (querySnapshot) => {
      const list = []
      setNotify([])

      querySnapshot.forEach((doc) => {
        list.push(doc.data())
        setNotify((prevState) => [
          ...prevState,
          { ...doc.data(), key: doc.id },
        ])
      })
    })

  })
  return (
    <div style={{width: "900px", paddingRight: '30px'}}>
         {notification.map((task) => (

            <MDBCard className="mt-3 mr-5">
            <MDBCardBody>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                <div>
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
                </div>
                <div className="ms-5">
                    <MDBTypography tag="h5">
                    {task.email}
                    </MDBTypography>
                    <p className="small mt-2">{task.details}</p>
                </div>
                </div>
                
            </div>
            </MDBCardBody>
            </MDBCard>

            

         ))}

        {notify.map((task) => (

        <MDBCard className="mt-3 mr-5" style={{marginRight: '20px'}}>
        <MDBCardBody>
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
            <div>
            <img
                src={task.url}
                alt="Default user icon"
                style={{
                    cursor: 'pointer',
                    height: '45px',
                    width: '45px',
                    borderRadius: '50%',
                }}
                />
            </div>
            <div className="ms-5" style={{marginRight: '20px'}}>
                <MDBTypography tag="h5">
                {task.email}
                </MDBTypography>
                <p className="small mt-2">{task.details}</p>
            </div>
            </div>
            
        </div>
        </MDBCardBody>
        </MDBCard>



        ))}
    </div>
  )
}
