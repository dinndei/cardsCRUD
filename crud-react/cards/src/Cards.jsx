import { useEffect, useState } from "react";
import Card from "./Card";
import { getCards , updateCardsAfterDrag } from "./cardAPI";
import AddCard from "./AddCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Cards = () => {

    const [cards, setCards] = useState([]);
    const [cardEvent, setCardEvent] = useState(0);
    const [openAddDialog, setopenAddDialog] = useState(false);


    useEffect(() => {
        const handleGetCards = async () => {
            try {
                let res = await getCards();
                setCards(res.data);
                console.log("cards in await", cards);
            }
            catch (error) {
                console.error(error);

            }
        }
        handleGetCards();
        console.log("cardEvent", cardEvent);
        console.log("cards out", cards);
    }, [cardEvent])

    //function to handle dragging cards

    const handleOnDragEnd = async(result) => {
        if (!result.destination) return;
        const items = Array.from(cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCards(items);
        console.log(items);
        await updateCardsAfterDrag(result.source.index,result.destination.index);
    };


    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="cards">
                    {(provided) => (
                        <ul
                            className="ul-cards-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {cards.map((item, index) => {
                                return <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided) => (
                                        <li
                                            className="li-card"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card
                                                id={item.id}
                                                text={item.text}
                                                color={item.color}
                                                setCardEvent={setCardEvent}

                                            />
                                        </li>)}
                                </Draggable>
                            })}
                            {provided.placeholder}
                            <li key="last" className="li-card">

                                {!openAddDialog &&
                                    <div className="card-inner-wrap">
                                        <button className="add-card-btn btn"
                                            onClick={() => { setopenAddDialog(true) }}
                                        >+</button></div>
                                }
                                {openAddDialog &&
                                    <AddCard
                                        setCardEvent={setCardEvent}
                                        setopenAddDialog={setopenAddDialog}
                                    />
                                }

                            </li>
                        </ul>
                    )}
      
                </Droppable>
            </DragDropContext>
        </>
    );
}

export default Cards;