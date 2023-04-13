import getCompletition from "../open-ai/open-ai.js"

const Form = function({formProps}) {
    const sendRequest = async function() {
        const nativeLanguage = document.getElementById('optionsNative').value
        const foreignLanguage = document.getElementById('optionsForeign').value
        const dirtyQuestion = document.getElementById('question').value
        const dirtyContext = document.getElementById('context').value

        const completition = await getCompletition(nativeLanguage, foreignLanguage, dirtyQuestion, dirtyContext)
        formProps.setAnswer(await completition.message.content)
    }

    return (
        <article className="form">
            <section className="form__options">
                <span>from: </span>
                <select className="form__options_input" id="optionsNative">
                    <option value="english">english</option>
                    <option value="spanish">spanish</option>
                </select>
                <span>to: </span>
                <select className="form__options_input" id="optionsForeign">
                    <option value="spanish">spanish</option>
                    <option value="english">english</option>
                </select>
            </section>
            <section className="form__translate">
                <input className="form__translate_input" type="text" id="question" />
            </section>
            <section className="form__context">
                <textarea className="form__context_input" id="context"></textarea>
            </section>
            <section className="form__button">
                <input className="form__button_input" type="button" value="Translate"
                onClick={
                    sendRequest
                }/>
            </section>
        </article>
    )
}

export default Form