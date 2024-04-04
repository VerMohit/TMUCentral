import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const priceRanges = [
    { label: "Under 50", value: "0-50" },
    { label: "50-100", value: "50-100" },
    { label: "100-200", value: "100-200" },
    { label: "200-500", value: "200-500" },
    { label: "500-1000", value: "500-1000" },
    { label: "Over 1000", value: "1000-10000" }
];

const PriceRangeFilter = ({ onSelectPriceRange }) => {
    const [customMin, setCustomMin] = useState('');
    const [customMax, setCustomMax] = useState('');

    const handleCustomPriceSubmit = (e) => {
        e.preventDefault();
        onSelectPriceRange(`${customMin}-${customMax}`);
        setCustomMax('');
        setCustomMin('');
    }

    return (
        <Form>
            {priceRanges.map((range) => (
                <Form.Check
                    key={range.value}
                    type="radio"
                    label={range.label}
                    name="priceRange"
                    value={range.value}
                    onChange={(e) => onSelectPriceRange(e.target.value)}
                />
            ))}
            <div className="custom-price-range mt-3"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
                <Form.Label>Custom Price Range:</Form.Label>
                <Col xs={2} md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Min"
                        value={customMin}
                        onChange={(e) => setCustomMin(e.target.value)}
                    />
                </Col>
                <Col xs={2} md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Max"
                        value={customMax}
                        onChange={(e) => setCustomMax(e.target.value)}
                    />
                </Col>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCustomPriceSubmit}
                >
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default PriceRangeFilter;