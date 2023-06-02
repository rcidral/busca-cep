import { useState } from "react";
import "./App.css";
import app from "./services/app";
import CepProps from "./interfaces/cep";

function App() {
  const [input, setInput] = useState<string>("");
  const [cep, setCep] = useState<CepProps | object>({});

  function BuscaCep(input: string) {
    app
      .get(`${input}/json`)
      .then((response) => {
        setCep(response.data);
        document.querySelector(".error")?.classList.remove("active");
      })
      .catch(() => {
        setCep({});
        document.querySelector(".error")?.classList.add("active");
      });
  }
  return (
    <>
      <main>
        <div className="container">
          <div className="search">
            <div className="title">Busca CEP<span>By: Ricardo Cidral Machado</span></div>
            <div className="input">
              <input
                type="text"
                placeholder="Digite o CEP"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="button" onClick={() => BuscaCep(input)}>
                Buscar
              </button>
            </div>
            <div className="error">CEP inválido</div>
          </div>
          {Object.keys(cep).length > 0 && (
            <div className="result">
              <div className="cep">
                CEP: <span>{(cep as CepProps).cep}</span>
              </div>
              <div className="city">
                Cidade: <span>{(cep as CepProps).logradouro}</span>
              </div>
              <div className="state">
                Estado: <span>{(cep as CepProps).uf}</span>
              </div>
              <div className="neighborhood">
                Bairro: <span>{(cep as CepProps).bairro}</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
