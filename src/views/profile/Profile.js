import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./Profile.module.css";
import profile from "../../assets/img/profile.jpg"

const Profile = () => {
  useEffect(() => {
    document.body.style = "background: #bee8fa;";

    return () => {
      document.body.style = "background: #ffffff;";
    };
  }, []);
  return (
    <div className="container">
      <div className="card mt-5 pl-5 pr-5 pt-5 pb-5">
        <div className="row">
          <div className="col-lg-8">
            <div className={styles.sectiontitle}>
              <p>profile</p>
              <h2>Personal Details</h2>
            </div>
            <div className={`${styles.personalD} pb-3`}>
              <div>Username: ts</div>
              <div>Email : t@gmail.com</div>
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
              <img src={profile} alt="profile" className={styles.pImage}/>
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
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
