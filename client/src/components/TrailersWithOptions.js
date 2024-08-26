import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, message as AntMessage } from 'antd';

const baseURL = "http://95.79.52.15:26336/";

const TrailersWithOptions = () => {
  const [trailers, setTrailers] = useState([]);
  const [options, setOptions] = useState({});

  const fetchTrailers = async () => {
    try {
      const response = await axios.get(`${baseURL}api/trailer/getAll`);
      const { status, data } = response.data;
      if (status) {
        setTrailers(data);
        // Fetch options for each trailer after trailers are fetched
        data.forEach(trailer => fetchOptionsForTrailer(trailer._id));
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
              extra={<span>{trailer.Price} руб.</span>}
              bordered={false}
              hoverable
            >
              <div>
                <p><strong>Description:</strong> {trailer.Description}</p>
                <p><strong>Front Image:</strong></p>
                {trailer.FrontImg && <img src={trailer.FrontImg} alt="Front" style={{ width: '100px', height: '100px' }} />}
                <p><strong>Back Image:</strong></p>
                {trailer.BackImg && <img src={trailer.BackImg} alt="Back" style={{ width: '100px', height: '100px' }} />}
              </div>
              <div>
                <h3>Options:</h3>
                {options[trailer._id] ? (
                  <ul>
                    {options[trailer._id].length > 0 ? (
                      options[trailer._id].map(option => (
                        <li key={option.id}>
                          <strong>{option.name}:</strong> {option.description}
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
