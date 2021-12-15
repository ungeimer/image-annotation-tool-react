/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Content } from "./Collections.style";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/FolderOpen";
import Sidebar from "../Sidebar";
import useToggle from "./useToggle";
import Modal from "./Modal/Modal";
import Images from "./Images/Images";
import { confirmAlert } from "react-confirm-alert";
import download from 'downloadjs';
import "react-confirm-alert/src/react-confirm-alert.css";

const Collections = () => {
  const [tableData, setTableData] = useState([]);
  const tableImage = [];
  const [open, setOpen] = useToggle(false);
  const [openImages, setOpenImages] = useState(false);
  const [edit, setEdit] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionTags, setCollectionTags] = useState([]);

  const onChangeCollectionName = (e) => setCollectionName(e.target.value);
  const onChangeCollectionTags = (e) =>
    setCollectionTags(e.target.value.replace(/\s/g, "").split(","));

  tableData.map((tableData) => {
    tableImage.push(tableData.image);
  });
  
  const getStorageValue = (key) => {
    // getting stored value
    const saved = localStorage.getItem(key);
    return saved;
  };

  useEffect(() => {
    getCollections();
    if (edit) {
      setCollectionName(getStorageValue("Name"));
      setCollectionTags(getStorageValue("Tags"));
      console.log("xd");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, getStorageValue("Tags")]);

  const getCollections = () => {
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
      `${process.env.REACT_APP_API_URL}/collection?sortBy=createdAt:asc`,
      requestOptions
    ).then((response) => {
      response.json().then((response) => setTableData(response));
    });
  };

  const downloadZip = () => {
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
      `${process.env.REACT_APP_API_URL}/download/${localStorage.getItem(
        "SELECTION"
      )}`,
      requestOptions
    ).then((response) => {
      const blob = response.blob();
      download(blob,"download.zip")
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
      field: "name",
      headerName: "Title",
      width: 200,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 400,
    },
  ];

  tableData.map((tableData) => {
    tableData.id = tableData?._id;
  });

  const updateCollection = async () => {
    let raw = JSON.stringify({
      name: collectionName,
      tags: collectionTags,
    });

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/collection/${localStorage.getItem(
          "SELECTION"
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
          },
          body: raw,
        }
      );

      res = await res.json();
      console.log(res);
      getCollections();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCollection = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/collection/${localStorage.getItem(
          "SELECTION"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
          },
        }
      );
      res = await res.json();
      console.log(res);
      downloadZip();
      JSONToCSV(res, localStorage.getItem("Name"), true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCollection = async () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/collection/${localStorage.getItem(
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
        getCollections();
      });
  };

  const createCollection = async () => {
    let raw = JSON.stringify({
      name: collectionName,
      tags: collectionTags,
    });
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/collection`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
        },
        body: raw,
      });

      res = await res.json();
      console.log(res);
      getCollections();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = () => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteCollection();
            getCollections();
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };

  function JSONToCSV(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    let arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
    for (let i = 0; i < arrData.length; i++) {
      delete arrData[i]._id;
    }
    let CSV = `sep=,\r\n`;
    //This condition will generate the Label/Header
    if (ShowLabel) {
      let row = " ";
      //This loop will extract the label from 1st index of on array
      for (let index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + "\r\n";
    }
    //1st loop is to extract each row
    for (let i = 0; i < arrData.length; i++) {
      let row = "";
      //2nd loop will extract each column and convert it in string comma-seprated
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + "\r\n";
    }
    if (CSV === "") {
      alert("Invalid data");
      return;
    }
    //Generate a file name
    let fileName = "Tagget_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");
    //Initialize file format you want csv or xls
    let uri = "data:text/csv;charset=utf-8," + escape(CSV);

    //this trick will generate a temp <a /> tag
    let link = document.createElement("a");
    link.href = uri;
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <>
        {openImages && (
          <Images collectionId={localStorage.getItem("SELECTION")} />
        )}
      </>
      {!openImages && (
        <Content>
          <Sidebar setOpenImages={setOpenImages} />

          <div id="modal-root" />
          <div style={{ height: 500, width: "60%", paddingLeft: "120px" }}>
            {" "}
            <br />
            {open && !edit && (
              <Modal
                open={open}
                toggle={setOpen}
                button={"Create"}
                action={createCollection}
                collectionName={collectionName}
              >
                <h5>Create collection</h5>
                <br />
                <h5 style={{ fontSize: "0.6em", color: "black" }}>Name</h5>

                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    name="Collection name"
                    value={collectionName}
                    onChange={(e) => onChangeCollectionName(e)}
                  />
                  <h5 style={{ fontSize: "0.6em", color: "black" }}>
                    {" "}
                    Default tags{" "}
                  </h5>
                  <h5 style={{ fontSize: "0.5em", color: "grey" }}>
                    {" "}
                    (Separated by comma){" "}
                  </h5>
                  <input
                    type="text"
                    name="Default tags"
                    value={collectionTags}
                    onChange={(e) => onChangeCollectionTags(e)}
                  />
                </form>
              </Modal>
            )}
            {open && edit && (
              <Modal
                open={open}
                toggle={setOpen}
                button={"Edit"}
                action={updateCollection}
                collectionName={collectionName}
              >
                <h5 style={{ color: "red" }}>Update collection</h5>
                <br />
                <h5 style={{ fontSize: "0.6em", color: "black" }}>Name</h5>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    name="Collection name"
                    value={collectionName}
                    onChange={(e) => {
                      onChangeCollectionName(e);
                    }}
                  />
                  <br />
                  <h5 style={{ fontSize: "0.6em", color: "black" }}>
                    Default tags
                  </h5>
                  <h5 style={{ fontSize: "0.5em", color: "grey" }}>
                    {" "}
                    (Separated by comma){" "}
                  </h5>
                  <input
                    type="text"
                    name="Default tags"
                    value={collectionTags}
                    onChange={(e) => {
                      setCollectionTags(localStorage.getItem(collectionTags));
                      onChangeCollectionTags(e);
                    }}
                  />
                </form>
              </Modal>
            )}
            <h3>Collections</h3>
            <Button
              onClick={() => {
                setOpenImages(true);
              }}
              variant="contained"
              color="default"
              startIcon={<FolderIcon />}
            >
              Open
            </Button>
            <span />
            <Button
              onClick={() => {
                setOpen();
                setEdit(false);
              }}
              variant="contained"
              color="default"
              startIcon={<AddIcon />}
            >
              Create
            </Button>
            <span />
            <Button
              onClick={() => {
                setOpen();
                setEdit(true);
              }}
              variant="contained"
              color="default"
              startIcon={<EditIcon />}
            >
              Update
            </Button>
            <span />
            <Button
              onClick={downloadCollection}
              variant="contained"
              color="default"
              startIcon={<GetAppIcon />}
            >
              Download
            </Button>
            <span />
            <Button
              onClick={onDelete}
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
              onSelectionModelChange={(e) =>
                localStorage.setItem("SELECTION", e)
              }
              components={{}}
              onRowClick={(e) => {
                localStorage.setItem("Name", e.row.name);
                localStorage.setItem("Tags", e.row.tags);
              }}
            />
          </div>
        </Content>
      )}
    </>
  );
};

export default Collections;
