import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

import { useState, useEffect } from 'react'

//firebase

import { auth, db } from '../firebase/firebaseConfig';

import {
  collection,
  query,
  onSnapshot,
  where,
 
} from 'firebase/firestore'

import {
    MDBCard,
    MDBCardBody,
    MDBTypography,
  
    } from "mdb-react-ui-kit";

export default function MyAccount() {

  const [notification, setNotifications] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'user_data'),where('email','==',`${auth.currentUser.email}`))

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
  return (
    <div style={{width: '900px', marginTop: '20px', paddingRight: '20px'}}>
         {notification.map((task) => (

            <MDBCard className="mt-5">
            <MDBCardBody>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                <div>
                <img
                    src={task.url}
                    alt="Default user icon"
                    style={{
                        cursor: 'pointer',
                        height: '175px',
                        width: '175px',
                        borderRadius: '50%',
                    }}
                    />
                </div>
                <div className="ms-5">
                    <MDBTypography tag="h5">
                    {task.email}
                    </MDBTypography>
                    <p className="small mt-2">{task.department}</p>
                </div>
               
                </div>

                <div className='mt-4' style={{marginRight: '20px'}}>
                <QRCodeSVG value= {task.email} />
                </div>

            </div>
            </MDBCardBody>
            </MDBCard>

         ))}
    </div>
  )
}
