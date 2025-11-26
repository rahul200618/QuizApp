/* eslint-disable react/prop-types */
function Question({ data, onAnswer, selected }) {
  return (
    <div>
      <h2>{data.question}</h2>

      <div className="options">
        {data.options.map((opt, i) => (
          <button
            key={i}
            className={
              selected
                ? opt === data.answer
                  ? "correct"
                  : opt === selected
                  ? "wrong"
                  : ""
                : ""
            }
            onClick={() => !selected && onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
