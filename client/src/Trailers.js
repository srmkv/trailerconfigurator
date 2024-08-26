import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message as AntMessage } from "antd";
import axios from 'axios';

function Trailers() {
  const baseURL = "http://95.79.52.15:26336/";

  const getListAPIName = "api/trailer/getAll";
  const addEditAPIName = "api/trailer/addEditTrailer";
  const deleteAPIName = "api/trailer/deleteTrailer";
  const getOptionsAPIName = "api/options/getAll"; // Обновленный путь
  const addOptionAPIName = "api/options/addOption";
  const editOptionAPIName = "api/options/edit"; // Убедитесь, что этот путь используется в API
  const deleteOptionAPIName = "api/options/delete"; // Обновленный путь

  const [rawTableData, setRawTableData] = useState([]);
  const [addEditFormValues, setAddEditFormValues] = useState({
    actionType: "add",
    _id: "",
    Name: "",
    Price: "",
    Description: "",
    FrontImg: null,
    BackImg: null
  });
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);
  const [optionFormValues, setOptionFormValues] = useState({ name: "", description: "" });

  useEffect(() => {
    getMainList();
  }, []);

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
      AntMessage.error('Error fetching list.');
    }
  };

const getOptionsForTrailer = async (trailerId) => {
  try {
    const response = await axios.get(`${baseURL}${getOptionsAPIName}?trailerId=${trailerId}`);
    console.log("Options response:", response.data); // Логирование для проверки
    const { status, data } = response.data;
    if (status) {
      setOptions(data); // Загружаем только отфильтрованные опции
    } else {
      setOptions([]);
    }
  } catch (error) {
    console.error('Error fetching options:', error);
    AntMessage.error('Error fetching options.');
  }
};


  const handleOk = async () => {
    const formData = new FormData();
    Object.keys(addEditFormValues).forEach((key) => {
      if (key !== 'FrontImg' && key !== 'BackImg') {
        formData.append(key, addEditFormValues[key]);
      }
    });
    if (addEditFormValues.FrontImg) {
      formData.append('FrontImg', addEditFormValues.FrontImg);
    }
    if (addEditFormValues.BackImg) {
      formData.append('BackImg', addEditFormValues.BackImg);
    }

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
      AntMessage.error('Something went wrong.');
    }
  };

const handleClickOptions = (trailer) => {
  setSelectedTrailerId(trailer._id);
  getOptionsForTrailer(trailer._id);
  setIsOptionsModalVisible(true);
};

const handleOptionsOk = async () => {
  const { name, description } = optionFormValues;

  if (!name || !description) {
    AntMessage.error('All fields are required.');
    return;
  }

  try {
    if (optionFormValues.id) {
      await axios.post(`${baseURL}${editOptionAPIName}`, { ...optionFormValues, trailerId: selectedTrailerId });
      AntMessage.success('Option updated successfully');
    } else {
      await axios.post(`${baseURL}${addOptionAPIName}`, { ...optionFormValues, trailerId: selectedTrailerId });
      AntMessage.success('Option added successfully');
    }
    handleOptionsCancel();
    getOptionsForTrailer(selectedTrailerId);
  } catch (error) {
    console.error('Error submitting option form:', error);
    AntMessage.error('Something went wrong.');
  }
};

  const handleOptionsCancel = () => {
    setOptionFormValues({ name: "", description: "" });
    setIsOptionsModalVisible(false);
  };


  const handleInputChange = (e) => {
    setAddEditFormValues({
      ...addEditFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setAddEditFormValues(prevValues => ({
        ...prevValues,
        [name]: files[0]
      }));
    }
  };

  const handleOptionInputChange = (e) => {
    setOptionFormValues({
      ...optionFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickEdit = (data) => {
    setAddEditFormValues({ ...data, actionType: "edit" });
    setIsModalVisible(true);
  };

  const handleClickDelete = (data) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete it?",
      okText: "Delete",
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
          AntMessage.error('Something went wrong.');
        }
      },
    });
  };

 const handleClickOptionDelete = async (optionId) => {
  Modal.confirm({
    title: "Confirm",
    content: "Are you sure you want to delete this option?",
    okText: "Delete",
    onOk: async () => {
      try {
        const response = await axios.post(`${baseURL}${deleteOptionAPIName}`, { id: optionId, trailerId: selectedTrailerId });
        const { status, message } = response.data;
        if (status) {
          AntMessage.success(message);
          getOptionsForTrailer(selectedTrailerId);
        } else {
          AntMessage.error(message);
        }
      } catch (error) {
        console.error('Error deleting option:', error);
        AntMessage.error('Something went wrong.');
      }
    }
  });
};

  const renderImagePreview = (file) => {
    if (file instanceof Blob) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const columns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "Price", dataIndex: "Price", key: "Price" },
    { title: "Description", dataIndex: "Description", key: "Description" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleClickEdit(record)}>Edit</Button>{" "}
          <Button type="danger" onClick={() => handleClickDelete(record)}>Delete</Button>{" "}
          <Button type="default" onClick={() => handleClickOptions(record)}>Options</Button>
        </>
      ),
    },
  ];

  const optionsColumns = [
    { title: "Option Name", dataIndex: "name", key: "name" },
    { title: "Option Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => {
            setOptionFormValues({ id: record.id, name: record.name, description: record.description });
            setIsOptionsModalVisible(true);
          }}>Edit</Button>{" "}
          <Button type="danger" onClick={() => handleClickOptionDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const onUpdateList = () => {
    setIsModalVisible(false);
    getMainList();
  };

  return (
    <div style={{ padding: "30px" }}>
      <Button type="primary" style={{ margin: "30px" }} onClick={() => setIsModalVisible(true)}>
        Add Trailer
      </Button>

      <Modal
        title={addEditFormValues.actionType === "edit" ? "Edit Trailer" : "Add Trailer"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setAddEditFormValues({
            actionType: "add",
            _id: "",
            Name: "",
            Price: "",
            Description: "",
            FrontImg: null,
            BackImg: null
          });
          setIsModalVisible(false);
        }}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              name="Name"
              value={addEditFormValues.Name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              placeholder="Price"
              name="Price"
              value={addEditFormValues.Price}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              placeholder="Description"
              name="Description"
              value={addEditFormValues.Description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Front Image">
            <input
              type="file"
              name="FrontImg"
              accept="image/*"
              onChange={handleFileChange}
            />
            {addEditFormValues.FrontImg && (
              <img
                src={renderImagePreview(addEditFormValues.FrontImg)}
                alt="Front"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>
          <Form.Item label="Back Image">
            <input
              type="file"
              name="BackImg"
              accept="image/*"
              onChange={handleFileChange}
            />
            {addEditFormValues.BackImg && (
              <img
                src={renderImagePreview(addEditFormValues.BackImg)}
                alt="Back"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Manage Options"
        visible={isOptionsModalVisible}
        onCancel={handleOptionsCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Option Name">
            <Input
              placeholder="Option Name"
              name="name"
              value={optionFormValues.name}
              onChange={handleOptionInputChange}
            />
          </Form.Item>
          <Form.Item label="Option Description">
            <Input
              placeholder="Option Description"
              name="description"
              value={optionFormValues.description}
              onChange={handleOptionInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleOptionsOk}>
              {optionFormValues.id ? "Update Option" : "Add Option"}
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowKey={(record) => record.id}
          columns={optionsColumns}
          dataSource={options}
        />
      </Modal>

      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={rawTableData}
      />
    </div>
  );
}

export default Trailers;
