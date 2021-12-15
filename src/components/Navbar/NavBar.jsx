import React from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000;
  height: fit-content;
  width: 100%;
  padding: 10px;
`;

const StyledLinksContainer = styled.div`
  margin-top: 0px;
  height: 40px;
  width: 100%;
  direction: rtl;
`;

const StyledList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
`;

const StyledItem = styled.li`
  list-style-type: none;
  display: inline-block;
  width: 17%;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
  text-rendering: geometricPrecision;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  line-height: 40px;
  color: #fff;
  font-family: ProximaNova;
  font-size: 20px;
`;

const NavBar = ({setIdCollection}) => {
  return (
    <StyledContainer>
      <StyledItem>
        <Dropdown setIdCollection={setIdCollection}/>
      </StyledItem>
      <StyledLinksContainer>
        <StyledList>
          <StyledItem>
            <StyledLink to="#"></StyledLink>
          </StyledItem>
        </StyledList>
      </StyledLinksContainer>
    </StyledContainer>
  );
};
export default NavBar;
