import styled from 'styled-components';

export const Content = styled.div`
    height: 90vh;
    align-items: top;
    justify-content: center;
    font-size: 1.5rem;
    color: #1E99F2;

    
.bottom-right {
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.overlay-text {
  color: white;
  font: bold 24px/45px Helvetica, Sans-Serif;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.4);
  padding: 3px;
}
`;