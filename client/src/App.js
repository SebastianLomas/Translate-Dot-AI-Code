import Header from "./components/Header"
import Form from "./components/Form"
import Result from "./components/Result"

import { useState } from "react"

const App = function() {
    const [response, setResponse] = useState("Waiting for a response...")
    return (
        <div className="App">
            <Header />
            <Form formProps={{setAnswer: setResponse}}/>
            <Result resultProps={{answer: response}}/>   
        </div>
    )
}

export default App