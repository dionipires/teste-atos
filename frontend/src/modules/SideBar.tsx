// Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { fontFamilies } from '../styles/GlobalStyles';

const StyledSidebar = styled.aside`
  width: 250px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #eaeaea;
  padding: 20px;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  max-width: 80%;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #000;
  font-size: 16px;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &.active {
    background-color: #f0f0f0;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuIcon = styled.svg`
  width: 20px;
  height: 19px;
  margin-right: 10px;
`;

interface SideBarProps {
  activeItem: string;
  onSidebarItemClick: (item: string) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ activeItem, onSidebarItemClick }) => {
  return (
    <StyledSidebar>
      <Logo>
        <LogoImage src={`${process.env.PUBLIC_URL}/assets/image/logo.png`} alt="Logo" />
      </Logo>
      <Menu>
        <NavLinkStyled
          to="/dashboard"
          className={activeItem === 'Produtos' ? 'active' : ''}
          onClick={() => onSidebarItemClick('Produtos')}
        >
          <MenuItem>
            <MenuIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19">
              <path
                id="Shape"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 4H14V2L12 0H8L6 2V4H2C0.89 4 0.01 4.89 0.01 6L0 17C0 18.11 0.89 19 2 19H18C19.11 19 20 18.11 20 17V6C20 4.89 19.11 4 18 4ZM8 2H12V4H8V2ZM8.5 15.5L5 12L6.41 10.59L8.5 12.68L13.68 7.5L15.09 8.91L8.5 15.5Z"
                fill="#89131D"
              />
            </MenuIcon>
            <span>Produtos</span>
          </MenuItem>
        </NavLinkStyled>
      </Menu>
    </StyledSidebar>
  );
};

export default Sidebar;
