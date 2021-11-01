import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import className from 'classname';
import { Modal, Icon, Button } from 'semantic-ui-react';
import { modalUrutanChange } from '../reducer/form';
import { urutanChange } from '../reducer/item';

const DraggableCard = ({ id, text, index, canDrag = false, moveCard }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    canDrag: canDrag,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={className('py-2.5 px-4 mb-2 border border-gray-500 bg-white', {
        'cursor-move': canDrag,
        'border-dashed': canDrag,
        'opacity-0': isDragging,
        'opacity-100': !isDragging,
      })}
      data-handler-id={handlerId}
    >
      {text}
    </div>
  );
};

const ContainerDraggableCard = () => {
  const dispatch = useDispatch();
  const { urutan } = useSelector((state) => state.item);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = urutan[dragIndex];

      let tempUrutan = [...urutan];
      tempUrutan.splice(dragIndex, 1);
      tempUrutan.splice(hoverIndex, 0, dragCard);
      dispatch(urutanChange(tempUrutan));
    },
    [urutan]
  );

  const renderCard = (card, index) => {
    return (
      <DraggableCard
        index={index}
        key={card.id}
        id={card.id}
        text={card.text}
        canDrag={card?.canDrag}
        moveCard={moveCard}
      />
    );
  };

  return <div>{urutan.map((card, i) => renderCard(card, i))}</div>;
};

export default function ModalUrutan() {
  const dispatch = useDispatch();
  const { modalUrutan } = useSelector((state) => state.form);
  const { urutan } = useSelector((state) => state.item);

  useEffect(() => {
    if (urutan.length === 0) {
      dispatch(
        urutanChange([
          {
            id: 1,
            text: 'Anamnesis',
          },
          {
            id: 2,
            text: 'Screening Jatuh',
          },
          {
            id: 3,
            text: 'Pemeriksaan Fisik',
          },
          {
            id: 4,
            text: 'Pemeriksaan Penunjang',
          },
          {
            id: 5,
            text: 'CPPT',
            canDrag: true,
          },
          {
            id: 6,
            text: 'OBAT',
          },
        ])
      );
    }
  }, []);

  return (
    <Modal
      closeIcon
      centered={false}
      open={modalUrutan}
      onClose={() => dispatch(modalUrutanChange(!modalUrutan))}
    >
      <Modal.Header className="text-xl">
        <Icon.Group className="mr-2">
          <Icon name="ordered list" />
          <Icon corner="bottom right" name="move" />
        </Icon.Group>
        Ubah Urutan Item
      </Modal.Header>
      <Modal.Content>
        <DndProvider backend={HTML5Backend}>
          <ContainerDraggableCard />
        </DndProvider>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon="close"
          content="Tutup"
          onClick={() => dispatch(modalUrutanChange(!modalUrutan))}
        />
      </Modal.Actions>
    </Modal>
  );
}
