import useColor from "contexts/color/useColor";

const HomePage = () => {
  const { randomColors, addColor, regenerateColors, toggleColorLock } =
    useColor();

  return (
    <div>
      {randomColors.map((color, index) => (
        <p
          style={{ color: color.locked ? "red" : "green" }}
          onClick={() => toggleColorLock(index)}
          key={index}
        >
          {color.hex}
        </p>
      ))}
      <button onClick={addColor}>Add new color</button>
      <button onClick={regenerateColors}>Regenerate colors</button>
    </div>
  );
};

export default HomePage;
