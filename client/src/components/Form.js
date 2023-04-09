const Form = function() {
    return (
        <article className="form">
            <section className="form__options">
                <span>from: </span>
                <select className="form__options_input" id="options">
                    <option value="english">english</option>
                    <option value="spanish">spanish</option>
                </select>
                <span>to: </span>
                <select className="form__options_input">
                    <option value="spanish">spanish</option>
                    <option value="english">english</option>
                </select>
            </section>
            <section className="form__translate">
                <input className="form__translate_input" type="text" />
            </section>
            <section className="form__context">
                <textarea className="form__context_input"></textarea>
            </section>
            <section className="form__button">
                <input className="form__button_input" type="button" value="Translate" />
            </section>
        </article>
    )
}

export default Form