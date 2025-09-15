export default function NumberSelector({
  value,
  onChange,
  min = 1,
  "data-testid": testId,
}) {
  const handleInputChange = (e) => {
    const raw = e.target.value;
    const parsed = parseInt(raw, 10);

    if (isNaN(parsed) || parsed < min) {
      onChange(min);
    } else {
      onChange(parsed);
    }
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        data-testid={`decrement-${testId}`}
        className="w-10 h-10 flex items-center justify-center bg-stone-200 rounded-full hover:bg-stone-300 transition disabled:opacity-50 disabled:cursor-not-allowed text-xl"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={handleInputChange}
        data-testid={`input-${testId}`}
        className="w-16 text-center border border-stone-300 rounded-md py-1"
      />
      <button
        onClick={handleIncrement}
        data-testid={`increment-${testId}`}
        className="w-10 h-10 flex items-center justify-center bg-stone-200 rounded-full hover:bg-stone-300 transition text-xl"
      >
        +
      </button>
    </div>
  );
}
