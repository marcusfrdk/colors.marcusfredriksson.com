import useColor from "contexts/color/useColor";

const HomePage = () => {
  const {
    randomColors,
    addColor,
    regenerateColors,
    toggleColorLock,
    removeColor,
  } = useColor();

  return (
    <div>
      {randomColors.map((color, index) => (
        <div style={{ display: "flex", flexDirection: "row" }} key={index}>
          <p
            style={{ color: color.locked ? "red" : "green" }}
            onClick={() => toggleColorLock(index)}
          >
            {color.hex}
          </p>
          {randomColors.length > 1 && !color.locked && (
            <p onClick={() => removeColor(index)}>Remove</p>
          )}
        </div>
      ))}
      <button onClick={addColor}>Add new color</button>
      <button onClick={regenerateColors}>Regenerate colors</button>
    </div>
  );
};

export default HomePage;
