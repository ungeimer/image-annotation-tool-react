import React, { useState, useEffect } from "react";
import DropdownTags from "../../Dropdown/DropdownTags";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const FooterCaption = ({
  innerProps: { innerRef, ...innerProps },
  isModal,
}) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [updateState, setUpdateState] = useState("");

  useEffect(() => {
    getTags();
  }, [selectedTag, updateState]);

  const getTags = async () => {
    let tags = [];
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/images/${localStorage.getItem(
          "imgSelection"
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
      tags = res.tags.map((item) => item.tag);
      console.log("RESTAG", tags);
      setTagList(tags);
    } catch (error) {
      console.log(error);
    }
  };

  const addTag = async () => {
    let raw = JSON.stringify(
      {
      tags: { 
        tag: selectedTag 
      }
    });

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/images/${localStorage.getItem(
          "imgSelection"
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
      setUpdateState(res);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTag = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/images/delete/${localStorage.getItem(
          "imgSelection"
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
          },
        }
      );
      res = await res.json();
      setUpdateState(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isModal && (
      <>
        <div {...innerProps}>
          <h1> Select tag </h1>
          <DropdownTags
            tags={localStorage.getItem("localTags").split(",")}
            setSelectedTag={setSelectedTag}
          />
          <h1> Action </h1>
          <Button
            variant="contained"
            size="large"
            onClick={addTag}
            startIcon={<LocalOfferIcon />}
          >
            Add Tag
          </Button>
          <br></br>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={removeTag}
            startIcon={<DeleteIcon />}
          >
            Remove last tag
          </Button>
        </div>
        <div>
          {" "}
          <h1
            className="container"
            style={{
              margin: "0.1em",
              color: "#30B2EB",
              background: "black",
              flexDirection: "row",
              alignItems: "flex-end",
              opacity: 0.6,
            }}
          >
            {" "}
            {tagList.join(", ")}
          </h1>{" "}
        </div>
      </>
    )
  );
};

export default FooterCaption;
