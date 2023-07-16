import { useEffect, useState, useRef } from "react";
import Seat from "../../Seat";
import Moveable from "react-moveable";
import { Rnd } from "react-rnd";
import SelectComponent from "../../Select";
import { Dropdown, Button, Menu } from "antd";
import {
  CloseCircleFilled,
  MoreOutlined,
  CloseCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { renderShape, onDragging, handleRotate, onDragStop } from "../utils";
import styles from "./styles.module.css";

const {
  container,
  sectionRow,
  menuWrapper,
  ticketsContainer,
  closeIcon,
  padding,
} = styles;

const SeatElement = ({
  type = "",
  id = "",
  seats = {},
  setSections = () => {},
  deleteSection = () => {},
  copyHandler = () => {},
  selectedTickets = [],
}) => {
  const [showMovable, setShowMovable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowMovable(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleRemoveSection = () => {
    deleteSection(id);
  };
  const renderSeats = () => {
    const { numOfRows, seatsPerRow } = seats;
    const seatsArray = new Array(numOfRows).fill().map((_, rowIndex) => (
      <div key={rowIndex} className={sectionRow}>
        {new Array(seatsPerRow).fill().map((_, columnIndex) => (
          <Seat key={columnIndex} />
        ))}
      </div>
    ));
    return seatsArray;
  };

  const handleMenuClick = (e) => {
    const actionKey = e.key;
    switch (actionKey) {
      case "delete":
        handleRemoveSection();
        break;
      case "copy":
        copyHandler(id);
        break;
      default:
        break;
    }
  };

  const options = [
    { id: 100, value: "Class A", label: "Class A" },
    { id: 200, value: "Class B", label: "Class B" },
    { id: 300, value: "Class C", label: "Class C" },
  ];

  const selectedTicketsHandler = (selectedTicketsData) => {
    setSections((prev) => {
      return prev.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            selectedTickets: selectedTicketsData,
          };
        }
        return section;
      });
    });
  };

  const seatsActions = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="delete">
        <CloseCircleOutlined /> Delete
      </Menu.Item>
      <Menu.Item key="copy">
        <CopyOutlined /> Copy
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Moveable
        target={showMovable && document.querySelector(`.targetShape` + id)}
        origin={false}
        draggable={true}
        throttleDrag={0}
        rotatable={true}
        throttleRotate={0}
        onRotate={({ target, dist, transform }) =>
          handleRotate({ target, dist, transform, setSections, id })
        }
      />

      <Rnd
        className="targetShape"
        id={`rnd-container-shape${id}`}
        ref={boxRef}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        bounds="parent" // Constrain dragging within the parent container
        onDragStart={() => setIsDragging(true)}
        onDragStop={(e, d) => onDragStop(e, d, boxRef, setIsDragging)}
        onDrag={() => onDragging(setSections, id)}
        enableResizing={false}
      >
        <div
          className={`targetShape${id} ${container} ${
            type === "section" ? padding : ""
          }`}
          id={`shape-section${id}`}
          onClick={() => {
            setShowMovable((prev) => !prev);
            setIsDragging((prev) => !prev);
          }}
          ref={containerRef}
        >
          {type === "section" ? (
            <>
              <div className={menuWrapper}>
                <Dropdown overlay={seatsActions}>
                  <Button icon={<MoreOutlined />}></Button>
                </Dropdown>
              </div>
              <div className={ticketsContainer}>
                {selectedTickets?.length > 0 &&
                  selectedTickets?.map((ticket) => {
                    return <div key={ticket?.id}>{ticket?.value}</div>;
                  })}
              </div>
              {renderSeats()}
              <SelectComponent
                options={options}
                defaultValue="Select a Ticket"
                onChange={selectedTicketsHandler}
              />
            </>
          ) : (
            <>
              <div className={closeIcon} onClick={handleRemoveSection}>
                <CloseCircleFilled />
              </div>
              {renderShape(type)}
            </>
          )}
        </div>
      </Rnd>
    </>
  );
};
export default SeatElement;
