// NavBar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fontFamilies } from '../styles/GlobalStyles';

const StyledNavBar = styled.nav`
  width: calc(100vw - 250px);
  background-color: #fff;
  padding: 24px 64px 24px 88px; 
  height: auto;
  position: fixed;
  top: 0;
  right: 0;
  border-bottom: 1px solid #eaeaea;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 5px 10px 5px 50px;
  margin-left: 207px;
  outline: none;
  background-color: #f9f9f9;
  &::placeholder {
    padding-left: 0;
  }
`;
const SearchIcon = styled.div`
  position: absolute; 
  top: 50%; 
  right: calc(100% - 247px);
  transform: translateY(-50%);
  width: 20px; 
  height: 20px; 
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBpZD0iaWNfc2VhcmNoIj48cGF0aCBpZD0iU2hhcGUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuMjkxNiAxMi4wNTY2SDEyLjY0MTJMMTIuNDEwNiAxMS44MzQzQzEzLjIxNzUgMTAuODk1NyAxMy43MDMzIDkuNjc3MTkgMTMuNzAzMyA4LjM1MTYzQzEzLjcwMzMgNS4zOTU4OCAxMS4zMDc0IDMgOC4zNTE2MyAzQzUuMzk1ODggMyAzIDUuMzk1ODggMyA4LjM1MTYzQzMgMTEuMzA3NCA1LjM5NTg4IDEzLjcwMzMgOC4zNTE2MyAxMy43MDMzQzkuNjc3MTkgMTMuNzAzMyAxMC44OTU3IDEzLjIxNzUgMTEuODM0MyAxMi40MTA2TDEyLjA1NjYgMTIuNjQxMlYxMy4yOTE2TDE2LjE3MzIgMTcuNEwxNy40IDE2LjE3MzJMMTMuMjkxNiAxMi4wNTY2Wk04LjM1MTYzIDEyLjA1NjZDNi4zMDE1NCAxMi4wNTY2IDQuNjQ2NjYgMTAuNDAxNyA0LjY0NjY2IDguMzUxNjNDNC42NDY2NiA2LjMwMTU0IDYuMzAxNTQgNC42NDY2NiA4LjM1MTYzIDQuNjQ2NjZDMTAuNDAxNyA0LjY0NjY2IDEyLjA1NjYgNi4zMDE1NCAxMi4wNTY2IDguMzUxNjNDMTIuMDU2NiAxMC40MDE3IDEwLjQwMTcgMTIuMDU2NiA4LjM1MTYzIDEyLjA1NjZaIiBmaWxsPSIjODk4OTg5Ii8+PC9nPjwvc3ZnPg==');
  background-size: contain;
  background-repeat: no-repeat; 
  background-position: center; 
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: ${fontFamilies.poppins};
  font-size: 14px;
  color: #333;
`;

const MainUsers = styled.div`
    display: flex;
    align-items: center;
    width: 15%;
    justify-content: space-between;
    padding-left: 25%;

    svg {
      cursor: pointer;
    }
`;

const NavBar: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/user', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        if (response.ok) {
          const data: { nome: string } = await response.json();
          setUserName(data.nome);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
        setUserName(null);
      }
    };
    fetchUserName();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <StyledNavBar>
      <SearchContainer>
        <SearchInput type="text" placeholder="Procurar ..." />
        <SearchIcon />
        <MainUsers>
          <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ic_help">
              <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M14.5996 3.19995C7.97561 3.19995 2.59961 8.57595 2.59961 15.2C2.59961 21.824 7.97561 27.2 14.5996 27.2C21.2236 27.2 26.5996 21.824 26.5996 15.2C26.5996 8.57595 21.2236 3.19995 14.5996 3.19995ZM15.7995 23.6H13.3995V21.2H15.7995V23.6ZM18.2835 14.3L17.2035 15.404C16.3395 16.28 15.7995 17 15.7995 18.8H13.3995V18.2C13.3995 16.88 13.9395 15.68 14.8035 14.804L16.2915 13.292C16.7355 12.86 16.9995 12.26 16.9995 11.6C16.9995 10.28 15.9195 9.2 14.5995 9.2C13.2795 9.2 12.1995 10.28 12.1995 11.6H9.79951C9.79951 8.948 11.9475 6.8 14.5995 6.8C17.2515 6.8 19.3995 8.948 19.3995 11.6C19.3995 12.656 18.9675 13.616 18.2835 14.3Z" fill="#898989" />
            </g>
          </svg>
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Icon">
              <g id="Notification">
                <g id="ic_notifications">
                  <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M15.2 28.2C16.52 28.2 17.6 27.12 17.6 25.8H12.8C12.8 27.12 13.88 28.2 15.2 28.2ZM23 21V14.4C23 10.716 20.444 7.63195 17 6.81595V5.99995C17 5.00395 16.196 4.19995 15.2 4.19995C14.204 4.19995 13.4 5.00395 13.4 5.99995V6.81595C9.956 7.63195 7.4 10.716 7.4 14.4V21L5 23.4V24.6H25.4V23.4L23 21Z" fill="#898989" />
                </g>
              </g>
              <circle id="Shape_2" cx="24.2004" cy="6.59993" r="4.8" fill="#F9837C" stroke="white" strokeWidth="2" />
            </g>
          </svg>
          <Avatar src={`${process.env.PUBLIC_URL}/assets/image/avatar.png`} alt={userName ? userName : 'Usuário'} />
          <UserName>{userName ? userName : 'Usuário'}</UserName>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </MainUsers>
      </SearchContainer>
    </StyledNavBar>
  );
};

export default NavBar;
