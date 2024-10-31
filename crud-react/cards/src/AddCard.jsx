import { useEffect, useState } from "react";
import ColorChooser from "./ColorChooser";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { createCard } from "./cardAPI";

const AddCard = ({ setCardEvent ,setopenAddDialog}) => {
    const [cardColor, setCardColor] = useState("white");
    const [cardText, setCardText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCard(cardText, cardColor);
            setCardEvent(prev => prev + 1);
            setCardColor("white");
            setCardText("");
            setopenAddDialog(false);

        }
        catch (error) {
            console.error("error in submit new card:", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="add-card-form">
                <div
                    className="card-inner-wrap"
                    style={{ backgroundColor: cardColor }}
                >
                    <input
                        type="text"
                        value={cardText}
                        className="card-text-input"
                        onChange={(e) => setCardText(e.target.value)}
                    />

                    <ColorChooser
                        setCardColor={setCardColor}
                        xOption={false}
                    />
                </div>
                <button type="submit" className="add-btn btn">add</button>
            </form>
        </>
    );
}

export default AddCard;