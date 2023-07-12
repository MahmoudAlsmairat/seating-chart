import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import Section from "../Section";
import { Dropdown, Button, Menu } from "antd";
import {
  ImportOutlined,
  ExportOutlined,
  MenuOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import stage from "../assets/stage.avif";
import Shape from "../Shape";
import styles from "./styles.module.css";
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
  const [sections, setSections] = useState({ utils: [], sections: [] });
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
      position: {
        rotation: 0,
        translate: { translateX: 0, translateY: 0 },
      },
      id: uuidv4(),
      type: "table or group",
      ticketName: "",
      ticketId: 1,
      numOfRows: rowsNum,
      seatsPerRow: columnsNum,
    }));
    setSections((prev) => ({
      ...prev,
      sections: [...prev?.sections, ...newSections],
    }));
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setPageHeight(pageHeight + 5);
    const getHeight = document.getElementById("parentContainer");
    localStorage.setItem("parentContainerHeight", getHeight.style.height);
  };

  const onClickSeeChart = () => {
    localStorage.setItem("sections", JSON.stringify(sections));
    navigate("/chart");
  };
  const getShape = (key) => {
    return (
      {
        stage: (
          <img
            src={stage}
            alt="stage"
            width="400px"
            height="200px"
            style={{
              borderRadius: "10px",
            }}
          />
        ),
        entranceDoor: (
          <ImportOutlined
            style={{
              fontSize: "55px",
              color: "#1A5276",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        ),
        exitDoor: (
          <ExportOutlined
            style={{
              fontSize: "55px",
              color: "#1A5276",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        ),
      }[key] || null
    );
  };
  const addStageHandler = () => {
    setSections((prev) => ({
      ...prev,
      utils: [
        ...prev?.utils,
        {
          type: "stage",
          id: uuidv4(),
          position: {
            rotation: 0,
            translate: { translateX: 0, translateY: 0 },
          },
        },
      ],
    }));
  };
  const addEntranceDoorHandler = () => {
    setSections((prev) => ({
      ...prev,
      utils: [
        ...prev?.utils,
        {
          type: "entranceDoor",
          id: uuidv4(),
          position: {
            rotation: 0,
            translate: { translateX: 0, translateY: 0 },
          },
        },
      ],
    }));
  };
  const addExitDoorHandler = () => {
    setSections((prev) => ({
      ...prev,
      utils: [
        ...prev?.utils,
        {
          type: "exitDoor",
          id: uuidv4(),
          position: {
            rotation: 0,
            translate: { translateX: 0, translateY: 0 },
          },
        },
      ],
    }));
  };

  const handleMenuClick = (e) => {
    const actionKey = e.key;
    return (
      {
        addStage: addStageHandler,
        addEntranceDoor: addEntranceDoorHandler,
        addExitDoor: addExitDoorHandler,
      }[actionKey]() || null
    );
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="addStage">Add stage</Menu.Item>
      <Menu.Item key="addEntranceDoor">Add Entrance Door</Menu.Item>
      <Menu.Item key="addExitDoor">Add Exit Door</Menu.Item>
    </Menu>
  );
  const deleteSection = (id) => {
    setSections((prev) => {
      const prevSections = [...prev?.sections];
      prevSections.splice(id, 1);
      return { ...prev, sections: prevSections };
    });
  };

  const copyHandler = (id) => {
    const copedItem = sections?.sections[id];
    console.log("copedItem", copedItem);
    setSections((prev) => ({
      ...prev,
      sections: [...prev.sections, { ...copedItem, id: uuidv4() }],
    }));
  };
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
            <Button icon={<MenuOutlined />}></Button>
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
            {sections?.utils?.map((item, idx) => {
              return (
                <Shape
                  key={item?.id}
                  component={getShape(item?.type)}
                  id={idx}
                  setSections={setSections}
                />
              );
            })}
            {sections?.sections?.map((item, id) => {
              return (
                <Section
                  key={item?.id}
                  seats={item}
                  id={id}
                  sectionData={formData}
                  setSections={setSections}
                  deleteSection={deleteSection}
                  copyHandler={copyHandler}
                />
              );
            })}
          </Rnd>
        </div>
      </div>
    </div>
  );
}
