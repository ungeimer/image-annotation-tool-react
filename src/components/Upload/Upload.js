import React, { useState } from "react";
import { Content } from "./Upload.style";
import "./Upload.css";

export default function UploadFiles({ collectionId }) {
  const localStorageToken = localStorage["USER_TOKEN"];

  const [messageOne, setMessageOne] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  function handleUpload(e) {
    e.preventDefault();
    var returnStatus = 0;
    setMessageOne("Cargando archivo...");


    let file = document.getElementsByTagName("input")[0];

    async function uploadRequest() {
      const url = `${process.env.REACT_APP_API_URL}/images/${collectionId}`;

      const fd = new FormData();
      let files = file.files;
      let index = 1;
      for (const file of files) {
        fd.append("inpFile", file);
        index = index + 1;
      }

      let res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorageToken,
        },
        body: fd,
      });
      if (res.ok) {
        console.log("RES UPLOAD",res)
        let ret = await res.json();
        returnStatus = `${res.status}`;

        return ret;
      } else {
        return `HTTP error: ${res.status}`;
      }
    }

    uploadRequest().then((data) => {
      if (returnStatus === "201") {
        data.forEach((image) => {
          sessionStorage.setItem(`${image.imageName}`, image);
        });
        setMessageOne("Correcto ... redireccionando a carga de archivos");
        window.location.reload();
      } else {
        setMessageOne("");
        setMessageTwo("Error al cargar el archivo. Por favor intente de nuevo");
      }
    });
  }

  function handlePreview(e) {
    //Image Preview
    let fileInput = document.getElementById("image");
    let imageContainer = document.getElementById("images");
    let numOfFiles = document.getElementById("num-of-files");
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fileInput.files.length} Archivos seleccionados`;

    for (let file of fileInput.files) {
      let reader = new FileReader();
      let figure = document.createElement("figure");
      let figCap = document.createElement("figcaption");

      figCap.innerText = file.name;
      figure.appendChild(figCap);

      // eslint-disable-next-line no-loop-func
      reader.onload = () => {
        let img = document.createElement("embed");
        img.setAttribute("src", reader.result);
        figure.insertBefore(img, figCap);

        let div = document.createElement("div");
        div.setAttribute("class", "metaData");
        div.innerHTML = `
                    <div id="metaDataInner">
                    <br/>
                </div><button className='close' onClick={window.location.reload()}>Close</button>
                `;
        figure.appendChild(div);
      };

      imageContainer.appendChild(figure);
      reader.readAsDataURL(file);
    }
  }

  return (
    <Content>
      <div className="container">
        <form
          encType="multipart/form-data"
          onSubmit={handleUpload}
          onChange={handlePreview}
        >
          <input type="file" id="image" name="image" multiple />
          <div id="images"></div>
          <div id="metaData"></div>
          <p id="num-of-files">No hay archivos seleccionados</p>
          <label htmlFor="image" id="recordLabel">
            Seleccionar archivo(s)
          </label>
          <button className="uploadButton" type="submit">
            Cargar
          </button>
        </form>
      </div>

      <p id="message-1">{messageOne}</p>
      <p id="message-2">{messageTwo}</p>
    </Content>
  );
}
