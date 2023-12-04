import React, { useCallback, useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { IOption } from "../types/allTypes";
import { useNavigate } from "react-router-dom";
import { Header, OptionsContainer, SelectWrapper } from "./SelectPair.styles";

const SelectPair = () => {
  const [options, setOptions] = useState<IOption[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>();

  const navigate = useNavigate();

  const handleChange = useCallback(
    (selectedOption) => {
      setSelectedOption(selectedOption);
      if (selectedOption) {
        const currencyPair = selectedOption.value;
        navigate(`/${currencyPair}`);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading((state) => !state);
        const response = await axios.get(
          "https://api1.binance.com/api/v3/exchangeInfo"
        );
        const fetchedOption = response.data.symbols.map(
          ({ symbol, baseAsset, quoteAsset }) => ({
            label: `${baseAsset}/${quoteAsset}`,
            value: symbol,
          })
        );
        setOptions(fetchedOption);
        setIsLoading((state) => !state);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading((state) => !state);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header>Market Data Exchange</Header>
      <SelectWrapper>
        <OptionsContainer>
          <h3>Please select currency to display data tricker </h3>
          <Select
            className="basic-single"
            classNamePrefix="select"
            value={selectedOption || ""}
            isLoading={isLoading}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,

              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "white" : "black",
              }),
            }}
            isClearable={true}
            isSearchable={true}
            name="color"
            options={options}
            onChange={handleChange}
          />
        </OptionsContainer>
      </SelectWrapper>
    </div>
  );
};

export default SelectPair;
