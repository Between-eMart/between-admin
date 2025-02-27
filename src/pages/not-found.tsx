import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const NotFound = () => {
  //
  const navigate = useNavigate();

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#f2f2f2',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            color: 'white',
          }}>
            <p style={{ fontSize: '18vw', lineHeight: 1.2, color: 'black' }}>404</p>
            <p style={{ fontSize: '2.8vw', color: 'black' }}>PAGE NOT FOUND</p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
            <Link to="">
              <Button style={{ width: 200 }} onClick={() => navigate(-1)}> Back </Button>
            </Link>
          </div>
        </div>


      </div>
    </>
  );

};
