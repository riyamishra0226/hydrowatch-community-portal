import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to continue to HydroWatch."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;