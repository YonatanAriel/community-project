import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LinkedInLoginButton from '../components/ui/LinkedInLoginButton';

function Login() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      // שליחת הקוד לחלון הראשי (אם זה פופאפ)
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: 'LINKEDIN_LOGIN_SUCCESS', code, state },
          window.location.origin
        );
        window.close();
      } else {
        // אם זה לא פופאפ, שליחת הודעה לעצמנו
        window.postMessage(
          { type: 'LINKEDIN_LOGIN_SUCCESS', code, state },
          window.location.origin
        );
      }
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ברוכים הבאים
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            התחברו כדי להמשיך
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <LinkedInLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;