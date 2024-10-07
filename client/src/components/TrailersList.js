import React, { useEffect, useState } from "react";
import { Table, message as AntMessage } from "antd";

function TrailerList() {
  //const baseURL = "http://95.79.52.15:26336/";
  const baseURL = "http://192.168.0.149:3000/";
  const getListAPIName = "api/trailer/getAll";

  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    fetchTrailerList();
  }, []);

  const fetchTrailerList = () => {
    fetch(`${baseURL}${getListAPIName}`)
      .then((response) => response.json())
      .then((res) => {
        let { status, data } = res;
        if (status) {
          setTrailers(data);
        } else {
          setTrailers([]);
          AntMessage.error("Failed to fetch trailers.");
        }
      })
      .catch(() => {
        AntMessage.error("An error occurred while fetching trailers.");
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
  ];

  return (
    <div style={{ padding: "30px" }}>
      <Table rowKey={(record) => record._id} columns={columns} dataSource={trailers} />
    </div>
  );
}

export default TrailerList;
