import DOMPurify from 'dompurify'

const getCompletition = async function(fromLanguage, toLanguage, question, context) {
    const bodyRequest = createRequest(fromLanguage, toLanguage, question, context)
    console.log(bodyRequest)
    if(!bodyRequest.error) {
        const requestProps = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question: bodyRequest.body})
        }
        const response = await fetch('/getResponse',requestProps)
        const data = await response.json()
         
        console.log(data)
        return data
    } else {
        alert(bodyRequest.error)
    }
}

const validateAndSanitize = function(dirty) {
    if(dirty !== "") {
        let clean = DOMPurify.sanitize(dirty)
        return clean
    } else {
        return false
    }
}

const createRequest = function(originLanguage, translationLanguage, dirtyQuestion, dirtyContext) {
    const fromLanguage = originLanguage
    const toLanguage = translationLanguage
    const question = validateAndSanitize(dirtyQuestion)
    const context = validateAndSanitize(dirtyContext)

    if(question && context) {
        return {
            body: `Translate from ${fromLanguage} to ${toLanguage} the following: ${question}. Use the following as the context but don't translate it: ${context}. Give me an explanation of usage.`,
            error: false
        }
    } else if(question && !context) {
        return {
            body: `Translate from ${fromLanguage} to ${toLanguage} the following: ${question}.`,
            error: false
        }
    } else {
        return {
            error: "No question detected"
        }
    }
}

export default getCompletition