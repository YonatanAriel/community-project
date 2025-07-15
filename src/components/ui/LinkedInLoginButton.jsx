import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import { authenticateWithLinkedIn } from '@/services/apiCalls';

function LinkedInLoginButton() {
  const [loginMessage, setLoginMessage] = useState('');
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // האזנה להודעות מהפופאפ
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'LINKEDIN_LOGIN_SUCCESS') {
        const code = localStorage.getItem('linkedInCode');
        
        // סגירת הפופאפ
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
        }
        
        // שליחת הקוד לשרת
        if (code) {
          authenticateWithLinkedIn(code)
            .then((response) => {
              setLoginMessage('התחברת בהצלחה!');
              
              // ניווט לדף userprofile
              setTimeout(() => {
                navigate('/userprofile');
              }, 1000);
            })
            .catch((error) => {
              setLoginMessage('שגיאה בהתחברות לשרת');
              console.error('LinkedIn authentication error:', error);
            });
        } else {
          setLoginMessage('שגיאה: קוד LinkedIn לא נמצא');
        }
      } else if (event.data.type === 'LINKEDIN_LOGIN_ERROR') {
        setLoginMessage('שגיאה בהתחברות');
        console.error('LinkedIn Error:', event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLinkedInLogin = () => {
    localStorage.removeItem('linkedInCode');
    
    const CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const REDIRECT_URI = `${window.location.origin}/login`;
    const SCOPE = 'openid profile email';
    const STATE = 'secure-random-state-123';
    
    if (!CLIENT_ID) {
      alert('שגיאה: LinkedIn Client ID לא נמצא. בדוק את ה-.env');
      return;
    }
    
    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}`;
    
    // פתיחת פופאפ
    const popup = window.open(
      linkedinAuthUrl, 
      'LinkedInLogin', 
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );
    
    popupRef.current = popup;
    
    if (!popup) {
      alert('פופאפ נחסם על ידי הדפדפן. אנא אפשר פופאפים לאתר זה.');
    }
  };

  return (
    <div className="p-4 text-center ">
      <Button 
        onClick={handleLinkedInLogin}
        className="bg-[#0077B5] hover:bg-[#005885] text-white font-medium px-8 py-3"
      >
        התחבר עם LinkedIn
      </Button>
      
      {loginMessage && (
        <div className="max-w-md p-3 mx-auto mt-4 text-green-800 bg-green-100 rounded-md">
          <pre className="text-sm whitespace-pre-wrap">{loginMessage}</pre>
        </div>
      )}
    </div>
  );
}

export default LinkedInLoginButton;