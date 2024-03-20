import React, { useEffect, useState } from "react";
import axios from "axios";
import { Produto } from "../types/types";
import ModalConfirm from "./ModalConfirm";
import styled from "styled-components";
import { fontFamilies } from "../styles/GlobalStyles";

const Button = styled.button`
  padding: 4px 8px;
  gap: 44px;
  border-radius: 10px;
  color: #fff;
  font-family: ${fontFamilies.inter};
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  border: none;
  margin: 0 8px;
`;

const EditButton = styled(Button)`
  background: #492de7;
`;

const DeleteButton = styled(Button)`
  background: #e72d2d;
`;

const TableStyle = styled.table`
  max-width: initial;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  color: #666666;
  text-align: left;
  padding: 16px;

  th {
    &:last-child {
      text-align: center;
    }
  }

  td {
    padding: 16px 0;
    border-bottom: 0.5px solid #66666633;
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const TdActions = styled.td`
  display: flex;
  justify-content: center;
`;

const StyledDivDetails = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid #66666633;
  padding-top: 41px;

  p {
    font-family: ${fontFamilies.inter};
    padding: 10px 20px;
    border-radius: 8px;
    background-color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 3px 0px #00000014;

    strong {
      font-family: ${fontFamilies.poppins};
      font-size: 18px;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0em;
      text-align: left;
      margin-right: 5px;
    }
  }
`;

const InputFilter = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 226px;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    color: #666666;
    font-family: ${fontFamilies.inter};
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 32px;
    outline: none;
  }

  span {
    font-family: ${fontFamilies.inter};
    font-size: 10px;
    font-weight: 400;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: right;
    color: #666666;
  }
`;

const ButonsArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

const SpanSort = styled.span`
    content: url("${process.env.PUBLIC_URL}/assets/icons/sort.svg");
    width: 12px;
    height: 12px;
    cursor: pointer;
    margin-left: 16px;
`;
const ButtonSave = styled.button`
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
`;

const FormEdit = styled.form`
  width: auto;
  border-radius: 10px;
  background: #fff;
  padding: 24px 24px 51px 24px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
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

  label {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 16px;
  }

  input {
    border-radius: 10px;
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
    width: calc(100% - 40px);
  }
