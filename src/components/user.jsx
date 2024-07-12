import React, { useState, useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    BloodGroup: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from Firestore on component mount and on authentication change
  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
   
    // Handle authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, fetch user data
        fetchUserData(user.uid);
      } else {
        // User is signed out, handle accordingly (e.g., redirect to login)
        console.log("User is signed out.");
        setUser({
          fullName: "",
          email: "",
          phone: "",
          BloodGroup: "",
          address: "",
        });
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleEdit = () => {
    setIsEditing(true);
  };
  const signout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        BloodGroup: user.BloodGroup,
        address: user.address,
      });
      console.log("User data saved successfully!");
      setIsEditing(false); // Disable edit mode after saving
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="user">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />

                <div className="d-flex justify-content-center mb-2 mt-5">
                  {isEditing ? (
                    <MDBBtn
                      color="primary"
                      className="me-2"
                      onClick={handleSave}
                    >
                      Save
                    </MDBBtn>
                  ) : (
                    <MDBBtn
                      outline
                      color="primary"
                      className="me-2"
                      onClick={handleEdit}
                    >
                      Edit
                    </MDBBtn>
                  )}
                  <MDBBtn
                    outline
                    color="primary"
                    onClick={() => setIsEditing(false)} // Cancel edit mode
                  >
                    Cancel
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={user.fullName}
                        placeholder={user.fullName}
                        onChange={handleChange}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user.fullName}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user.email}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user.phone}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText>Blood Group</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="BloodGroup"
                        value={user.BloodGroup}
                        onChange={handleChange}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user.BloodGroup}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user.address}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div >
          <button
            type="button"
            className="btn btn-primary"
            data-mdb-ripple-init
            onClick={signout}
          >
            Sign Out
          </button>
        </div>
      </MDBContainer>
    </section>
  );
}
