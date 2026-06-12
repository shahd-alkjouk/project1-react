import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './Context/AuthContext.jsx';
import { DarkModeProvider } from './Context/ModeContext.jsx';
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </AuthProvider>
  </StrictMode>
)
 