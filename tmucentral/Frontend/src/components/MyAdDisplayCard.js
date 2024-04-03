import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import AdCard from './AdCard';
import './AdDisplayCard.css'; 
import { useAuth } from "../contexts/AuthContext"
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';


const MyAdDisplayCard = () => {
    const [ads, setAds] = useState([]);
    const { currentUser, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
      const fetchData = async () => {
          const PORT = process.env.PORT || 3005;
          const url = `http://localhost:${PORT}/api/database/searchAd`;
          const userEmail = currentUser.email
          try {
              const response = await fetch(url, {
                  method: 'POST', 
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({email: userEmail}), 
              });
  
              if (!response.ok) {
                  throw new Error("Network response was not okay");
              }
  
              const data = await response.json();
  
              if(data && data.Ad) {
                  setAds(data.Ad); 
              } else {
                  console.error("No ads found");
              }
          } catch (err) {
              console.error(err);
          }
      };
  
      fetchData();
  }, [location.state]); 

  
    return (
        <div>
        <NavBar></NavBar>
        <Container className="ad-grid-container">
            {ads.map((ad) => (
                <AdCard
                    price={ad.price}
                    title={ad.title}
                    description={ad.description}
                    image={ad.image}
                    postDate={ad.postDate}
                    location={ad.location}
                />
            ))}
        </Container>
        </div>
    );
};

export default MyAdDisplayCard;
