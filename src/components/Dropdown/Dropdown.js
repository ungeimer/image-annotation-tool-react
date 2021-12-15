import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Dropdown = ({ setIdCollection }) => {
  // set dropdown value and have initial of none
  const [list, setList] = useState(["Collection"]);
  const [selection, setSelection] = useState("");

  const handleChange = (event) => {
    setSelection(event.target.value);
    setIdCollection(event.target.value);
    localStorage.setItem("LocalCollection", event.target.value);
  };

  useEffect(() => {
    getCollections();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const getCollectionTags = () => {
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
      `${process.env.REACT_APP_API_URL}/collection/info/${localStorage.getItem(
        "LocalCollection"
      )}`,
      requestOptions
    ).then((response) => {
      response
        .json()
        .then((response) => localStorage.setItem("localTags", response?.tags));
    });
  };

  function getCollections() {
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
      response.json().then((response) => {
        setList(response);
        getCollectionTags();
      });
    });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="col-selection">Collection</InputLabel>
        <Select
          style={{ backgroundColor: "#FFFF", fontSize: "1rem" }}
          labelId="label-id"
          id="id"
          value={selection}
          label="collection"
          onChange={handleChange}
        >
          {list.map((item) => (
            <MenuItem value={item._id}> {item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
