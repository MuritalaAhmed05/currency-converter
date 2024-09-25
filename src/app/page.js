"use client";
import React, { useState, useEffect } from "react"; // Single import statement for React and hooks
import DateFormat from "./Date";
import { MdSwapVerticalCircle, MdSwapHorizontalCircle} from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";


export default function ConvertCurrency() {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [defaultValue, setDefaultValue] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("NGN");
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState("");




  
  useEffect(() => {
    const getCurrency = async () => {
      try {
        const ACCESS_KEY = "afca0f3dbfc1df97e5abb055c4393cef";
        const url = `https://data.fixer.io/api/latest?access_key=${ACCESS_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
          if (data.success) {
          setRates(data.rates);
        } else {
          setError(data.error.code);
        }
      } catch (err) {
        setError("Check your internet connection");
      }
    };

    getCurrency();
  }, []);



  const handleCoverter = () => {
    if (!rates || !rates[baseCurrency] || !rates[targetCurrency]) {
      setError("Invalid currencies or rates not available");
      return;
    }
    const conversionRate = rates[targetCurrency] / rates[baseCurrency];
    const convertedAmount = amount * conversionRate;
    setResult(convertedAmount.toFixed(2));
  };


  useEffect(() => {
    if (amount !== "" && rates) {
      handleCoverter(); 
    } else if (amount === ""){
      setResult("")
    }
  }, [amount, baseCurrency, targetCurrency, rates]);

// if(amount === ""){
//   setResult("")
//   return;
// }


  if (error) {
    return <div> {error}</div>;
  }

  if (!rates) {
    return <div className=" flex justify-center items-center min-h-screen">
     <ImSpinner3 className="animate-spin text-blue-900 h-10 w-10"/>
    </div>;
  }
        

  const conversion =
    (defaultValue / rates[baseCurrency]) * rates[targetCurrency];

    const filteredCurrencies = Object.keys(rates).filter((currency) =>
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filtereCurrencies = Object.keys(rates).filter((currency) =>
      currency.toLowerCase().includes(searchTerms.toLowerCase())
    );
    
  return (
    <div className="px-8 py-9 flex flex-col items-center  min-h-screen justify-center">
      <h1 className="text-blue-900 font-bold text-[2rem] sm:text-[2.25rem] text-center ">
        Currency Converter
      </h1>
      <p className="text-center font-sans font-medium">
        Check live rate here!!
      </p>
      <div className=" w-full max-w-xs mx-auto bg-white mt-[4rem] min-w-5 shadow-elevated rounded-[20px] p-7">
        
        
        <p className="text-xs font-medium text-gray-600">Amount</p>
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Search Currency:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a currency"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
      
        </div>
        <div className="flex gap-9">
          <div>
            <label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="p-2 bg-transparent text-blue-900 font-bold outline-none"
              >
                 {filteredCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="">
            <label>
              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                // handleCoverter();
              }
                className="p-2 rounded-lg border-none bg-[#DBDBDB] outline-none w-full"
              />
            </label>
          </div>
        </div>

        <div className="relative flex flex-col items-center my-9">
          <hr className="border-[#DBDBDB] border-[1px] w-full" />
          <MdSwapVerticalCircle className="w-9 h-9 text-blue-900 absolute top-1/2 -translate-y-1/2 bg-white z-10" />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-600 mb-3">
            Converted Amount
          </p>
          <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Search Currency:
        </label>
        <input
          type="text"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)
            
          }
          placeholder="Search for a currency"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
      
        </div>
          <div className="flex gap-9">
            <div>
              <label>
                <select
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value)}
                  className="p-2 bg-transparent text-blue-900 font-bold outline-none"
                >
                 {filtereCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="">
              <label>
                <input
                  type="number"
                  readOnly
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className="p-2 rounded-lg border-none bg-[#DBDBDB] outline-none w-full"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center my-3 mb-8">
        {/* <button
          onClick={handleCoverter}
          className="p-2 px-9 mt-4 bg-blue-500 text-white self-center rounded"
        >
          Convert
        </button> */}
      </div>

      {result !== null && (
        <div className="bg-gray-100 rounded-[10px] p-4 shadow-button max-w-[400px]">
          <p className="text-blue-900 font-bold text-[1.25rem]" >Convertion Rate</p>
          <p className="text-[15px] font-normal text-center text-blue-700 ">
            As at : <DateFormat />
          </p>
          <div className="flex justify-center items-center gap-4 font-bold text-blue-900 text-[20px]">
            <p>
              {defaultValue} {baseCurrency}
            </p>{" "}
            <MdSwapHorizontalCircle className="text-blue-900 inline" />{" "}
            <p>
              {conversion.toFixed(2)} {targetCurrency}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
