/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { fontFamilies } from '../styles/GlobalStyles';

const CadastroContainer = styled.div`
  font-family: ${fontFamilies.roboto};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 32px;
  position: relative;
  margin: 0 auto;
  text-align: center;
`;

const Maindiv = styled.div`
    position: relative;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const CadastroForm = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 388px;
  width: 100%;

  h2 {
    width: 100%;
  }

  p {
    font-family: ${fontFamilies.roboto};
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.01em;
    text-align: left;
    padding-bottom: 24px;
    width: 100%;
  }

  label {
    font-family: ${fontFamilies.roboto};
    padding-top: 24px;
    padding-bottom: 8px;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.01em;
    text-align: left;
  }

  input {
    width: 100%;
    top: 24px;
    gap: 0px;
    border-radius: 12px;
    border: 1px solid #d4d7e3;
    background: #f7fbff;
    padding: 16px;
    &::placeholder {
      color: #8897ad;
    }
  }

  button {
    background: #89131d;
    width: 100%;
    padding: 16px;
    gap: 0px;
    border-radius: 12px;
    justify: space-between;
    border: none;
    color: #fff;
    margin-top: 24px;
  }
  .noUsers {
    text-align: center;
    max-width: initial;
    margin-bottom: 136px;

    a {
      text-decoration: none;
      color: #1e4ae9;
    }
  }
`;


const LogoImg = styled.img`
  max-width: 188px;
  display: block;
  width: auto;
  margin: 0 auto;
  bottom: 58px;
  position: relative;
`;

const BackgroundImage = styled.div`
  background-image: url("${process.env.PUBLIC_URL}/assets/image/bg-atos.jpg");
  background-size: cover;
  width: 50%;
  height: 100%;
  border-radius: 12px;
`;

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setErro(data.message);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setErro('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <CadastroContainer>
      <Maindiv>
        <CadastroForm>
          <h2>Cadastre-se</h2>
          <p>Preencha os campos para concluir seu cadastro.</p>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Informe seu nome ..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="seuemail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha ..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label htmlFor="confirmarSenha">Confirme sua senha</label>
          <input
            type="password"
            id="confirmarSenha"
            placeholder="Confirme a senha ..."
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <button onClick={handleSubmit}>Cadastrar</button>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </CadastroForm>
        <LogoImg src={`${process.env.PUBLIC_URL}/assets/image/logo.png`} alt="Logo" />
      </Maindiv>
      <BackgroundImage />
    </CadastroContainer>
  );
};

export default CadastroUsuario;
