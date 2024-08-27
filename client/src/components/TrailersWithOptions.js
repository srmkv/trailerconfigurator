import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Checkbox, message as AntMessage } from 'antd';
import './TrailersWithOptions.css'; // Подключаем CSS для позиционирования

const baseURL = "http://95.79.52.15:26336/";

const TrailersWithOptions = () => {
  const [trailers, setTrailers] = useState([]);
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [trailerPrices, setTrailerPrices] = useState({});

  const fetchTrailers = async () => {
    try {
      const response = await axios.get(`${baseURL}api/trailer/getAll`);
      const { status, data } = response.data;
      if (status) {
        setTrailers(data);
        const trailersWithOptions = {};
        data.forEach(trailer => {
          trailersWithOptions[trailer._id] = trailer.Price;
          fetchOptionsForTrailer(trailer._id);
        });
        setTrailerPrices(trailersWithOptions);
      } else {
        setTrailers([]);
      }
    } catch (error) {
      console.error('Error fetching trailers:', error);
      AntMessage.error('Error fetching trailers.');
    }
  };

  const fetchOptionsForTrailer = async (trailerId) => {
    try {
      const response = await axios.get(`${baseURL}api/options/getAll`, {
        params: { trailerId }
      });
      const { status, data } = response.data;
      if (status) {
        setOptions(prev => ({ ...prev, [trailerId]: data }));
      } else {
        setOptions(prev => ({ ...prev, [trailerId]: [] }));
      }
    } catch (error) {
      console.error('Error fetching options for trailer:', error);
      AntMessage.error('Error fetching options.');
    }
  };

  const handleOptionChange = (trailerId, optionId, price, isChecked) => {
    setSelectedOptions(prev => ({
      ...prev,
      [trailerId]: {
        ...(prev[trailerId] || {}),
        [optionId]: isChecked
      }
    }));

    setTrailerPrices(prev => {
      const currentPrice = prev[trailerId];
      const newPrice = isChecked
        ? currentPrice + price
        : currentPrice - price;

      return {
        ...prev,
        [trailerId]: Math.round(newPrice) // Округление до целого числа
      };
    });
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={16}>
        {trailers.map(trailer => (
          <Col span={8} key={trailer._id} style={{ marginBottom: "16px" }}>
            <Card
              title={trailer.Name}
              extra={<span>{trailerPrices[trailer._id]} руб.</span>}
              bordered={false}
              hoverable
            >
              <div className="image-container">
                <img src={trailer.FrontImg} alt="Front" className="front-image" />
                {options[trailer._id]?.map(option => (
                  selectedOptions[trailer._id]?.[option.id] && (
                    <img 
                      key={option.id}
                      src={`${option.image}`} 
                      alt={option.name} 
                      className="option-image"
                      style={{
                        left: option.xPosition || 0, // координаты X, по умолчанию 0
                        top: option.yPosition || 0,  // координаты Y, по умолчанию 0
                      }}
                    />
                  )
                ))}
              </div>
              <div>
                <h3>Options:</h3>
                {options[trailer._id] ? (
                  <ul>
                    {options[trailer._id].length > 0 ? (
                      options[trailer._id].map(option => (
                        <li key={option.id} style={{ marginBottom: '8px' }}>
                          <Checkbox
                            onChange={(e) => handleOptionChange(trailer._id, option.id, option.price, e.target.checked)}
                          >
                            <strong>{option.name}:</strong> {option.description} {option.price} руб.
                          </Checkbox>
                        </li>
                      ))
                    ) : (
                      <p>No options available</p>
                    )}
                  </ul>
                ) : (
                  <p>Loading options...</p>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TrailersWithOptions;
