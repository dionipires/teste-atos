import React, { useState } from "react";
import axios from "axios";
import { Produto } from "../types/types";
import styled from "styled-components";
import { fontFamilies } from "../styles/GlobalStyles";

const MainForm = styled.div`
    max-width: 929px;
    width: 100%;
    display: block;
    margin: 0;
`;
const FromCadastro = styled.form`
    width: 100%;
    max-width: 936px;
    border-radius: 10px;
    background: #fff;
    padding: 24px 24px 51px 24px;
    display: flex;
    flex-flow: row wrap;
    align-items: end;
    justify-content: space-around;
    height: auto;
    margin-bottom: 58px;

  h3 {
    width: 100%;
    line-height: initial;
    margin-block: initial;
  }

  p {
    width: 100%;
    margin-bottom: 24px;
    color: #90a3bf;
  }

  label{
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 16px;    
  }

  input {
    width: 100%;
    top: 36px;
    gap: 0px;
    border-radius: 10px;
    opacity: 0px;
    outline: none;
    border: none;
    background: #f6f7f9;
    color: #90a3bf;
    padding: 18px 0 18px 24px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 16px;
  }
`;
const ColumOne = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
  `;
  const ColumTwo = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;
  const ConfirmationDiv = styled.div`
  width: 100%;
  display: flex;
  max-width: 929px;
  max-height: 104px;
  height: auto;
  border-radius: 10px;
  background: #fff;
  padding: 24px;
  justify-content: space-between;
  align-items: center;

  p, h3 {
    margin-bottom: 0px;
    padding: 0px;
    margin-block: auto;
  }

  button {
    font-family: ${fontFamilies.jakarta};
    padding: 0px 20px;
    border-radius: 10px;
    color: #fff;
    background: #89131d;
    font-size: 16px;
    font-weight: 700;
    line-height: 20.16px;
    text-align: center;
    border: 0;
    padding: 16px 24px;
    cursor: pointer;
  }
`;

interface CadastroProdutoProps {
  onSaveProduct: () => void;
}

const CadastroProduto: React.FC<CadastroProdutoProps> = ({ onSaveProduct }) => {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataCadastro, setDataCadastro] = useState(new Date());

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const newProduto: Produto = {
        id: 0, // O ID será atribuído pelo servidor, então podemos definir como 0 por enquanto
        dsProduto: descricao,
        dsCategoria: categoria,
        dtCadastro: dataCadastro.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
        vlProduto: parseFloat(valor),
      };

      // Simule a criação de um novo produto no servidor
      // Aqui você deve fazer a chamada para o endpoint de criação no seu servidor
      await axios.post("http://localhost:8000/products", newProduto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Limpar os campos após o cadastro bem-sucedido
      setDescricao("");
      setCategoria("");
      setValor("");
      setQuantidade("");

      // Chamar a função de sucesso passada como prop
      onSaveProduct();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      // Tratar o erro conforme necessário
    }
  };

  return (
    <MainForm>
      <h3>Cadastrar Produto</h3>
      <FromCadastro onSubmit={handleSubmit}>
        <ColumOne>
          <h3>Informações sobre o produto</h3>
          <p>
            Favor inserir as informações relativas ao produto que deseja
            cadastrar.
          </p>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            placeholder="Descrição do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <label htmlFor="id">Código</label>
          <input
            type="text"
            id="id"
            value="ID gerado automaticamente"
            placeholder="Código do produto"
            disabled
          />
          <label htmlFor="numQuantidade">Quantidade</label>
          <input
            type="text"
            id="quantidade"
            placeholder="Quantidade do produto"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </ColumOne>
        <ColumTwo>
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            id="categoria"
            placeholder="Categoria do produto"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          <label htmlFor="valor">Valor</label>
          <input
            type="text"
            id="valor"
            placeholder="Valor do Produto"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
          <label htmlFor="dataCadastro">Data de Cadastro</label>
          <input
            type="text"
            id="dataCadastro"
            value={dataCadastro.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
            disabled
          />
        </ColumTwo>
      </FromCadastro>
      <ConfirmationDiv>
        <div>
          <h3>Confirmação</h3>
          <p>Confira os dados informados antes de cadastrar o produto</p>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Cadastrar
        </button>
      </ConfirmationDiv>
    </MainForm>

  );
};

export default CadastroProduto;
