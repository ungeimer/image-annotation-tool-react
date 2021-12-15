/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Content } from "../Collections.style";
import Button from "@material-ui/core/Button";
import Edit from "../../Edit/Edit";
import UploadFiles from "../../Upload/Upload";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Sidebar from "../../Sidebar";

const Images = ({ collectionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const tableImage = [];

  tableData.map((tableData) => {
    tableImage.push(tableData.image);
  });

  useEffect(() => {
    getFiles();
  }, []);
  
  const getFiles = () => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("USER_TOKEN");

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/collection/id/${localStorage.getItem(
        "SELECTION"
      )}`,
      requestOptions
    ).then((response) => {
      response.json().then((response) => {
        setTableData(response);
      });
    });
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
      hide: true,
    },
    {
      field: "path",
      headerName: "File name",
      width: 400,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 400,
    },
  ];
  //console.log("tableData ID:"+tableData[1].id);
  tableData.map((tableData) => {
    tableData.id = tableData._id;
  });

  const deleteImage = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/images/${localStorage.getItem(
        "SELECTION"
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        getFiles();
      });
  };

  return (
    <Content>
      <Sidebar />
      <div style={{ height: 500, width: "60%", paddingLeft: "120px" }}>
        {" "}
        <UploadFiles collectionId={collectionId}  />
        <h3>Files</h3>
        <Button
          onClick={() => setIsOpen(true)}
          variant="contained"
          color="default"
          startIcon={<EditIcon />}
        >
          Update
        </Button>
        <span />
        <Button
          onClick={deleteImage}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          delete
        </Button>
        <DataGrid
          rows={tableData}
          columns={columns}
          options={{
            pageSize: 12,
            pageSizeOptions: [12],
          }}
          rowsPerPageOptions={[100]}
          onSelectionModelChange={(e) => localStorage.setItem("SELECTION", e)}
          components={{}}
          onRowClick={(e) => {
            localStorage.setItem("Description", e.row.description);
            localStorage.setItem("Img", e.row.image);
          }}
        />
        <Edit open={isOpen} onClose={() => setIsOpen(false)}>
          Edit
        </Edit>
      </div>
    </Content>
  );
};

export default Images;
