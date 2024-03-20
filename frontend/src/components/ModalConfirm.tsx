import React from "react";
import styled from "styled-components";
import { fontFamilies } from "../styles/GlobalStyles";

interface ModalConfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor escura de fundo */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    max-width: 600px;
    text-align: center;
    justify-content: center;
    padding: 40px;

  h3 {
    font-family: ${fontFamilies.inter};
  }
`;

const ButtonConfirm = styled.button`

  font-family: ${fontFamilies.jakarta};
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  background: #89131d;
  font-size: 16px;
  font-weight: 700;
  line-height: 20.16px;
  text-align: center;
  border: 1px solid #89131d;
  cursor: pointer;
  width: 48%;

`;
const ButtonCancel = styled.button`

  font-family: ${fontFamilies.jakarta};
  padding: 10px 20px;
  border-radius: 10px;
  color: #89131d;
  border: 1px solid #89131d;
  background: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 20.16px;
  text-align: center;
  cursor: pointer;
  margin-left: 10px;
  width: 48%;
`;

const ModalConfirm: React.FC<ModalConfirmProps> = ({ title, onConfirm, onCancel }) => {
  return (
    <Overlay>
      <ModalContainer>
        <h3>{title}</h3>
        <ButtonConfirm onClick={onConfirm}>Confirmar</ButtonConfirm>
        <ButtonCancel onClick={onCancel}>Cancelar</ButtonCancel>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalConfirm;
