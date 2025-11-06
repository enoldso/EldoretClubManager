import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm 
      type="member"
      onLogin={(username, password) => console.log('Login:', username, password)}
      onSwitchType={() => console.log('Switch type')}
    />
  );
}
