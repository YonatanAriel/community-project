import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function SimpleLinkedInCallback() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      // שליחת הקוד לחלון הראשי
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: 'LINKEDIN_LOGIN_SUCCESS', code, state },
          window.location.origin
        );
        window.close();
      }
    } else {
      // שגיאה
      const error = searchParams.get('error');
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: 'LINKEDIN_LOGIN_ERROR', error },
          window.location.origin
        );
        window.close();
      }
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold">מעבד...</h2>
      </div>
    </div>
  );
}

export default SimpleLinkedInCallback;
