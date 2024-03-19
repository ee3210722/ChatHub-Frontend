import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatProvider from './Context/ChatProvider';
import UserProvider from './Context/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ChatProvider>
            <App />
        </ChatProvider>
    </UserProvider>
);

reportWebVitals();
