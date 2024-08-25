import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message as AntMessage } from "antd";
import axios from 'axios';

function Trailers() {
  const baseURL = "http://95.79.52.15:26336/";

  const getListAPIName = "api/trailer/getAll";
  const addEditAPIName = "api/trailer/addEditTrailer";
  const deleteAPIName = "api/trailer/deleteTrailer";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleOk = async () => {
    const formData = new FormData();

    // Добавляем обычные поля
    Object.keys(addEditFormValues).forEach((key) => {
      if (key !== 'FrontImg' && key !== 'BackImg') {
        formData.append(key, addEditFormValues[key]);
      }
    });

    // Добавляем файлы, если они есть
    if (addEditFormValues.FrontImg) {
      formData.append('FrontImg', addEditFormValues.FrontImg);
    }
    if (addEditFormValues.BackImg) {
      formData.append('BackImg', addEditFormValues.BackImg);
    }

    try {
      const response = await axios.post(`${baseURL}${addEditAPIName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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

  const handleCancel = () => {
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
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
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

  const onUpdateList = () => {
    setIsModalVisible(false);
    getMainList();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleClickEdit(record)}>
            Edit
          </Button>{" "}
          <Button type="danger" onClick={() => handleClickDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <Button type="primary" style={{ margin: "30px" }} onClick={() => setIsModalVisible(true)}>
        Add Trailer
      </Button>

      <Modal
        title={addEditFormValues.actionType === "edit" ? "Edit Trailer" : "Add Trailer"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <Input
              placeholder="Name"
              name="Name"
              value={addEditFormValues.Name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Price"
              name="Price"
              value={addEditFormValues.Price}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Description"
              name="Description"
              value={addEditFormValues.Description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <input
              type="file"
              name="FrontImg"
              accept="image/*"
              onChange={handleFileChange}
            />
            {addEditFormValues.FrontImg && (
              <img
                src={URL.createObjectURL(addEditFormValues.FrontImg)}
                alt="Front"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <input
              type="file"
              name="BackImg"
              accept="image/*"
              onChange={handleFileChange}
            />
            {addEditFormValues.BackImg && (
              <img
                src={URL.createObjectURL(addEditFormValues.BackImg)}
                alt="Back"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>
        </Form>
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
