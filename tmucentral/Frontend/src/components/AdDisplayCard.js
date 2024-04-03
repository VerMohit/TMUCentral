import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import AdCard from './AdCard';
import './AdDisplayCard.css'; 

const AdDisplayCard = ({ onFormSubmit }) => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const PORT = process.env.PORT || 3005;
        const url = `http://localhost:${PORT}/api/database/getAds`;
        fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Network response was not okay");
                }
                return resp.json();
            })
            .then(ads => setAds(ads.Ads))
            .catch(err => console.error(err));
    }, []); 

    return (
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
    );
};

export default AdDisplayCard;
//Test