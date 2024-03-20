import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { fontFamilies } from "../styles/GlobalStyles";

const LoginContainer = styled.div`
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

  h2 {
    font-family: ${fontFamilies.poppins};
    font-size: 36px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0.01em;
    padding-top: 40%;
    text-align: left;
    width: 100%;
  }

  p {
    font-family: ${fontFamilies.roboto};
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.01em;
    text-align: left;
    padding-bottom: 48px;
    width: 100%;
  }
  
  label {
    font-family: ${fontFamilies.roboto};
    padding-bottom: 8px;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.01em;
    text-align: left;
  }
`;

const Maindiv = styled.div`
  position: relative;
  margin: 0 auto;
`;
const LoginForm = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 388px;
  width: 100%;
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

const DivisorItem = styled.div`
  margin: 58px auto;
  display: flex;
  align-items: center;
  width: 100%;
  span {
    margin: 0 20px;
  }
  hr {
    width: 100%;
    border: 1px solid #d4d7e3;
    padding: 0px 20px;
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
  background-image: url('${process.env.PUBLIC_URL}/assets/image/bg-atos.jpg');
  background-size: cover;
  width: 50%;
  height: 100%;
  border-radius: 12px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Autenticação bem-sucedida, armazenar token no sessionStorage
        sessionStorage.setItem("accessToken", data.access_token);

        // Redirecionar para a página de dashboard
        navigate("/dashboard");
      } else {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 9000);
      }
    } catch (error) {
      // Erro de rede ou exceção
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <LoginContainer>
      <Maindiv>
        <LoginForm>
          <h2>Olá! 👋🏻</h2>
          <p>Faça login para começar a gerenciar seus produtos.</p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="seuemail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
          {showErrorMessage && (
            <div style={{ color: "red", paddingTop: "16px" }}>
              Senha ou email incorretos
            </div>
          )}
          <DivisorItem>
            <hr />
            <span>Ou</span>
            <hr />
          </DivisorItem>
          <p className="noUsers">
            Não possui conta? <Link to="/cadastro">Cadastre-se!</Link>
          </p>
        </LoginForm>
        <LogoImg src={`${process.env.PUBLIC_URL}/assets/image/logo.png`} alt="Logo" />
      </Maindiv>
      <BackgroundImage />
    </LoginContainer>
  );
};

export default Login;
