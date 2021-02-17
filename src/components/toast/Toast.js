import React, { useState, useEffect } from "react";
import { Row, Col, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToastView = (props) => {
  return (
    props.show && (
      <div
        style={{
          padding: 10,
          display: "fixed",
          width: "95%",
          zIndex: 100,
          position: "absolute",
          flexDirection: "row-reverse",
          marginRight: 10,
        }}
      >
        <Toast
          onClose={() => props.setShow(false)}
          show={props.show}
          delay={10000}
          autohide
          style={{
            backgroundColor: props.color,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              backgroundColor: props.backgroundColor,
              width: "10%",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={props.icon} color={props.color} />
          </div>
          <Toast.Body
            style={{
              color: props.backgroundColor,
              width: "90%",
              height: "100%",
            }}
          >
            {props.text}
          </Toast.Body>
        </Toast>
      </div>
    )
  );
};

export default ToastView;
