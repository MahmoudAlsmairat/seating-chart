import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import Section from "../Section";
import { Dropdown, Button, Menu } from "antd";
import {
  ImportOutlined,
  ExportOutlined,
  MenuOutlined,
} from "@ant-design/icons";
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
    rowsNum: 0,
    columnsNum: 0,
  });
  const [sections, setSections] = useState({ utils: [], sections: {} });
  const [pageHeight, setPageHeight] = useState(500);
  const [numOfSections, setNumOfSections] = useState(0);
  const navigate = useNavigate();

  const changeHandler = ({ target: { value, name } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: +value,
    }));
  };
  console.log("finalObj", sections);
  const onClickHandler = () => {
    const { rowsNum, columnsNum } = formData;
    setNumOfSections(numOfSections + 1);
    setSections((prev) => ({
      ...prev,
      sections: {
        ...prev?.sections,
        [numOfSections + 1]: {
          position: {
            top: 151,
            rotate: 151,
            left: 121,
          },
          id: "",
          type: "table or group",
          ticketName: "",
          ticketId: 1,
          numOfRows: rowsNum,
          seatsPerRow: columnsNum,
        },
      },
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
  const addStageHandler = () => {
    setSections((prev) => ({
      ...prev,
      utils: [
        ...prev?.utils,
        {
          type: "stage",
          component: (
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
          component: (
            <ImportOutlined
              style={{
                fontSize: "55px",
                color: "#1A5276",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          ),
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
          component: (
            <ExportOutlined
              style={{
                fontSize: "55px",
                color: "#1A5276",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          ),
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

  return (
    <div className={container} style={{ height: `${pageHeight}px` }}>
      <Form
        formData={formData}
        changeHandler={changeHandler}
        onClickHandler={onClickHandler}
      />
      <div className={seeChart}>
        <Button onClick={onClickSeeChart}>See Chart</Button>
      </div>
      <div className={centerContainer}>
        <div className={menuWrapper}>
          <Dropdown overlay={menu}>
            <Button>
              <MenuOutlined />
            </Button>
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
                  component={item?.component}
                  id={idx}
                  setSections={setSections}
                />
              );
            })}
            {Object?.keys(sections?.sections || {})?.map((item, id) => {
              return (
                <Section
                  seats={sections?.sections[item]}
                  id={item}
                  sectionData={formData}
                  setSections={setSections}
                />
              );
            })}
          </Rnd>
        </div>
      </div>
    </div>
  );
}
