import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Content } from "./Tags.style";
import Sidebar from "../Sidebar";
import NavBar from "../Navbar/NavBar";
import FooterCaption from "./FooterCaption/FooterCaption";

const Tags = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [idCollection, setIdCollection] = useState("61ac2d353613383434fa7ccf");
  const [photos, setPhotos] = useState([]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    console.log("imgSelection", photo._id);
    console.log("currentIndex", index);
    localStorage.setItem("imgSelection", photo._id);
    setViewerIsOpen(true);
  }, []);

  var myHeaders = new Headers();
  const token = localStorage.getItem("USER_TOKEN");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const requestData = async () =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/collection/id/${idCollection}`,
      requestOptions
    ).then((response) => {
      return response.json();
    });

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    requestData().then((response) => {
      let array = [];
      for (let i = 0; i < response.length; i++) {
        let object = {
          _id: response[i]._id,
          src: `${process.env.REACT_APP_API_URL}/imageFiles/${response[i].path}`,
          tags: response[i].tags,
          width: response[i].width,
          height: response[i].height,
        };

        array.push(object);
      }
      if (JSON.stringify(photos) !== JSON.stringify(array)) {
        setPhotos(array);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(photos)]);

  return (
    <>
      {
        <Content>
          <Sidebar />
          <div style={{ marginLeft: 250 }}>
            <NavBar setIdCollection={setIdCollection} />
            <Gallery photos={photos} onClick={openLightbox} column={9} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={photos.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                    components={{
                      FooterCaption,
                    }}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </Content>
      }
    </>
  );
};

export default Tags;
