import { Button } from './button';

function LinkedInLoginButton() {
  const handleLinkedInLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const REDIRECT_URI = 'https://localhost:4001/auth/linkedin/callback';
    const SCOPE = 'openid profile email';
    const STATE = 'secure-random-state-123';
    
    // בדיקה שהמשתנה קיים
    if (!CLIENT_ID) {
      alert('שגיאה: LinkedIn Client ID לא נמצא. בדוק את ה-.env');
      return;
    }
    
    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}`;
    
    console.log('LinkedIn URL:', linkedinAuthUrl);
    console.log('Client ID:', CLIENT_ID);
    
    // פתיחה בחלון חדש במקום redirect
    const popup = window.open(linkedinAuthUrl, '_blank', 'width=500,height=600');
    
    if (!popup) {
      alert('פופאפ נחסם על ידי הדפדפן. אנא אפשר פופאפים לאתר זה.');
    }
  };

  return (
    <Button 
      onClick={handleLinkedInLogin}
      className="bg-[#0077B5] hover:bg-[#005885] text-white font-medium px-8 py-3"
    >
      התחבר עם LinkedIn
    </Button>
  );
}

export default LinkedInLoginButton;