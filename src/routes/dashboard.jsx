import { Article} from '@/components/article'
import { Layout } from '@/components/layout'
import React, { useState } from 'react';
import picture from '../assets/images/favicon.svg'

//Calendar
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { TimeClock } from '@mui/x-date-pickers/TimeClock';
// import dayjs from 'dayjs';

import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,

  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';

import Tasks from '../tables/Tasks'
import Meeting from '../tables/Meeting'
import Employee from '../tables/Employee'
import Chart from '../tables/Chart1';

import background from  '../assets/images/background1.jpg'


// const [currentTime, setCurrentTime] = useState(new Date());

export default function Account() {

  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };


  return (
    <Layout>
      <Article>
      <div
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.29) ',
              padding: 50,
              width: 1500,
              marginLeft: 100,
              backgroundImage: `url(${background})` 
            }}
          >


          
        <MDBRow>
        <MDBCol size='3'>
        <MDBCard  style={{width: '260px', marginLeft: '-30px', marginTop: '-15px'}}>
        <MDBCardBody>
          <div className='flex-row'>
          <img
                    src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2z7Pci22-XfJWvMLXeQ2VFYMOfIURf4cwwA&usqp=CAU'
                    alt="Default user icon"
                    style={{
                        cursor: 'pointer',
                        height: '45px',
                        width: '45px',
                        borderRadius: '50%',
                    }}
                    />
           <p style={{marginTop: '-30px'}}> Admin</p></div>

          
          <MDBTabs className='flex-column text-center mt-5 mb-5' style={{marginLeft: '-10px'}}>
          
            <MDBTabsItem>
           
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab1'}>
              <MDBIcon fas icon="folder" className="me-3" /> Setup Meeting
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab2'}>
              <MDBIcon fas icon="handshake" className="me-3" />  Documents
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              <MDBIcon fas icon="chart-pie" className="me-3" />  Report & Analysis
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab4')} active={verticalActive === 'tab4'}>
              <MDBIcon fas icon="user-plus" className="me-2" />   Register Employee
              </MDBTabsLink>
            </MDBTabsItem>
            
          </MDBTabs>

          <img

            src= {picture}
            alt="Default user icon"
            style={{

                height: '150px',
                width: '150px',
                marginLeft: '25px'

            }}
            />
          
          </MDBCardBody>
          </MDBCard>


          {/* <Clock /> */}

          <div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
          </LocalizationProvider> */}
          </div>

          <div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeClock defaultValue={dayjs(currentTime)}/>
          </LocalizationProvider> */}
          </div>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}><Tasks/></MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}><Meeting/></MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}><Chart /></MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab4'}><Employee /></MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
   
      </div>

      
       
      </Article>
    </Layout>
  )
}
