import { Article} from '@/components/article'
import { Layout } from '@/components/layout'
import { useState } from 'react';

//tables
import Chart from '../tables/Chart'
import AssignedTask from '../tables/AssignedTask'
import Notification from '../tables/Notifications'
import MyAccount from '../tables/MyAccount'

import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

export default function Account() {

  const [iconsActive, setIconsActive] = useState('tab1');

  const handleIconsClick = (value: string) => {
    if (value === iconsActive) {
      return;
    }

    setIconsActive(value);
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
              padding: 40,
              overflow: 'scroll',
              marginBottom: '40px'
             
              
            }}
          >
          
          <MDBTabs className=" mb-5">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleIconsClick('tab1')}
                  active={iconsActive === 'tab1'}
                >
                  <MDBIcon fas icon="folder" className="me-2" /> Tasks
                </MDBTabsLink>
              </MDBTabsItem>
              
             
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => {
                    handleIconsClick('tab2')
                 
                  }}
                  active={iconsActive === 'tab2'}
                >
                  <MDBIcon fas icon="paper-plane" className="me-2" />{' '}
                  Notifications
                </MDBTabsLink>
              </MDBTabsItem>

              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => {
                    handleIconsClick('tab3')
                 
                  }}
                  active={iconsActive === 'tab3'}
                >
                  <MDBIcon fas icon="chart-pie" className="me-2" />{' '}
                  Charts and Analytics
                </MDBTabsLink>
              </MDBTabsItem>

              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => {
                    handleIconsClick('tab4')
                 
                  }}
                  active={iconsActive === 'tab4'}
                >
                  <MDBIcon fas icon="user" className="me-2" />{' '}
                  My Account
                </MDBTabsLink>
              </MDBTabsItem>

            </MDBTabs>

            <MDBTabsContent className="mb-4" style={{ backgroundColor: 'white'}}>
              <MDBTabsPane show={iconsActive === 'tab1'}>
               
              <AssignedTask/>
                  
              </MDBTabsPane>

              <MDBTabsPane show={iconsActive === 'tab2'}>

              <Notification/>

              </MDBTabsPane>

              <MDBTabsPane show={iconsActive === 'tab3'}>

              <Chart />

              </MDBTabsPane>

              <MDBTabsPane show={iconsActive === 'tab4'}>

              <div style={{marginTop: 70}}>

              <MyAccount />

              </div>

              </MDBTabsPane>

            </MDBTabsContent>
        
      </div>

      </Article>
    </Layout>
  )
}
