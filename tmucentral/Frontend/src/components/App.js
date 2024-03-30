
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import Register from './Register';
import AdCard from './AdCard';
import { Container} from 'react-bootstrap';
import AdDisplayCard from './AdDisplayCard';
import NavBar from './NavBar';
import { DEFAULT_MIN_BREAKPOINT } from 'react-bootstrap/esm/ThemeProvider';
import PostAd from './PostAd';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "../contexts/AuthContext" //not working
import Dashboard from './Dashboard'; //not working
import Footer from './Footer';

  // Manage server API POST for new form submissions
  async function handleFormSubmit(path, data, msg) { 
    const PORT = process.env.PORT || 3005;
    const url = `http://localhost:${PORT}/api/database/${path}`;
    try {
        const response = await fetch(url, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        
        const responseData = await response.json();
  
        // Check if any errors occurred
        if (!response.ok) {
            if (responseData) {
                alert(responseData.error);
            }
            throw new Error("Network reponse was not okay");
        }
  
        // Update user that form was submitted sucessfully to the server
        console.log("Data Submitted: ", responseData);
        if (msg) {
          alert(msg);
        }
        
    } catch (err) {
        console.error(err);
    }
  };

function App() {
  return (

<BrowserRouter>
<AuthProvider>  
  <Routes>
  <Route path='/postad' element={
      <PostAd onFormSubmit={handleFormSubmit}/>
  
  
  } />
  <Route path="/" element={
   <div> 
    <NavBar></NavBar> <br></br>
    <div>
    <AdDisplayCard></AdDisplayCard>
    </div>
    </div>
  } />
    <Route path="/register" element={
      <Register onFormSubmit={handleFormSubmit}/>
    } />
    <Route path="/login" element={
      <Login onFormSubmit={handleFormSubmit}/>
    } />
    <Route path="/admin" element={<AdminDashboard/>} />
    
    <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
     </Route>
  </Routes>
  </AuthProvider>  
</BrowserRouter>
  );
}

export default App;

