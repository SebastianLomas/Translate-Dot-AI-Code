const Result = function({resultProps}) {
    return (
        <section className="result">
            <p className="result__text">
                {resultProps.answer}
            </p>
        </section>
    )
}

export default Result