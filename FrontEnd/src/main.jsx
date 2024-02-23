import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import View from './View.jsx'
import NewPost from './NewPost.jsx';
import Update from './Update.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Profile from './Profile.jsx';
import About from './About.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.jsx';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Provider store={ store }>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/new" element={<NewPost />} />
        <Route path={'/:id'} element={<View />}/>
        <Route path={'/:id/update'} element={<Update />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<Profile />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);
