import './App.css';
import {useState} from 'react';



const api = {
  key: "f1121bd58f7ec72b484c748a0cf26d84",
  base: "http://api.openweathermap.org/data/2.5/",
}



function App() {

  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Cidade não encontrada!");
        }
        return res.json();
      })
      .then(result => {
        setWeather(result);
        setErrorMessage("")
      })
      .catch(error => {
        console.error(error.message);
        setErrorMessage("Cidade não encontrada!")
      });
}

  return (
    <div className="App">
      <header className="App-header">
        {/*HEADER*/}
        <h1>Weather</h1>

        {/*Search Box*/}
        <div>
          <input 
            type="text" 
            placeholder="Procurar..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Procurar</button>
        </div>

        {typeof weather.main != "undefined" ? (
          <div>

              {/* Location */}
              <p>{weather.name}</p>
              <p>{weather.sys.country}</p>
      
              {/* temerature */}
              <p>{weather.main.temp} </p>
      
              {/* condition */}
              <p>{weather.weather[0].description}</p>
          </div>

        ) : (
          ""
        )}
          

        {errorMessage && <p>{errorMessage}</p>}

      </header>

    </div>

  );
}

export default App;