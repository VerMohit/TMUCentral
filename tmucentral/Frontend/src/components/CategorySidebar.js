import React from "react";
import { ListGroup } from "react-bootstrap";
import PriceRangeFilter from "./PriceRangeFilter";



const CategorySidebar = ({ categories, onSelectCategory, onSelectPriceRange }) => {
    const headerStyle = {
        color: '#333', 
        marginBottom: '20px',
    };

    // You can define more styles if needed
    const subHeaderStyle = {
        marginTop: '40px',
        color: '#555', 
    };


    return (
        <>
        <ListGroup>
            <h5 style={headerStyle}>Filter By Category</h5>
            {categories.map((category) => (
                <ListGroup.Item
                    key={category.name} // Use category.name instead of category for the key
                    action
                    onClick={() => onSelectCategory(category.name)} // Pass category.name if you only need the name
                >
                    {category.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
        <h5 style={subHeaderStyle}>Price Range</h5>
            <PriceRangeFilter onSelectPriceRange={onSelectPriceRange} />
        </>
    );
}

export default CategorySidebar;
