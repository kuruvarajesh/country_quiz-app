import { questionsData } from './Constants/Constants';
import './App.css';
import { useEffect, useState } from 'react';
import success from './Constants/success.svg'
import error from './Constants/error.svg'
import congrats from './Constants/congrats.svg'

function App() {
  const [options, setOptions] = useState({})
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [completed, setCompleted] = useState([])
  const [clickedVal, setClickedValue] = useState("")

  useEffect(() => {
    getCountriesData()

  }, [])

  const getCountriesData = async () => {
    const api = await fetch('https://restcountries.com/v3.1/all')
    const apiData = await api.json()

    console.log("Data", apiData)
    const countriesList = []
    const optionsList = {}
    for (let i = 0; i < 10; i++) {
      const num = Math.floor(Math.random() * (249 - 0 + 1) + 0);
      console.log("NUM", num)
      countriesList.push(apiData[num])
      const opt = [apiData[num]?.name?.common]
      for (let j = 1; j < 4; j++) {
        const countriesN = Math.floor(Math.random() * (249 - 0 + 1) + 0);
        opt.push(apiData[countriesN]?.name?.common)
      }
      optionsList[i] = opt



    }
    setCountries(countriesList)
    setOptions(optionsList)
    setAllCountries(apiData)
  }


  const handleQuestion = (value) => {
    console.log(value)
    setActiveQuestion(value - 1)
    // if (!completed.includes(value))
      // setCompleted([...completed, value - 1])
    console.log("Correct Answer")

    setClickedValue("")
  }
  const handleClick = (val) => {
    console.log()
    if (countries[activeQuestion]?.name?.common === val) {
      console.log("Correct Answer")
    }
    setClickedValue(val)
    setCompleted([...completed, activeQuestion])
  }

  const showAllOptions = (opt) => {
    const successIcon = clickedVal && opt === countries[activeQuestion]?.name?.common
    const errorIcon = clickedVal === opt && clickedVal !== countries[activeQuestion]?.name?.common
    const showIcon = successIcon ? success : errorIcon ? error : ""
    return (
      <button style={{ pointerEvents: clickedVal && "none" }} className={(successIcon || errorIcon) ? 'correct opt-btn' : 'opt-btn'} key={opt} onClick={() => handleClick(opt)}>
        {opt}
         {(successIcon || errorIcon) && <img src={showIcon} alt="icon" />}</button>

    )
  }

  const handlePlayAgain = ()=>{
    setCompleted([])
    setActiveQuestion(0)
    setClickedValue("")
  }
  return (
    <div className="App">
      {completed.length<1?
      <div className='q-card'>
        <h1>Country Quiz</h1>
        <div className='btn-container'>
          {questionsData.map((item) => (
            <button key={item} style={{ pointerEvents: completed.includes(item-1) && "none" }} type='button' className={(activeQuestion === item - 1 || completed.includes(item-1)) ? "active-button q-btn" : "q-btn"} onClick={() => handleQuestion(item)}>{item}</button>
          ))}
        </div>
        <div className='q-opt-card'>
          {countries.length > 0 && <h2>Which Country is {countries[activeQuestion]?.capital?.[0]} the Capital?</h2>}
          <div className='opt-card' >
            {options?.[activeQuestion]?.map(opt => (
              showAllOptions(opt)
            ))}
          </div>

        </div>
      </div>:
      <div className={ 'q-card result-card'}>
        <img src={congrats} alt="congrats" className='congrats-img' />
        <h2 className='result-text'>Congrats! You Completed the quiz.</h2>
        <p>You answer 5/10 correctly</p>
        <button type="button" className='correct opt-btn' onClick={handlePlayAgain}>Play again</button>
      </div>
      }
      
      
    </div>
  );
}

export default App;
