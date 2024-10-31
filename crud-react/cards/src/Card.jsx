import { useEffect, useState } from "react";
import ColorChooser from "./ColorChooser";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { updateCardByID, deleteCardByID } from "./cardAPI";
import { FaRegCircle } from "react-icons/fa";

const Card = ({ id, text, color, setCardEvent }) => {
    const [cardColor, setCardColor] = useState(color);
    const [cardText, setCardText] = useState(text);
    const [onColorChange, setOnColorChange] = useState(false);
    const [onTextChange, setOnTextChange] = useState(false);
    const [onCardDelete, setonCardDelete] = useState(false);
    

    //בעת שינוי צבע מעדכן בשרת
    useEffect(() => {
        if (color != cardColor || text != cardText) {
            updateCardByID(id, cardText, cardColor);
        }
    }, [cardColor, cardText])
    const handleDelete = async () => {
        try {
            await deleteCardByID(id);
            setCardEvent((prev) => prev + 1);
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };
    return (
        <>
            <div
                className="card-inner-wrap"
                style={{ backgroundColor: cardColor }}
            >
                {!onTextChange && <h1 
                className="card-text"
                 onClick={() => setOnTextChange(true)}
                 >{cardText + " " + id}</h1>}
                {onTextChange && <input
                    type="text"
                    value={cardText}
                    className="card-text-input"
                    onChange={(e) => setCardText(e.target.value)}
                    onBlur={() => { setOnTextChange(false) }}
                />}
                {!onColorChange && <div className="card-btns-div">
                    <button
                        className="open-color-btn btn"
                        onClick={() => {
                            setOnColorChange(!onColorChange)
                        }}>
                        <FaRegCircle />
                    </button>
                    <button
                        className="delete-btn btn"
                        onClick={handleDelete}
                    >
                        <MdDeleteOutline />
                    </button>
                </div>}

                {onColorChange && <ColorChooser
                    setCardColor={setCardColor}
                    setOnColorChange={setOnColorChange}
                />
                }
            </div>
        </>
    );
}

export default Card;