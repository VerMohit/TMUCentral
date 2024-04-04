import React from "react";
import { ListGroup } from "react-bootstrap";
import PriceRangeFilter from "./PriceRangeFilter";



const CategorySidebar = ({ categories, onSelectCategory, onSelectPriceRange }) => {
    return (
        <>
        <ListGroup>
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
        <h5 className="mt-4">Price Range</h5>
            <PriceRangeFilter onSelectPriceRange={onSelectPriceRange} />
        </>
    );
}

export default CategorySidebar;
