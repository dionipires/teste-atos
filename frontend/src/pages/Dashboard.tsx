// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import NavBar from '../modules/NavBar';
import SideBar from '../modules/SideBar';
import ListaProdutos from '../components/ListaProdutos';
import CadastroProduto from '../components/CadastroProduto';
import { Produto } from '../types/types';
import styled from 'styled-components';
import { fontFamilies } from '../styles/GlobalStyles';

const DashboardContainer = styled.div`
  display: flex;
  background-color: #F9F9F9; 
  width: auto;
  padding-top: 118px;
  padding-left: 64px;
  overflow-x: hidden;
`;

const Content = styled.div`
padding: 38px 64px 38px 64px;
margin-left: 250px;
width: calc(90vw - 267px);
display: flex;
flex-flow: row wrap;
    p {
      font-family: ${fontFamilies.inter};
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0px;
      text-align: left;
      color: #898989;
      margin-bottom: 33px;
    }
  }
`;
const DivCabecalho = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TableContent = styled.div`
  width: 100%;
`;

const NewProductButton = styled.button`
  background: #89131d;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: #6e0f17;
  }
`;

const Dashboard: React.FC = () => {
  const [showCadastro, setShowCadastro] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string>('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        const data: { nome: string } = await response.json();
        setUserName(data.nome);
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };
    fetchUserName();
  }, []);

  const handleShowCadastro = () => {
    setShowCadastro(true);
  };

  const handleSidebarItemClick = (item: string) => {
    setActiveItem(item);
    if (item === 'Produtos') {
      // Lógica adicional para carregar os dados do dashboard, se necessário
    }
  };

  return (
    <DashboardContainer>
      <SideBar activeItem={activeItem} onSidebarItemClick={handleSidebarItemClick} />
      <NavBar />
      <Content>
        <DivCabecalho>
          <div>
            <h2>Olá, {userName ? `${userName}` : 'usuário'}!</h2>
            <p>Seja bem-vindo!</p>
          </div>
          <NewProductButton onClick={handleShowCadastro}>+ Novo Produto</NewProductButton>
        </DivCabecalho>
        <TableContent>
          {showCadastro ? (
            <CadastroProduto onSaveProduct={() => setShowCadastro(false)} />
          ) : (
            <ListaProdutos onEditProduct={(produto: Produto) => console.log(produto)} />
          )}

        </TableContent>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
