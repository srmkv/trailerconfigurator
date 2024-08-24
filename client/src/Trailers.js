import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message as AntMessage } from "antd";

function Trailers() {
  const baseURL = "http://95.79.52.15:26336/";

  const getListAPIName = "api/trailer/getAll";
  const addEditAPIName = "api/trailer/addEditTrailer";
  const deleteAPIName = "api/trailer/deleteTrailer";

  const initialState = {
    actionType: "add",
    _id: "",
    Name: "",
    Price: "",
    Description: "",
    FrontImg: "",
    BackImg: "",
  };

  const [rawTableData, setRawTableData] = useState([]);
  const [addEditFormValues, setAddEditFormValues] = useState(initialState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onUpdateList = () => {
    setIsModalVisible(false);
    setAddEditFormValues(initialState);
    getMainList();
  };

  const handleOk = () => {
    fetch(`${baseURL}${addEditAPIName}`, {
      method: "POST",
      body: JSON.stringify(addEditFormValues),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        let { status, message } = res;
        if (status) {
          AntMessage.success(message);
          onUpdateList();
        } else {
          AntMessage.error(message);
        }
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setAddEditFormValues(initialState);
    setIsModalVisible(false);
  };

  useEffect(() => {
    getMainList();
  }, []);

  const getMainList = () => {
    fetch(`${baseURL}${getListAPIName}`)
      .then((response) => response.json())
      .then((res) => {
        let { status, data } = res;
        if (status) {
          setRawTableData(data);
        } else {
          setRawTableData([]);
        }
      });
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
      field: "action",
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

  const handleClickEdit = (data) => {
    setAddEditFormValues({ ...data, actionType: "edit" });
    setIsModalVisible(true);
  };

  const handleClickDelete = (data) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete it?",
      okText: "Delete",
      onOk: () => {
        fetch(`${baseURL}${deleteAPIName}`, {
          method: "POST",
          body: JSON.stringify({ _id: data._id }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((res) => {
            let { status, message } = res;
            if (status) {
              AntMessage.success(message);
              onUpdateList();
            } else {
              AntMessage.error(message);
            }
          });
      },
    });
  };

  const handleInputChange = (e) => {
    setAddEditFormValues({
      ...addEditFormValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <Button type="primary" style={{ margin: "30px" }} onClick={showModal}>
        Add Trailer
      </Button>

      <Modal
        title={
          addEditFormValues.actionType === "edit" ? "Edit Trailer" : "Add Trailer"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Name"
          name="Name"
          value={addEditFormValues.Name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Price"
          name="Price"
          value={addEditFormValues.Price}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Description"
          name="Description"
          value={addEditFormValues.Description}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Front Image URL"
          name="FrontImg"
          value={addEditFormValues.FrontImg}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Back Image URL"
          name="BackImg"
          value={addEditFormValues.BackImg}
          onChange={handleInputChange}
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
