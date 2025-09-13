export default function NumberSelector({ value, onChange, min = 1 }) {
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
        className="w-10 h-10 flex items-center justify-center bg-stone-200 rounded-full hover:bg-stone-300 transition disabled:opacity-50 disabled:cursor-not-allowed text-xl"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-16 text-center border border-stone-300 rounded-md py-1"
      />
      <button
        onClick={handleIncrement}
        className="w-10 h-10 flex items-center justify-center bg-stone-200 rounded-full hover:bg-stone-300 transition text-xl"
      >
        +
      </button>
    </div>
  );
}
