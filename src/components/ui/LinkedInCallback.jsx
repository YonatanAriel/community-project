import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function LinkedInCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      // שליחת הקוד ל-parent window (הפופאפ)
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: 'LINKEDIN_LOGIN_SUCCESS', code, state },
          window.location.origin
        );
        window.close();
      } else {
        // אם אין parent window, נחזור לדף Login
        navigate('/login?success=true');
      }
    } else {
      // אם אין code, יש שגיאה
      const error = searchParams.get('error');
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: 'LINKEDIN_LOGIN_ERROR', error },
          window.location.origin
        );
        window.close();
      } else {
        navigate('/login?error=true');
      }
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold">מעבד התחברות...</h2>
        <p className="text-gray-600">אנא המתן</p>
      </div>
    </div>
  );
}

export default LinkedInCallback;
