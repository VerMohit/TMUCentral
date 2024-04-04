import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import AdCard from './AdCard';
import './AdDisplayCard.css'; 
import { useAuth } from "../contexts/AuthContext"
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const SearchResult = () => {
    const navigate = useNavigate() 
    const [ads, setAds] = useState([]);
    let {title,location,category,fromPrice,toPrice} = useParams();
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const PORT = process.env.PORT || 3005;
            const url = `http://localhost:${PORT}/api/database/searchAds`;
  
            try {
                const response = await fetch(url, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        location: location,
                        category: category,
                        fromPrice: fromPrice,
                        toPrice: toPrice
                      }), 
                });
    
                if (!response.ok) {
                    // alert("No ads found")
                    // navigate("/");
                    // alert("No ads found")
                    throw new Error("Network response was not okay");

                }
    
                const data = await response.json();
    
                if(data && data.Ad) {
                    setAds(data.Ad); 
                } else {
                    console.error("No ads found");
                    // alert("No ads found");
                    // navigate("/");
                }
            } catch (err) {
                console.error(err);
                if (!alertShown) { // Only show alert if it hasn't been shown before
                    setAlertShown(true); // Mark the alert as shown
                    alert("No ads found TEST");
                }
                // alert("No ads found");
                navigate("/");
            }
        };
    
        fetchData();
    }, [title, category, fromPrice, toPrice]); 

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

export default SearchResult;






 

  

