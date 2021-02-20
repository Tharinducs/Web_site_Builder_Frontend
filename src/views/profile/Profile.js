import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./Profile.module.css";
import profile from "../../assets/img/profile.jpg";
import { connect } from "react-redux";
import {
  faCheck,
  faTimes,
  faPencilAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ToastView from "../../components/toast/Toast";
import Loader from "../../components/loader/Loader";
import { getWebsites } from "../../store/actions/website";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      props.getWebsites(user.user_id);
    }
  }, [user]);

  const getUserData = async () => {
    const user = JSON.parse(await localStorage.getItem("loginToken")).user;

    setUser(user);
  };
  return (
    <>
      <ToastView
        icon={faTimes}
        setShow={(showStatus) => setShowErrorToaster(showStatus)}
        show={showErrorToaster}
        text={props.website.draftError}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className="container">
        {props.website.websiteLoading && <Loader />}
        <div className="card mt-5 pl-5 pr-5 pt-5 pb-5">
          <div className="row">
            <div className="col-lg-8">
              <div className={styles.sectiontitle}>
                <p>profile</p>
                <h2>Personal Details</h2>
              </div>
              <div className={`${styles.personalD} pb-3`}>
                <div>Username: {user?.username}</div>
                <div>Email : {user?.email}</div>
              </div>
              <div className="col-lg-6">
                <Button
                  className="mb-3"
                  style={{ marginLeft: -20 }}
                  variant="dark"
                >
                  Change Password
                </Button>
              </div>
            </div>
            <div className="col-lg-4 pb-3">
              <img src={profile} alt="profile" className={styles.pImage} />
            </div>
          </div>

          <div className={styles.sectiontitle}>
            <h2>Site Details</h2>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>About</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.website.websites.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.companyName}</td>
                    <td>{item.about && `${item.about.substring(0, 50)} ...`}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon icon={faPencilAlt} onClick={() => {
                          props.history.push(
                            `${process.env.PUBLIC_URL}/edit`,
                            { websiteData: item }
                          );
                        }}/>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="ml-2"
                        onClick={() => {
                          props.history.push(
                            `${process.env.PUBLIC_URL}/webpage`,
                            { websiteData: item }
                          );
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    website: state.website,
  };
};

export default connect(mapStateToProps, { getWebsites })(withRouter(Profile));
