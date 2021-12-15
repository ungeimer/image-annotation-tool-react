import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    height: 65vh;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #1E99F2;

    h1, h2, h3 {
        font-size: 2.5rem;
        font-weight: 600;
    }

    label {
        font-size: 2.5rem;
        font-weight: 600;
    }

    Button {
        height: 30px;
        font-size: 14px;
        font-weight: 600;
        padding-right: 30px;
    }

    Button.primary {
        background-color: #1E99F2;
    }

    table {
        border: 0,
        padding: "50px",
        minWidth: 650,
    }

    input, select {
        width: 300px;
        font-size: 16px;
    }
`;