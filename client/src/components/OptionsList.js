// src/components/OptionsList.js
import React, { useState, useEffect } from 'react';
import { Spin, Alert } from 'antd';

function OptionsList() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Загрузка списка опций с сервера
    fetch('/api/options/getAll') // Проверьте, что этот путь правильный для вашего API
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status) {
          setOptions(data.data); // Предполагается, что данные находятся в data.data
        } else {
          setOptions([]);
        }
      })
      .catch(error => {
        console.error('Error fetching options:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <h2>Available Options</h2>
      <ul>
        {options.length > 0 ? (
          options.map(option => (
            <li key={option.id}>
              <strong>{option.name}</strong>: {option.description}
            </li>
          ))
        ) : (
          <li>No options available</li>
        )}
      </ul>
    </div>
  );
}

export default OptionsList;
