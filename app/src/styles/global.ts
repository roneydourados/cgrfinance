import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #EAEAEA;
    --red: #EF6363;
    --green: #37D851;
    --blue: #8257E5;

    --blue-light: #66B4E0;

    --text-title: #ffff;
    --text-color: #ffff;
    --white-background: #ffff;
    --shape: #ffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 /*  tamanho da fonte */
  html {
    @media(max-width: 1080px){
      font-size: 93.75%; /** 15px */
    }

    @media(max-width: 720px){
      font-size: 87.5%; /** 14px */
    }
  }

  body {
    background: var(--background);
    --webkit-font-smoothing: antialiased;

  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: #6f6f6f;

  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  //estilização global dos modais
  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content {
    background: var(--background);
    height: 45rem;
    width: 100%;
    max-width: 87rem;
    padding: 2rem;
    border-radius: 5px;
  }

  .react-modal-content-del {
    background: var(--white-background);
    height: 20rem;
    width: 45rem;
    max-width: 70rem;
    border-radius: 5px;
  }

  .react-modal-content-small {
    background: var(--background);
    height: 20rem;
    width: 35rem;
    max-width: 87rem;
    padding: 2rem;
    border-radius: 5px;
  }

  .react-modal-content-medium {
    background: var(--background);
    height: 40rem;
    width: 100%;
    max-width: 70rem;
    padding: 2rem;
    border-radius: 5px;
  }
`;
