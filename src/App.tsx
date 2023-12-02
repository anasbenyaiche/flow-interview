import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

interface ISymbol {
  baseAsset: string;
  quoteAsset: string;
  symbol: string;
}

interface IExchangeInfo {
  symbols: ISymbol[];
}

interface IOption {
  label: string;
  value: string
}

function App() {
  const [currency, setCurrency] = useState<IExchangeInfo>({ symbols: [] });
  const [options, setOptions] = useState<IOption[]>()
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [marketData, setMarketData] = useState()



  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading((state) => !state)
        const response = await axios.get<IExchangeInfo>(
          'https://api1.binance.com/api/v3/exchangeInfo'
        );
        setCurrency(response.data);
        setOptions(response.data.symbols
          .map(({ symbol, baseAsset, quoteAsset }) => ({ label: `${baseAsset}/${quoteAsset}`, value: symbol })))
        setIsLoading((state) => !state)
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading((state) => !state)
      }
    };

    fetchData();
  }, []);

  const fetchMarketData = async (selectedPair) => {
    try {
      const response = await axios.get(`https://api1.binance.com/api/v3/ticker/24hr?symbol=${selectedPair}`);
      if (response.data !== null) {
        setMarketData(response.data);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }


  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    fetchMarketData(selectedOption.value)
  }

  console.log(marketData)
  return (
    <div className="App">
      <h1>Market Data exchange</h1>
      <div style={{ margin: "50px", width: "100%", display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: "50%" }}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            value={selectedOption}
            isLoading={isLoading}
            isClearable={true}
            isSearchable={true}
            name="color"
            options={options}
            onChange={handleChange}
          />
          <div
            style={{
              color: 'hsl(0, 0%, 40%)',
              display: 'inline-block',
              fontSize: 12,
              fontStyle: 'italic',
              marginTop: '1em',
            }}
          >

          </div>
        </div>
      </div>

      {currency.symbols.map((currency) => (
        <div key={currency.symbol}>
          {currency.baseAsset}/{currency.quoteAsset}
        </div>
      ))}

    </div>
  );
}

export default App;