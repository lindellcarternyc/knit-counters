import { useEffect, useState } from "react";

const KEY = "KNIT_COUNTERS";

const getStoredCounters = (): number[] => {
  try {
    const storedCounters = localStorage.getItem(KEY);
    if (storedCounters) {
      const nums = JSON.parse(storedCounters);
      if (Array.isArray(nums) && nums.every((n) => !isNaN(parseInt(n)))) {
        return nums;
      }
    }
    return [];
  } catch {
    throw new Error("Couldn't get counters!");
  }
};

const setStoredCounters = (nums: number[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(nums));
  } catch {
    throw new Error("Couldn't set counters!");
  }
};

export default function App() {
  const [counters, setCounters] = useState<number[]>(getStoredCounters());

  useEffect(() => {
    setStoredCounters(counters);
  }, [counters]);

  const addCounter = () => {
    setCounters((prevCounters) => [...prevCounters, 1]);
  };

  const deleteCounter = (idx: number) => {
    setCounters((prevCounters) => [
      ...prevCounters.slice(0, idx),
      ...prevCounters.slice(idx + 1),
    ]);
  };

  return (
    <div>
      Counters
      <button type="button" onClick={addCounter}>
        Add Counter
      </button>
      <div>
        {counters.map((value, index) => (
          <Counter
            key={index}
            value={value}
            onChange={(newValue) => {
              const newCounters = [...counters];
              newCounters[index] = newValue;
              setCounters(newCounters);
            }}
            onDelete={() => deleteCounter(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  onDelete: () => void;
}

function Counter({ value, onChange, onDelete }: CounterProps) {
  return (
    <div
      style={{
        marginBottom: "10px",
        border: "1px solid",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <button type="button" onClick={() => onChange(value - 1)}>
          -
        </button>
        <p>{value}</p>
        <button type="button" onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <button type="button" onClick={() => onChange(1)}>
          Reset
        </button>
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
