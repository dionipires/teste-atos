![Logo da Empresa](/frontend/public/assets/image/logo.png)


# Sistema de Gerenciamento de Produtos Atos Capital

Este é um sistema web para gerenciamento de produtos, onde os usuários podem fazer login, cadastrar novos usuários, visualizar um dashboard com informações sobre os produtos cadastrados e realizar operações como adicionar, editar e excluir produtos.

## Funcionalidades

- Login de usuário
- Cadastro de novos usuários
- Dashboard com informações sobre os produtos cadastrados
- Adição de novos produtos
- Edição de produtos existentes
- Exclusão de produtos

## Tecnologias Utilizadas Backend
- Nodejs

## Tecnologias Utilizadas Frontend
- React.js
- React Router
- Axios
- Styled Components
- TypeScript

## Instalação backend-end

Para rodar o projeto corretamente e realizar as autenticações é necessário instalar o server de autenticação:
 1. Abra outro terminal e acesse:

    ```
    cd teste-atos/backend
    ```
 2. Instale o server de autenticação:

    ```
    npm install
    ```
 3. Para o uso no dia-a-dia, Execute o servidor de autenticação:

    ```
    npm run start-auth
    ```

 Consulte a documentação README em `/backend` para instruções sobre como executar a aplicação backend.

 Documentação API com Json Server: https://github.com/jeremyben/json-server-auth

## Instalação Front-end

1. Clone o repositório:
```
git clone https://github.com/dionipires/teste-atos/
```

2. Instale as dependências:
```
cd teste-atos/frontend
npm install
```

3. Inicie o servidor de desenvolvimento:
```
npm start
```

## Como Usar

1. Acesse o sistema através do navegador web usando a url http://localhost:3000/
2. Faça login com suas credenciais ou cadastre um novo usuário.
3. Após fazer login, você será redirecionado para o dashboard, onde pode visualizar informações sobre os produtos cadastrados.
4. Utilize as opções de navegação para adicionar, editar ou excluir produtos conforme necessário.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues relatando problemas ou sugestões de melhorias.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
