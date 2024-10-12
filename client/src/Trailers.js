import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message as AntMessage } from "antd";
import axios from 'axios';

const colors = [
  { label: 'Белый', front: 'FrontImg', back: 'BackImg' },
  { label: 'Зеленый', front: 'FrontImgGreen', back: 'BackImgGreen' },
  { label: 'Изумрудный', front: 'FrontImgIzu', back: 'BackImgIzu' },
  { label: 'Красный', front: 'FrontImgRed', back: 'BackImgRed' },
  { label: 'Серый', front: 'FrontImgGray', back: 'BackImgGray' },
  { label: 'Синий', front: 'FrontImgBlue', back: 'BackImgBlue' },
  { label: 'Хакки', front: 'FrontImgHaki', back: 'BackImgHaki' },
  { label: 'Черный', front: 'FrontImgBlack', back: 'BackImgBlack' },
];

function Trailers() {
  // Базовый URL API
  const baseURL = "http://192.168.0.149:5000/";
  
  // Названия API эндпоинтов
  const getListAPIName = "api/trailer/getAll";
  const addEditAPIName = "api/trailer/addEditTrailer";
  const deleteAPIName = "api/trailer/deleteTrailer";
  const getOptionsAPIName = "api/options/getAll";
  const addOptionAPIName = "api/options/addOption";
  const editOptionAPIName = "api/options/edit";
  const deleteOptionAPIName = "api/options/delete";

  // Инициализация состояния для трейлеров
  const [rawTableData, setRawTableData] = useState([]);

  // Инициализация состояния для формы добавления/редактирования трейлера
  const initialFormValues = {
    actionType: "add",
    _id: "",
    Name: "",
    Price: "",
    Description: "",
    Size: "",
  };

  // Добавляем динамически поля для каждого цвета
  colors.forEach(color => {
    initialFormValues[color.front] = null;
    initialFormValues[color.back] = null;
  });

  const [addEditFormValues, setAddEditFormValues] = useState(initialFormValues);
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);
  const [optionFormValues, setOptionFormValues] = useState({ 
    id: "", 
    name: "", 
    description: "",

    price: "", 
    image: null,
    Backimage: null,
    position: 0  // Новое поле для порядка наложения
  });

  // Получение списка трейлеров при монтировании компонента
  useEffect(() => {
    getMainList();
  }, []);

  // Функция для получения списка трейлеров
  const getMainList = async () => {
    try {
      const response = await fetch(`${baseURL}${getListAPIName}`);
      const res = await response.json();
      const { status, data } = res;
      if (status) {
        setRawTableData(data);
      } else {
        setRawTableData([]);
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      AntMessage.error('Ошибка при получении списка трейлеров.');
    }
  };

  // Функция для получения опций конкретного трейлера
  const getOptionsForTrailer = async (trailerId) => {
    try {
      const response = await axios.get(`${baseURL}${getOptionsAPIName}?trailerId=${trailerId}`);
      const { status, data } = response.data;
      if (status) {
        // Сортировка опций по полю position (по возрастанию)
        const sortedOptions = data.sort((a, b) => a.position - b.position);
        setOptions(sortedOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      AntMessage.error('Ошибка при получении опций.');
    }
  };

  // Обработка сохранения трейлера (добавление или редактирование)
  const handleOk = async () => {
    const formData = new FormData();
    
    // Добавляем основные поля
    formData.append('actionType', addEditFormValues.actionType);
    formData.append('_id', addEditFormValues._id);
    formData.append('Name', addEditFormValues.Name);
    formData.append('Price', addEditFormValues.Price);
    formData.append('Description', addEditFormValues.Description);
    formData.append('Size', addEditFormValues.Size);
    // Добавляем изображения для каждого цвета
    colors.forEach(color => {
      if (addEditFormValues[color.front]) {
        formData.append(color.front, addEditFormValues[color.front]);
      }
      if (addEditFormValues[color.back]) {
        formData.append(color.back, addEditFormValues[color.back]);
      }
    });

    try {
      const response = await axios.post(`${baseURL}${addEditAPIName}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { status, message } = response.data;
      if (status) {
        AntMessage.success(message);
        onUpdateList();
      } else {
        AntMessage.error(message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      AntMessage.error('Произошла ошибка при сохранении трейлера.');
    }
  };

  // Обработка открытия модального окна опций для конкретного трейлера
  const handleClickOptions = (trailer) => {
    setSelectedTrailerId(trailer._id);
    getOptionsForTrailer(trailer._id);
    setIsOptionsModalVisible(true);
  };

  // Обработка сохранения опции (добавление или редактирование)
  const handleOptionsOk = async () => {
    const formData = new FormData();
    formData.append('name', optionFormValues.name);
    formData.append('description', optionFormValues.description);

    formData.append('price', optionFormValues.price);
    formData.append('trailerId', selectedTrailerId);
    formData.append('position', optionFormValues.position);  // Добавлено поле order

    if (optionFormValues.image) {
      formData.append('image', optionFormValues.image);
    }

    if (optionFormValues.Backimage) {
      formData.append('Backimage', optionFormValues.Backimage);
    }

    try {
      let response;
      if (optionFormValues.id) {
        response = await axios.put(`${baseURL}${editOptionAPIName}/${optionFormValues.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post(`${baseURL}${addOptionAPIName}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      const { status, message } = response.data;
      if (status) {
        AntMessage.success(optionFormValues.id ? 'Опция успешно обновлена' : 'Опция успешно добавлена');
        handleOptionsCancel();
        getOptionsForTrailer(selectedTrailerId);
      } else {
        AntMessage.error(message);
      }
    } catch (error) {
      console.error('Error submitting option form:', error);
      AntMessage.error('Произошла ошибка при сохранении опции.');
    }
  };

  // Обработка закрытия модального окна опций
  const handleOptionsCancel = () => {
    setOptionFormValues({ id: "", name: "", description: "",  price: "", image: null, Backimage: null, position: 0 });
    setIsOptionsModalVisible(false);
  };

  // Обработка изменения полей формы трейлера
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEditFormValues({
      ...addEditFormValues,
      [name]: value,
    });
  };

  // Обработка изменения файловых полей формы трейлера
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setAddEditFormValues(prevValues => ({
        ...prevValues,
        [name]: files[0]
      }));
    }
  };

  // Обработка изменения полей формы опции
  const handleOptionInputChange = (value, field) => {
    setOptionFormValues({
      ...optionFormValues,
      [field]: value,
    });
  };

  // Обработка изменения файловых полей формы опции
  const handleOptionFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setOptionFormValues(prevValues => ({
        ...prevValues,
        [name]: files[0]
      }));
    }
  };

  // Обработка открытия модального окна редактирования трейлера
  const handleClickEdit = (data) => {
    setAddEditFormValues({ 
      ...data, 
      actionType: "edit" 
    });
    setIsModalVisible(true);
  };

  // Обработка удаления трейлера
  const handleClickDelete = (data) => {
    Modal.confirm({
      title: "Подтверждение",
      content: "Вы уверены, что хотите удалить этот трейлер?",
      okText: "Удалить",
      onOk: async () => {
        try {
          const response = await fetch(`${baseURL}${deleteAPIName}`, {
            method: "POST",
            body: JSON.stringify({ _id: data._id }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          });
          const res = await response.json();
          const { status, message } = res;
          if (status) {
            AntMessage.success(message);
            onUpdateList();
          } else {
            AntMessage.error(message);
          }
        } catch (error) {
          console.error('Error deleting trailer:', error);
          AntMessage.error('Произошла ошибка при удалении трейлера.');
        }
      },
    });
  };

  // Обработка удаления опции
  const handleClickOptionDelete = async (optionId) => {
    Modal.confirm({
      title: "Подтверждение",
      content: "Вы уверены, что хотите удалить эту опцию?",
      okText: "Удалить",
      onOk: async () => {
        try {
          const response = await axios.delete(`${baseURL}${deleteOptionAPIName}/${optionId}`);
          const { status, message } = response.data;

          if (status) {
            AntMessage.success(message);
            getOptionsForTrailer(selectedTrailerId);
          } else {
            AntMessage.error(message);
          }
        } catch (error) {
          console.error('Error deleting option:', error);
          AntMessage.error('Произошла ошибка при удалении опции.');
        }
      }
    });
  };

  // Функция для предварительного просмотра изображения
  const renderImagePreview = (file) => {
    if (file instanceof Blob) {
      return URL.createObjectURL(file);
    } else if (typeof file === 'string') {
      return file.startsWith('/') ? `${file}` : file;
    }
    return null;
  };

  // Колонки для таблицы трейлеров
  const columns = [
    { title: "Название", dataIndex: "Name", key: "Name" },
    { title: "Цена", dataIndex: "Price", key: "Price" },
    { title: "Описание", dataIndex: "Description", key: "Description" },
     { title: "Размер", dataIndex: "Size", key: "Size" },
    {
      title: "Изображения",
      key: "images",
      render: (text, record) => (
        <div>
          {colors.map(color => (
            <div key={color.label} style={{ marginBottom: '10px' ,display: 'flex'}}>
              <strong>{color.label}:</strong><br/>
              {record[color.front] && (
                <img
                  src={renderImagePreview(record[color.front])}
                  alt={`${color.label} Front`}
                  style={{ width: '50px', height: '50px', marginRight: '5px' }}
                />
              )}
              {record[color.back] && (
                <img
                  src={renderImagePreview(record[color.back])}
                  alt={`${color.label} Back`}
                  style={{ width: '50px', height: '50px' }}
                />
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Действия",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleClickEdit(record)}>Редактировать</Button>{" "}
          <Button type="danger" onClick={() => handleClickDelete(record)}>Удалить</Button>{" "}
          <Button type="default" onClick={() => handleClickOptions(record)}>Опции</Button>
        </>
      ),
    },
  ];

  // Колонки для таблицы опций
  const optionsColumns = [
    { title: "Название опции", dataIndex: "name", key: "name" },
    { title: "Описание опции", dataIndex: "description", key: "description" },
   
    { title: "Цена опции", dataIndex: "price", key: "price" },
    { 
      title: "Порядок наложения", 
      dataIndex: "position", 
      key: "position",
      sorter: (a, b) => a.position - b.position,
      render: (position) => (
        position > 0 ? `Поверх (Порядок: ${position})` :
        position < 0 ? `Под (Порядок: ${position})` :
        `Основное изображение (${position})`
      )
    },
    {
      title: "Изображение опции",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        image ? (
          <img
            src={renderImagePreview(image)}
            alt="Option"
            style={{ width: '100px', height: '100px' }}
          />
        ) : null
      )
    },
    {
      title: "Обратное изображение опции",
      dataIndex: "Backimage",
      key: "Backimage",
      render: (Backimage) => (
        Backimage ? (
          <img
            src={renderImagePreview(Backimage)}
            alt="Back Option"
            style={{ width: '100px', height: '100px' }}
          />
        ) : null
      )
    },
    {
      title: "Действия",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => {
            setOptionFormValues({ 
              id: record.id, 
              name: record.name, 
              description: record.description, 
             
              price: record.price, 
              image: record.image,
              Backimage: record.Backimage,
              position: record.position 
            });
            setIsOptionsModalVisible(true);
          }}>Редактировать</Button>{" "}
          <Button type="danger" onClick={() => handleClickOptionDelete(record.id)}>Удалить</Button>
        </>
      ),
    },
  ];

  // Обновление списка трейлеров после добавления/редактирования
  const onUpdateList = () => {
    setIsModalVisible(false);
    setAddEditFormValues(initialFormValues);
    getMainList();
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Кнопка для добавления нового трейлера */}
      <Button type="primary" style={{ margin: "30px" }} onClick={() => setIsModalVisible(true)}>
        Добавить трейлер
      </Button>

      {/* Модальное окно для добавления/редактирования трейлера */}
      <Modal
        title={addEditFormValues.actionType === "edit" ? "Редактировать трейлер" : "Добавить трейлер"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setAddEditFormValues(initialFormValues);
          setIsModalVisible(false);
        }}
        okText={addEditFormValues.actionType === "edit" ? "Сохранить" : "Добавить"}
        width={800}
      >
        <Form layout="vertical">
          <Form.Item label="Название">
            <Input
              placeholder="Название"
              name="Name"
              value={addEditFormValues.Name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Цена">
            <Input
              placeholder="Цена"
              name="Price"
              value={addEditFormValues.Price}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Размер">
            <Input
              placeholder="Размер"
              name="Size"
              value={addEditFormValues.Size}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Описание">
            <Input.TextArea
              placeholder="Описание"
              name="Description"
              value={addEditFormValues.Description}
              onChange={handleInputChange}
            />
          </Form.Item>

          {/* Генерация полей для каждого цвета */}
          {colors.map(color => (
            <div key={color.label} style={{ border: '1px solid #f0f0f0', padding: '10px', marginBottom: '15px' }}>
              <h4>{color.label} цвет</h4>
              <Form.Item label={`Переднее изображение (${color.label})`}>
                <input
                  type="file"
                  name={color.front}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {addEditFormValues[color.front] && (
                  <img
                    src={renderImagePreview(addEditFormValues[color.front])}
                    alt={`${color.label} Front`}
                    style={{ width: '100px', height: '100px', marginTop: '10px' }}
                  />
                )}
              </Form.Item>
              <Form.Item label={`Заднее изображение (${color.label})`}>
                <input
                  type="file"
                  name={color.back}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {addEditFormValues[color.back] && (
                  <img
                    src={renderImagePreview(addEditFormValues[color.back])}
                    alt={`${color.label} Back`}
                    style={{ width: '100px', height: '100px', marginTop: '10px' }}
                  />
                )}
              </Form.Item>
            </div>
          ))}

        </Form>
      </Modal>

      {/* Модальное окно для управления опциями трейлера */}
      <Modal
        title="Управление опциями"
        visible={isOptionsModalVisible}
        onCancel={handleOptionsCancel}
        footer={null}
        width="70%"
      >
        {/* Форма для добавления/редактирования опции */}
        <Form layout="vertical">
          <Form.Item label="Название опции">
            <Input
              placeholder="Название опции"
              name="name"
              value={optionFormValues.name}
              onChange={(e) => handleOptionInputChange(e.target.value, 'name')}
            />
          </Form.Item>
          <Form.Item label="Цена опции">
            <Input
              placeholder="Цена опции"
              name="price"
              value={optionFormValues.price}
              onChange={(e) => handleOptionInputChange(e.target.value, 'price')}
            />
          </Form.Item>
          <Form.Item label="Описание опции">
            <Input
              placeholder="Описание опции"
              name="description"
              value={optionFormValues.description}
              onChange={(e) => handleOptionInputChange(e.target.value, 'description')}
            />
          </Form.Item>
          <Form.Item label="Порядок наложения">
            <Input
              type="number"
              placeholder="Введите числовой порядок (например, -2, -1, 1, 2)"
              name="position"
              value={optionFormValues.position}
              onChange={(e) => handleOptionInputChange(parseInt(e.target.value, 10) || 0, 'position')}
            />
            <div style={{ marginTop: '5px', color: '#888' }}>
              Значение меньше 0: под основным изображением<br/>
              Значение больше 0: поверх основного изображения<br/>
              Значение 0: основное изображение
            </div>
          </Form.Item>
          <Form.Item label="Изображение опции">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleOptionFileChange}
            />
            {optionFormValues.image && (
              <img
                src={renderImagePreview(optionFormValues.image)}
                alt="Option"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>
          <Form.Item label="Заднее изображение опции">
            <input
              type="file"
              name="Backimage"
              accept="image/*"
              onChange={handleOptionFileChange}
            />
            {optionFormValues.Backimage && (
              <img
                src={renderImagePreview(optionFormValues.Backimage)}
                alt="Back Option"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleOptionsOk}>
              {optionFormValues.id ? "Сохранить опцию" : "Добавить опцию"}
            </Button>
          </Form.Item>
        </Form>

        {/* Таблица с опциями */}
        <Table
          rowKey={(record) => record.id}
          columns={optionsColumns}
          dataSource={options}
          pagination={{ pageSize: 5 }}
        />
      </Modal>

      {/* Таблица с трейлерами */}
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={rawTableData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default Trailers;
