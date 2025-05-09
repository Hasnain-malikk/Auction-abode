import React, { useEffect, useState,useContext } from "react";
import { motion } from "framer-motion";
import ViewBids from "./ViewBids";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getAllProperties,addProperty,getAllPropertiesByUserId, deleteProperty, editProperty } from "../services/propertiesService";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Properties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([])
  const [addFlag, setAddFlag] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchProperties();
    }
  }, [user, navigate]);

  const fetchProperties = async () => {
    console.log(user._id)
       try {
        const data = await getAllPropertiesByUserId(user._id);
        setProperties(data);
        } catch (err) {
          console.log("error to fetch properties",err);
        }
  };
  const [formData, setFormData] = useState({
    id: null,
    seller:user ? user._id : "",
    title: "",
    description: "",
    startingBid: "",
    startBiddingTime: "",
    endBiddingTime: "",
    images: [],
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Calculate auction duration
  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const duration = (endTime - startTime) / (1000 * 60 * 60); 
    return isNaN(duration) ? "N/A" : duration.toFixed(2) + " hours";
  };

  // Handle modal display for adding/editing properties
  const handleShowModal = (property = null) => {
    if (property) {
      setFormData(property);
      setAddFlag(false)
    } else {
      setAddFlag(true)
      setFormData({
        id: null,
        seller:user ? user._id : "",
        title: "",
        description: "",
        startingBid: "",
        startBiddingTime: "",
        endBiddingTime: "",
        images: [],
      });
    }
  };

  // Handle viewing bids for a specific property
  const handleViewBids = (property) => {
    console.log(properties)
    setSelectedProperty(property);
  };

  const truncateText = (text, lines) => {
    const words = text.split(" ");
    if (words.length > lines * 10) {
      return words.slice(0, lines * 10).join(" ") + "...";
    }
    return text;
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.seller=user ? user._id : "";
    console.log(formData)
    const formDataObj = new FormData();
formDataObj.append("seller", formData.seller);
formDataObj.append("title", formData.title);
formDataObj.append("description", formData.description);
formDataObj.append("startingBid", formData.startingBid);
formDataObj.append("startBiddingTime", formData.startBiddingTime);
formDataObj.append("endBiddingTime", formData.endBiddingTime);

for (let i = 0; i < formData.images.length; i++) {
  formDataObj.append("images", formData.images[i]);  
}

if (addFlag) {
  const newProperty = await addProperty(formDataObj);
  if (newProperty) {
    setProperties([...properties, newProperty]);
  }
} else {
  const updatedProperty = await editProperty(formDataObj, formData._id); 
  if (updatedProperty) {
    setProperties(properties.map((p) => (p._id === formData._id ? updatedProperty : p)));
  }
}
    document.getElementById("closeModal").click();
  };

  const handleDelete = async (id) => {
    const success = await deleteProperty(id);
    if (success) {
      setProperties(properties.filter((p) => p._id !== id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4" style={{ minHeight: "1000px" }}>
        <motion.h2 className="text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Manage Properties
        </motion.h2>

        <motion.button
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#propertyModal"
          onClick={() => handleShowModal()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Add Property
        </motion.button>

        <div className="row">
          {properties.length > 0 ? (
            properties.map((property) => (
              <motion.div
                key={property._id}
                className="col-md-6 col-lg-4 mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card shadow-sm">
                  {/* Property Image */}
                  {/* {property.images.length > 0 && (
                    <img
                      src={URL.createObjectURL(property.images[0])}
                      className="card-img-top"
                      alt={property.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )} */}


                  <div className="card shadow-sm">

  <div id={`carousel${property._id}`} className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      {property.images.length > 0 ? (
        property.images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={'http://localhost:4646/'+image}
              className="d-block w-100"
              alt={`Property ${index}`}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </div>
        ))
      ) : (
        <div className="carousel-item active">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            className="d-block w-100"
            alt="No Image"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>

    {property.images.length > 1 && (
      <>
        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${property._id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#carousel${property._id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </>
    )}
  </div>


</div>


                  {/* Property Details */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {truncateText(property.title, 1)}
                    </h5>
                    <p className="card-text flex-grow-1" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {truncateText(property.description, 1)}
                    </p>
                    <p className="fw-bold">Starting Bid: {property.startingBid} PKR</p>
                    <p className="text-muted">Auction Duration: {calculateDuration(property.startBiddingTime, property.endBiddingTime)}</p>
                    <p className="text-muted">Start Time: {new Date(property.startBiddingTime).toLocaleString()}</p>
                    <p className="text-muted">End Time: {new Date(property.endBiddingTime).toLocaleString()}</p>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between">
                      <motion.button
                        className="btn btn-warning btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#propertyModal"
                        onClick={() => handleShowModal(property)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this property?")) {
                            handleDelete(property._id);
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                      <motion.button
                        className="btn btn-success btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#viewBidsModal"
                        onClick={() => handleViewBids(property)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Bids
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div className="text-center w-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <p>No properties listed yet.</p>
            </motion.div>
          )}
        </div>

        <div className="modal fade" id="propertyModal" tabIndex="-1" aria-labelledby="propertyModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="propertyModalLabel">{formData.id ? "Edit Property" : "Add Property"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Starting Bid (PKR)</label>
                    <input type="number" className="form-control" name="startingBid" value={formData.startingBid} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Bidding Time</label>
                    <input type="datetime-local" className="form-control" name="startBiddingTime" value={formData.startBiddingTime} onChange={handleChange}  />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Bidding Time</label>
                    <input type="datetime-local" className="form-control" name="endBiddingTime" value={formData.endBiddingTime} onChange={handleChange}  />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Upload Images</label>
                    <input type="file" className="form-control" multiple onChange={handleFileChange} required/>
                  </div>
                </div>
                <div className="modal-footer">
                  <motion.button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Cancel
                  </motion.button>
                  <motion.button type="submit" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {formData.id ? "Update" : "Add"} Property
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal for View Bids */}
        <div className="modal fade" id="viewBidsModal" tabIndex="-1" aria-labelledby="viewBidsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewBidsModalLabel">View Bids</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedProperty && <ViewBids property={selectedProperty} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Properties;