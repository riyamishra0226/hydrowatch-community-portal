import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the HydroWatch community."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;