import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useNavigate } from "react-router-dom";
import { Dropdown, Button, Menu } from "antd";
import { MenuOutlined, EyeOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import SeatElement from "./SeatingElements";
import Form from "../Form";

const {
  container,
  centerContainer,
  centerContent,
  parentContainer,
  seeChart,
  menuWrapper,
} = styles;

export default function SeatingChart() {
  const [formData, setFormData] = useState({
    rowsNum: 1,
    columnsNum: 1,
    sectionsNum: 1,
  });
  const [sections, setSections] = useState([]);
  const [pageHeight, setPageHeight] = useState(500);
  const [numOfSections, setNumOfSections] = useState(0);
  const navigate = useNavigate();

  const changeHandler = ({ target: { value, name } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: +value,
    }));
  };

  const onClickHandler = () => {
    const { rowsNum, columnsNum, sectionsNum } = formData;
    setNumOfSections(numOfSections + 1);
    const newSections = new Array(sectionsNum).fill().map((_, rowIndex) => ({
      type: "section",
      id: uuidv4(),
      seats: {
        numOfRows: rowsNum,
        seatsPerRow: columnsNum,
      },
      selectedTickets: [],
    }));
    setSections((prev) => [...prev, ...newSections]);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setPageHeight((prevHeight) => prevHeight + 5);
    const getHeight = document.getElementById("parentContainer");
    localStorage.setItem("parentContainerHeight", getHeight.style.height);
  };

  const onClickSeeChart = () => {
    localStorage.setItem("sections", JSON.stringify(sections));
    navigate("/chart");
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "addStage":
        addShape("stage");
        break;
      case "addEntranceDoor":
        addShape("entranceDoor");
        break;
      case "addExitDoor":
        addShape("exitDoor");
        break;
      default:
        break;
    }
  };

  const addShape = (type) => {
    const newShape = {
      type,
      id: uuidv4(),
      seats: [],
    };
    setSections((prev) => [...prev, newShape]);
  };

  const deleteSection = (id) => {
    setSections((prev) => prev.filter((element) => element.id !== id));
  };

  const copyHandler = (id) => {
    const copiedItem = sections.find((element) => element.id === id);
    if (copiedItem) {
      const copiedElement = { ...copiedItem, id: uuidv4() };
      setSections((prev) => [...prev, copiedElement]);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="addStage">Add stage</Menu.Item>
      <Menu.Item key="addEntranceDoor">Add Entrance Door</Menu.Item>
      <Menu.Item key="addExitDoor">Add Exit Door</Menu.Item>
    </Menu>
  );
  return (
    <div className={container} style={{ height: `${pageHeight}px` }}>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />
      <div className={seeChart}>
        <Button onClick={onClickSeeChart} icon={<EyeOutlined />}>
          See Chart
        </Button>
      </div>
      <div className={centerContainer}>
        <div className={menuWrapper}>
          <Dropdown overlay={menu}>
            <Button icon={<MenuOutlined />} />
          </Dropdown>
        </div>
        <div className={centerContent}>
          <Rnd
            className={parentContainer}
            id="parentContainer"
            enableResizing={{
              top: true,
              right: false,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            disableDragging={true}
            default={{
              width: window.innerWidth - 50,
              height: 600,
            }}
            onResize={handleResize}
          >
            {sections.map((item) => (
              <SeatElement
                key={item.id}
                type={item.type}
                id={item.id}
                seats={item.seats}
                selectedTickets={item?.selectedTickets}
                setSections={setSections}
                deleteSection={deleteSection}
                copyHandler={copyHandler}
              />
            ))}
          </Rnd>
        </div>
      </div>
    </div>
  );
}
