import LoginForm from '@/components/ui/LoginForm';

function Login() {
  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-lg bg-white border border-border flex flex-col justify-center">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-primary drop-shadow-sm">
            Sign In
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Enter your email and password to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
