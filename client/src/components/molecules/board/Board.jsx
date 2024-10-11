import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './board.css';

const Board = () => {
    const [lists, setLists] = useState([
        {
            id: 'list-1',
            title: 'To Do',
            cards: [{ id: 'card-1', content: 'Task 1' }, { id: 'card-2', content: 'Task 2' }]
        },
        {
            id: 'list-2',
            title: 'In Progress',
            cards: [{ id: 'card-3', content: 'Task 3' }]
        },
        {
            id: 'list-3',
            title: 'Done',
            cards: [{ id: 'card-4', content: 'Task 4' }]
        }
    ]);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        // Si no se mueve a una nueva ubicación
        if (!destination) return;

        // Mover carta dentro de la misma lista
        if (source.droppableId === destination.droppableId) {
            const listIndex = lists.findIndex(list => list.id === source.droppableId);
            const newCards = Array.from(lists[listIndex].cards);
            const [movedCard] = newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, movedCard);

            const newLists = [...lists];
            newLists[listIndex].cards = newCards;
            setLists(newLists);
        } else {
            // Mover carta entre listas
            const sourceListIndex = lists.findIndex(list => list.id === source.droppableId);
            const destinationListIndex = lists.findIndex(list => list.id === destination.droppableId);
            const sourceCards = Array.from(lists[sourceListIndex].cards);
            const [movedCard] = sourceCards.splice(source.index, 1);

            const destinationCards = Array.from(lists[destinationListIndex].cards);
            destinationCards.splice(destination.index, 0, movedCard);

            const newLists = [...lists];
            newLists[sourceListIndex].cards = sourceCards;
            newLists[destinationListIndex].cards = destinationCards;
            setLists(newLists);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                {lists.map((list, index) => (
                    <Droppable key={list.id} droppableId={list.id}>
                        {(provided) => (
                            <div
                                className="list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h3>{list.title}</h3>
                                {list.cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className="card"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {card.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Board;
