export interface Produto {
    id: number;
    dsProduto: string,
    dsCategoria: string,
    dtCadastro: string,
    vlProduto: number,
  }
  
  export interface EdicaoProdutoProps {
    id: number;
    onCancelEdit: () => void;
  }

  export interface User {
    id  : number,
    nome: string,
    email : string,
    password  : string
  }
  