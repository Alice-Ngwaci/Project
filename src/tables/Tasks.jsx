import React, {useEffect, useState} from 'react'

import {

  MDBIcon,

  MDBContainer,
  MDBCard,
  MDBCardBody,

  //Modal

  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBBtn,
  MDBInput,
  MDBModalFooter,
   
} from 'mdb-react-ui-kit';

//Global Data

import { useGlobalContext } from '../context/context'

//firebase

import { auth, db, storage } from '../firebase/firebaseConfig';
import {collection, addDoc, Timestamp,  query, where, onSnapshot, } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//Components

import Alert from '../components/alert';



export default function Tasks() {

  //create folder

  const [filename, setFileName] = useState('');
  const [description, setDescrition] = useState('');


  //Assign task

  const [email, setEmail] = useState('');

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
     
    //Global Context

    const { assignTask, remove, addFolder, folders } = useGlobalContext()

    //Modal
    
    const [centredModal3, setCentredModal3] = useState(false)
    const toggleShow3 = () => setCentredModal3(!centredModal3)

    //Input
   

    //Folder click

    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedName, setSelectedName] = useState(null)
    const [selectedTitle, setSelectedTitle] = useState(null)
    const [selectedUserId, setSelectedUserId] = useState(null)
  

    const handleRowClick = (person) => {

      setSelectedItem(person)
      setSelectedUserId(person.id)
      setSelectedName(person.filename)
      setSelectedTitle(person.description)
     

      toggleShow3()
    }

    console.log(selectedUserId)

    //create folder modal

      const [centredModal, setCentredModal] = useState(false)
      const toggleShow = () => setCentredModal(!centredModal)


    //Assign Task

    const number = Math.floor(Math.random() * 100000000);

    const Start = () =>{

      if ( !email ) {
        showAlert(true, 'danger', 'info-circle', 'Select Email')
      }else {

        const Item = {

          id: number,
          name: selectedName,
          title: selectedName,
          details: selectedTitle,
          email: email,
   
        }
        assignTask(Item);

        showAlert(true, 'success', 'info-circle', 'Task Assigned')
       
        setTimeout(() => {!toggleShow3()}, 2000)

      }

    }

    //reset modal

  useEffect(() => {

    if(!centredModal){
      null
    }else{
     
      setEmail("")
    
    }
  })

  //reset modal

  useEffect(() => {

    if(!centredModal3){
      null
    }else{
     
      setFileName("")
      setDescrition("")
    
    }
  })

  //create function
  const numbers = Math.floor(Math.random() * 100);

  const create = () => {

    if (!filename || !description) {
      showAlert(true, 'danger', 'info-circle', 'All input field are required')
    } else {

      const Item = {

        id: numbers,
        filename: filename,
        description: description,
  
      }
      addFolder(Item);
     
      !toggleShow();

    }
    
 }

  //upload file

  const uploadFile = (e) => {
    
    const q2 = query(collection(db, "file_data"),where("email", "==", `${auth.currentUser.email}`));


    onSnapshot(q2, (querySnapshot) => {

      if (querySnapshot.size === 0) {

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
      
        .then(url =>  addDoc(collection(db, 'file_data'), { 
          user_id: auth.currentUser.uid,
          email: auth.currentUser.email,
          image_url: url, 
          created: createdAt}));
        
      })

    }

  })

  }
    
  return (
    <div>

      <MDBContainer className="my-1" width="100px" >
      
      <MDBCard style={{width: '670px', marginTop: '-20px'}}>
     
            <MDBCardBody>

            <div className='d-flex flex-row mt-1 mb-3' style={{fontSize: 10}}>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="p fw-bold mt-2">MHASIBU SACCO FILES</span>
               
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
            Create Folder
          </MDBBtn>

            {!addFolder.length > 0 ? (
              <>
              
              <div><img src={empty} style={{marginLeft: '20%'}} width="500px"/> No Tasks</div>

              </>

              ):(
              <>
              
              <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: "space-around", marginLeft: '20px'}}>
              
             {folders.map((person) => (
              <>
              
                <MDBCard className='ml-5 mr-5 mt-3'  style={{width: '120px', height: '120px', marginLeft: '20px', cursor: 'pointer'}}  key = {person.id} onClick={() => handleRowClick(person)}>
                <MDBCardBody>
                <MDBIcon  fas icon="folder" className="text-center text-success" key = {person.id} size="2x" >
                <p style={{fontSize: '15px'}}>{person.filename}</p>
                </MDBIcon>
                </MDBCardBody>
                </MDBCard>

                
              </>
              ))}

              </div>
              <h5 className="fw-normal mt-5 pb-3  mb-3" style={{letterSpacing: '1px'}}>&copy; Sacco Files</h5>
  
              </>
              )}

            </MDBCardBody>

      </MDBCard>

      </MDBContainer>

    {/* Request Modal */}

    <>
    {selectedItem && (
    <MDBModal
      tabIndex="-1"
      show={centredModal3}
      setShow={setCentredModal3}
    >
      <MDBModalDialog centered>
        <MDBModalContent style={{padding: 25}}>
          <MDBModalHeader className='mb-3'>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="folder-open text-success"
                className="me-2"
              />{' '}
              Assign Task
            </MDBModalTitle>
        
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow3}
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                
              }}
            ></MDBBtn>
          </MDBModalHeader>

          {alert.show && <Alert {...alert} removeAlert={showAlert} />}

          <MDBModalBody>
          
            <div>
          
              <h5
                className="fw-normal  mb-4"
                style={{ letterSpacing: '1px' }}
              >
                File_Name: {selectedItem.filename}
              </h5>

            <>
            <a 
            href= {"https://kevin-chela.github.io/portfolio-react-main/"} download className="bg-info text-white font-bold mt-4 mb-0 bg-info sm"
            >
              <MDBCard className='ml-5 mr-5 mb-3'  style={{width: '100px', height: '100px', marginLeft: '35%', cursor: 'pointer'}}>
              <MDBCardBody>
              <MDBIcon  fas icon="folder" className="text-center text-success" size="2x" >
              <p style={{fontSize: '15px'}} className="text-center">{selectedItem.description}</p>
              </MDBIcon>
              </MDBCardBody>
              </MDBCard>
            </a>
              
            </>

              <h5
                className="fw-normal  mb-4"
                style={{ letterSpacing: '1px' }}
              >
                Assign Work To Email
              </h5>

              <MDBInput wrapperClass=''  id='formControlLg' label='Email' type='email' size="lg"
                style={{height: 50}}
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />

              <MDBBtn
                className="mt-4 px-10"
                color="info"
                size="lg"
                style={{ fontWeight: 'bold', width: '60%' }}
                onClick={() => {
                  { Start(); remove(selectedItem.id)}
                }}
              >
                Assign Task
            </MDBBtn>

            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    )}
    </>

    {/* create folder modal */}
    <>
          <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog xl scrollable centered>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>
                    <MDBIcon fas icon="folder text-success" className="me-3" />
                    Create Folder
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
                    label="FolderName"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={filename}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4 "
                    label="FileName"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={description}
                    onChange={(e) => setDescrition(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4 "
                    id="formControlLg"
                    type="file"
                    size="lg"
                    onChange={uploadFile}
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
                      { create()}
                    }}
                   
                  >
              
                  Create Folder

                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
        
    </div>
    
  )
}