`;

interface ListaProdutosProps {
  onEditProduct: (produto: Produto) => void;
}

const ListaProdutos: React.FC<ListaProdutosProps> = ({ onEditProduct }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<Produto | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editedProduto, setEditedProduto] = useState<Produto>({
    id: 0,
    dsProduto: "",
    dsCategoria: "",
    dtCadastro: "",
    vlProduto: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    fetchProdutos();
  }, []);

  useEffect(() => {
    const lastUpdatedDate = produtos.reduce((acc, produto) => {
      const dtCadastro = new Date(produto.dtCadastro);
      return dtCadastro > acc ? dtCadastro : acc;
    }, new Date(0));
    setLastUpdate(
      lastUpdatedDate.toLocaleString("pt-BR", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }, [produtos]);

  const fetchProdutos = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get<Produto[]>(
        "http://localhost:8000/products",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Formatar a data no formato desejado
      const formattedProdutos = response.data.map((produto) => ({
        ...produto,
        dtCadastro: formatData(produto.dtCadastro),
      }));

      setProdutos(formattedProdutos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para formatar a data no formato "MMM d, yyyy"
  const formatData = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleEditProduct = (produto: Produto) => {
    setEditingProduto(produto);
    setEditedProduto(produto); // Inicializa o formulário com os dados atuais do produto
    onEditProduct(produto);
  };

  const handleConfirmDelete = async () => {
    if (!produtoToDelete) return;

    try {
      await deleteProduto(produtoToDelete);
      setShowDeleteModal(false);
      fetchProdutos(); // Atualiza a lista de produtos após excluir com sucesso
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      // Trate o erro conforme necessário, como exibindo uma mensagem para o usuário
    }
  };

  const deleteProduto = async (produto: Produto) => {
    const accessToken = sessionStorage.getItem("accessToken");
    await axios.delete(`http://localhost:8000/products/${produto.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const handleCancelDelete = () => {
    // Cancelar a exclusão, fechar o modal
    setShowDeleteModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Atualiza o estado searchTerm diretamente com o valor do input
  };

  const handleSaveChanges = async () => {
    // Verifica se o valor do produto é uma string válida
    const parsedValue = parseFloat(
      editedProduto.vlProduto.toString().replace("R$ ", "")
    );
    if (!isNaN(parsedValue)) {
      setEditedProduto({
        ...editedProduto,
        vlProduto: parsedValue,
      });
    }
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:8000/products/${editedProduto.id}`,
        editedProduto,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Atualiza a lista de produtos após salvar com sucesso
      fetchProdutos();
      setEditingProduto(null);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      // Trate o erro conforme necessário, como exibindo uma mensagem para o usuário
    }
  };

  // Função para classificar os produtos por uma determinada chave
  const sortProducts = (key: keyof Produto) => {
    const sortedProdutos = [...produtos].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setProdutos(sortedProdutos);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Função para filtrar os produtos com base no termo de pesquisa
  const filteredProdutos = produtos.filter(
    (produto) =>
      searchTerm === "" || // Se o termo de pesquisa estiver vazio, retorna true para todos os produtos
      Object.values(produto).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      ) || // Verifica se algum valor do produto corresponde ao termo de pesquisa
      (typeof produto.vlProduto === "number" &&
        produto.vlProduto.toString().includes(searchTerm)) // Verifica se o valor do preço corresponde ao termo de pesquisa
  );

  return (
    <div>
      <StyledDivDetails>
        <h3>Seus Cadastros</h3>
        <p>
          <strong>{filteredProdutos.length}</strong> Total de cadastros
        </p>
      </StyledDivDetails>
      <InputFilter>
        <input
          type="text"
          placeholder="Procurar..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <span>Última atualização: {lastUpdate}</span>
      </InputFilter>
      {editingProduto ? (
        <div>
          <h3>Editar Produto</h3>
          <FormEdit>
            <label>Descrição:</label>
            <input
              type="text"
              name="dsProduto"
              value={editedProduto.dsProduto}
              onChange={(e) =>
                setEditedProduto({
                  ...editedProduto,
                  dsProduto: e.target.value,
                })
              }
            />
            <br />
            <label>Categoria:</label>
            <input
              type="text"
              name="dsCategoria"
              value={editedProduto.dsCategoria}
              onChange={(e) =>
                setEditedProduto({
                  ...editedProduto,
                  dsCategoria: e.target.value,
                })
              }
            />
            <br />
            <label>Data Cadastro:</label>
            <input
              type="text"
              value={formatData(editedProduto.dtCadastro)}
              readOnly
            />
            <br />
            <label>Preço:</label>
            <input
              type="text"
              name="vlProduto"
              value={editedProduto.vlProduto}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setEditedProduto({
                  ...editedProduto,
                  vlProduto: isNaN(value) ? 0 : value,
                });
              }}
            />
            <ButonsArea>
              <ButtonSave type="button" onClick={handleSaveChanges}>
                Salvar
              </ButtonSave>
              <ButtonCancel
                type="button"
                onClick={() => setEditingProduto(null)}
              >
                Cancelar
              </ButtonCancel>
            </ButonsArea>
          </FormEdit>
        </div>
      ) : (
        <div>
          <TableStyle>
            <thead>
              <tr>
                <th onClick={() => sortProducts("dsProduto")}>Descrição <SpanSort></SpanSort></th>
                <th onClick={() => sortProducts("dsCategoria")}>Categoria< SpanSort></SpanSort></th>
                <th onClick={() => sortProducts("dtCadastro")}>Data Cadastro <SpanSort></SpanSort></th>
                <th onClick={() => sortProducts("id")}>Cód. Produto <SpanSort></SpanSort></th>
                <th onClick={() => sortProducts("vlProduto")}>Preço <SpanSort></SpanSort></th>
                <th>Ações <SpanSort></SpanSort></th>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.dsProduto}</td>
                  <td>{produto.dsCategoria}</td>
                  <td>{formatData(produto.dtCadastro)}</td>
                  <td>{produto.id}</td>
                  <td>
                    R${" "}
                    {typeof produto.vlProduto === "number"
                      ? produto.vlProduto
                      : "N/A"}
                  </td>
                  <TdActions>
                    <EditButton onClick={() => handleEditProduct(produto)}>
                      Editar
                    </EditButton>
                    <DeleteButton
                      onClick={() => {
                        setProdutoToDelete(produto);
                        setShowDeleteModal(true);
                      }}
                    >
                      Excluir
                    </DeleteButton>
                  </TdActions>
                </tr>
              ))}
            </tbody>
          </TableStyle>
          {showDeleteModal && (
            <ModalConfirm
              title={`Deseja realmente excluir o produto "${produtoToDelete?.dsProduto}"?`}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListaProdutos;
