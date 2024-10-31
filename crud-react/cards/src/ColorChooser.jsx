import { TbXboxX } from "react-icons/tb";

const ColorChooser = ({ setCardColor, setOnColorChange=()=>{} ,xOption=true}) => {
    const colors = ["yellow", "orange", "green", "pink"];

    return (
        <>
            <nav className="color-wrap">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`color-div ${color}`}
                        value={color}
                        onClick={() => {
                            setCardColor(color);
                            setOnColorChange(false);
                        }}
                    ></div>
                ))}
            </nav>
           {xOption&& <button
           className="x-btn btn"
                onClick={() => {
                    setOnColorChange(false)
                }}>
                <TbXboxX />
            </button>}
        </>
    );
};

export default ColorChooser;
