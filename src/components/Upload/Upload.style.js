import styled from "styled-components";

export const Content = styled.div`
    .uploadButton:hover, #recordLabel:hover {
        background-color: #b1b1b1;
    }
    .container {
        background-color: white;
        display: flex;
        flex-direction: column;
        /* width: 90%; */
        min-width: 450px;
        overflow: hidden;
        min-height: 1%;
        position: relative;
        /* margin: 30px auto; */
        padding: 30px 20px;
        border-radius: 15px;
        box-shadow: 0 5px 10px black;
        z-index: 1000;
        /*
        align-items: center;
        justify-content: center;
        margin-top: 0%;
        margin-bottom: 5%;
        color: #1e99f2;
        text-align: center;
        height: 30vh;
        */
    }
    input[type="file"] {
        display: none;
    }
    #recordLabel, .uploadButton {
        display: block;
        position: relative;
        background-color: darkgrey;
        color: white;
        /* font-size: 18px; */
        text-align: center;
        width: 200px;
        height: 70px;
        padding: 25px 0;
        margin: auto;
        margin-bottom: 10px;
        border-radius: 5px;
        cursor: pointer;
        border: none;
        font-weight: bold;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: medium;
    }
    .container p {
        text-align: center;
        margin: 20px 0 20px 0;
    }
    #images, #metaData {
        width: 80%;
        /* border: 1px solid black; */
        position: relative;
        margin: auto;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
    figure {
        width: 35%;
        margin: auto;
        padding: 10px;
    }
    embed, #metaData label, canvas {
        width: 80%;
        padding-top: 2vh;
    }
    figcaption, #metaData input, #metaData select {
        text-align: center;
        font-size: medium;
        margin-top: 10px;
    }
    #metaDataInner {
        font-size: small;
        text-align: center;
        margin: 3px;
    }
    #metaDataInner input {
        width: 100%;
        padding: 3px 0px;
        text-align: center;
        margin-bottom: 1%;
    }
    #metaDataInner select {
        width: 100%;
        border-color: #cccccc;
        color: #757575;
        padding: 3px 0px;
        margin: 1px;
    }
    .close {
        font-size: 55px;
    }
`;