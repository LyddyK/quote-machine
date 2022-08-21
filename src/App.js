import './App.scss';
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import COLORS_ARRAY from './colorsArray';


let quotesDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Life is what we make it, always has been, always will be.")
  const [author, setAuthor] = useState("Grandma Moses")
  const [quotesArray, setQuotesArray] = useState(null)
  const [detailColor, setDetailColor] = useState('#F0E6FC')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  
  useEffect (() => {
    fetchQuotes(quotesDB)
  }, [quotesDB]);

  const makeRandomQuote = () => {
    let randomInteger = (Math.floor(quotesArray.length * Math.random()))
    let randomColor = (Math.floor(COLORS_ARRAY.length * Math.random()))
    setDetailColor(COLORS_ARRAY[randomColor])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }
  


  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: detailColor, color: detailColor}}>
        <div id="quote-box">
        <div id="quote-info">
        <p id="text">
        "{quote}"
        </p>
        <p id="author"> - {author}</p>
        </div>
       <div className="buttons">
        <a id="tweet-quote"  className="accents" href={encodeURI('http://www.twitter.com/intent/tweet?text=${quote} - ${author}')}><FontAwesomeIcon icon={faTwitterSquare}/></a>
        <button id="new-quote" className="accents" style={{backgroundColor: detailColor}} onClick={()=>makeRandomQuote()}>New Quote</button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;

