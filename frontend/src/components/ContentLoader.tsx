import React from 'react';
import styled from 'styled-components';

// Estilizando o componente de carregamento de conteúdo
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


// Definir a prop children no tipo ContentLoaderProps
interface ContentLoaderProps {
    isLoading: boolean;
    children: React.ReactNode;
  }
  
  const ContentLoader: React.FC<ContentLoaderProps> = ({ isLoading, children }) => {
    return (
      <>
        {isLoading ? (
          // Renderizar o conteúdo de carregamento
          <div>Loading...</div>
        ) : (
          // Renderizar o conteúdo principal
          <div>{children}</div>
        )}
      </>
    );
  };
  

export default ContentLoader;
