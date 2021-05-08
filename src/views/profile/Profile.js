import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
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
import { getWebsites, clearUpdateData,getCache,createCache } from "../../store/actions/website";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState(null);
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
    props.clearUpdateData();
  }, []);

  useEffect(() => {
    if (user && user.user_id) {
      props.getWebsites(user.user_id);
    }
  }, [user]);

  useEffect(()=>{
    if(props.website.cachesSiteData){
      setShowModal(false);
      setShowToast(true);
      let cacheData =props.website.cachesSiteData;
      cacheData?.map((item,index)=>{
        let dataItem = {
          type:'Resturant',
          cname: item.Title,
          about: item.description,
          address: JSON.stringify({value:item.Address,address:item.Address,coordinates:{lat:item.Latitude,lng:item.Longitude}}),
          email: "mysite@example.com",
          pnumber:item.Phone,
          userId:user.user_id
        }

        props.createCache(dataItem)
      }) 
    }
  },[props.website.cachesSiteData])

  const getUserData = async () => {
    const user = JSON.parse(await localStorage.getItem("loginToken")).user;

    setUser(user);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = () => {
    if (!mobileNo) {
      setMobileNoErr(true);
    } else {
      setMobileNoErr(false);
      props.getCache(mobileNo)
    }
  }

  return (
    <>
      {props.website.websiteLoading && <Loader />}
      <ToastView
        icon={faCheck}
        setShow={(showStatus) => setShowToast(showStatus)}
        show={showToast}
        text="Successfully Imported!.Your sites will be creted in Few Seconds. "
        color="#adf4ce"
        backgroundColor="#00823e"
      />
      <ToastView
        icon={faTimes}
        setShow={(showStatus) => setShowErrorToaster(showStatus)}
        show={showErrorToaster}
        text={props.website.websiteLoadingError}
        color="#FCC3B6"
        backgroundColor="#ff0000 "
      />
      <div className="container">
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
                  onClick={() => {
                    props.history.push(
                      `${process.env.PUBLIC_URL}/changepassword`
                    );
                  }}
                >
                  Change Password
                </Button>
                <Button
                  className="mb-3"
                  style={{ marginLeft: -20 }}
                  variant="dark"
                  onClick={handleShow}
                >
                  Import Previous websites
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
              {props.website.websites && props.website.websites.map((item, index) => {
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
                      }} />
                      <FontAwesomeIcon
                        icon={faEye}
                        className="ml-2"
                        onClick={() => {
                          props.history.push(
                            `${process.env.PUBLIC_URL}/webpage`,
                            { websiteData: item, from: 'profile' }
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
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import your sites</Modal.Title>
          </Modal.Header>
          <Modal.Body><input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobileNo}
            onChange={(event) => setMobileNo(event.target.value)}
            className={styles.formInput}
          />
            {mobileNoErr && <div className={styles.errorMessage}>
              Mobile No is Required!
                        </div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{handleClose();setMobileNoErr(null);setMobileNo("")}}>
              Close
          </Button>
            <Button variant="success" onClick={handleSubmit}>
              Import
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    website: state.website,
  };
};

export default connect(mapStateToProps, { getWebsites, clearUpdateData,getCache,createCache })(withRouter(Profile));
