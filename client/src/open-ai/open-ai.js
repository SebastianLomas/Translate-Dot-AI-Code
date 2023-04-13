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

const getBodyRequest = function(toLanguage, userQuestion, userContext = "") {
    switch(toLanguage) {
        case "english":
            return `Translate "${userQuestion}" into "${toLanguage}". I took it from the following context: "${userContext}".`
        
        case "spanish":
            return `Traducir "${userQuestion}" al "${toLanguage}". Lo tome del siguiente contexto: "${userContext}"`
    }
}

const createRequest = function(originLanguage, translationLanguage, dirtyQuestion, dirtyContext) {
    const fromLanguage = originLanguage
    const toLanguage = translationLanguage
    const question = validateAndSanitize(dirtyQuestion)
    const context = validateAndSanitize(dirtyContext)

    if(question && context) {
        return {
            body: getBodyRequest(toLanguage, question, context),
            //body: `Translate from ${fromLanguage} to ${toLanguage}: "${question}". Use this context to give a better translation but do not translate it at least it says so: "${context}".`,
            error: false
        }
    } else if(question && !context) {
        return {
            body: getBodyRequest(toLanguage, question),
            error: false
        }
    } else {
        return {
            error: "No question detected"
        }
    }
}

export default getCompletition