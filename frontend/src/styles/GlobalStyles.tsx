import { createGlobalStyle } from 'styled-components';

// Definição das variáveis de fonte
const fontFamilies = {
  poppins: "'Poppins', sans-serif",
  inter: "'Inter', sans-serif",
  roboto: "'Roboto', sans-serif",
  jakarta: "'Plus Jakarta', sans-serif",
};

const GlobalStyles = createGlobalStyle`
  /* Reset de estilos para garantir consistência entre os navegadores */
  body, h1, h2, p, ul, li {
    margin: 0;
    padding: 0;
  }

  body root {
    display: flex;
  }

  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap')

  /* Adicionando o link do FontAwesome */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

  /* Aplicando a fonte Poppins como padrão */

  body {
    font-family: ${fontFamilies.inter};
    background: #f9f9f9;
  }


  #root {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: space-between;
  }

  h2 {
    font-family: ${fontFamilies.poppins};
    font-size: 36px;
    font-weight: 600;
    line-height: 46px;
    letter-spacing: 0px;
    text-align: left;
    color: #202020;
  }
  h3 {
    font-family: ${fontFamilies.poppins};
    font-size: 24px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
  }

  /* Adicione mais estilos globais conforme necessário */

  /* Exemplo de estilo para remover a seleção de texto */
  user-select: none;
`;

export {GlobalStyles, fontFamilies };
