import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Dashboard from './pages/Dashboard';
import ContentLoader from './components/ContentLoader';
import ModalConfirm from './components/ModalConfirm';

const App: React.FC = () => {
  const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [produtoToDelete, setProdutoToDelete] = useState<any>(null); // Defina o estado para o produto a ser excluído

  const handleSidebarItemClick = (item: string) => {
    if (item === 'Produtos') {
      setIsLoadingDashboard(true);
      // Lógica adicional para carregar os dados do dashboard, se necessário
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    // Lógica para confirmar a exclusão do produto
    setShowModal(false); // Fecha o modal após a confirmação
  };

  const handleCancelDelete = () => {
    // Lógica para cancelar a exclusão do produto
    setShowModal(false); // Fecha o modal após o cancelamento
  };

  return (
    <Router>
      <Routes>
        <Route path="/teste-atos" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route
          path="/dashboard"
          element={
            <ContentLoader isLoading={isLoadingDashboard}>
              <Dashboard />
            </ContentLoader>
          }
        />
      </Routes>
      {showModal && (
        <ModalConfirm
          title={`Deseja realmente excluir o produto "${produtoToDelete?.dsProduto}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </Router>
  );
};

export default App;
