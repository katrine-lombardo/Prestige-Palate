import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginForm from "./LoginForm";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-json-pretty/themes/monikai.css";
import TokenCard from "./TokenCard";
import UserDataCard from "./UserDataCard";
import useToken from "@galvanize-inc/jwtdown-for-react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export const Main = () => {
  const { token } = useToken();
  return (
    <div>
      <ConsoleBanner />
      {!token && <LoginForm />}
      {token && <TokenCard />}

      <UserDataCard />
    </div>
  );
};
