import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import { FaCamera } from "react-icons/fa";
import Noprofile from "../static/nopro.jpg";
import Card from "../static/icard.png";
import Icon from "../static/icon1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

function Home() {
  const [selectFile, setSelectFile] = useState(null);
  const [selectFilevalue, setSelectFileValue] = useState({
    name: "",
    phone1: "",
    idno: "",
    dep: "",
    job: "",
    bg: "",
    email: "",
    add: "",
  });
  const [dataItem, setItems] = useState([]);
  const [selectImage, setselectImage] = useState(null);
  const [makeing, setMakeing] = useState(false);
  const [idCard, setIdCard] = useState("");
  const [idCardBack, setIdCardBack] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone1: "",
    idno: "",
    dep: "",
    job: "",
    bg: "",
    email: "",
    add: "",
  });




  

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:5000/items");
  //       setItems(response.data.items);
  //     } catch (error) {
  //       console.error("Error fetching items:", error);
  //     }
  //   };

  //   fetchItems();
  // }, []);

  const handlevalue = (event) => {
    const { name, value } = event.target;
    setSelectFileValue({ ...selectFilevalue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlefile = (event) => {
    const file = event.target.files[0];
    setselectImage(file);
    setSelectFile(event.target.files[0]);
  };

  const handleData = async (e) => {
    e.preventDefault();
    setMakeing(true);

    const validationErrors = {};
    if (!selectFilevalue.name) {
      validationErrors.name = 'Name is required';
    }
  
    const phonePattern = /^[0-9]{10}$/;
    if (!selectFilevalue.phone1.match(phonePattern)) {
      validationErrors.phone1 = 'Phone number  is invalid';
    }

  
    if (!selectFilevalue.idno) {
      validationErrors.idno = 'ID number is required';
    }
  
    if (!selectFilevalue.dep) {
      validationErrors.dep = 'Department is required';
    }
  
    if (!selectFilevalue.job) {
      validationErrors.job = 'Job title is required';
    }
  
    if (!selectFilevalue.bg) {
      validationErrors.bg = 'Blood group is required';
    }
  
    if (!selectFilevalue.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(selectFilevalue.email)) {
      validationErrors.email = 'Email is invalid';
    }
  
    if (!selectFilevalue.add) {
      validationErrors.add = 'Address is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMakeing(false);
      return;
    }




    try {
      const formData = new FormData();
      formData.append("file", selectFile);
      formData.append("name", selectFilevalue.name);
      formData.append("phone", selectFilevalue.phone1);
      formData.append("job", selectFilevalue.job);
      formData.append("idno", selectFilevalue.idno);
      formData.append("dep", selectFilevalue.dep);
      formData.append("bg", selectFilevalue.bg);
      formData.append("email", selectFilevalue.email);
      formData.append("add", selectFilevalue.add);

      const reponse = await axios.post(
        "http://127.0.0.1:5000/idcard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (reponse.data.success) {

        setIdCard(reponse.data.image);
        setIdCardBack(reponse.data.image_back);
      } else {
        console.error("Failed to server code:", reponse.data.error);
      }
    } catch (error) {
      console.error("Error adding data:", error);
    } finally {
      setMakeing(false); // Set downloading state back to false after the download process completes
    }
  };




  const downloadImagesZip = () => {
    axios({
      url: 'http://127.0.0.1:5000/download', // Change URL if Flask app is running on different port or domain
      method: 'GET',
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'images.zip');
      document.body.appendChild(link);
      link.click();
    });
  }


  const Reset  = () =>
    {
      setSelectFileValue({
        name: "",
        phone1: "",
        idno: "",
        dep: "",
        job: "",
        bg: "",
        email: "",
        add: "",
      });
      setIdCard("");
      setselectImage(null);

    }

  return (
    <>
      <div className="container">
        <div>
        <h1 style={{ textAlign: "center", color: "white" }} className="head">
          <img src={Icon} style={{ width: "6%", marginRight: "20px" }} />
          Id Card Maker
        </h1>
        </div>
        <div className="row">
          <div className="col">
            <h3>Personal Details</h3>
            <div className="card">
              <div className="card-body">
                <div className="mb-3 upload">
                  <img
                    src={
                      selectImage ? URL.createObjectURL(selectImage) : Noprofile
                    }
                    width={150}
                    height={150}
                    alt="No Profile"
                  />
                  <div className="round">
                    <FaCamera />
                    <input type="file" onChange={handlefile} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">ID Card No :</label>
                  <input
                    type="number"
                    onChange={handlevalue}
                    value={selectFilevalue.idno}
                    placeholder="Enter your Id Card No"
                    className="form-control"
                    name="idno"
                  />
                  {errors.idno && <span className="error">{errors.idno}</span>}
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Name :</label>
                      <input
                        type="text"
                        value={selectFilevalue.name}
                        onChange={handlevalue}
                        placeholder="Enter your name"
                        className="form-control"
                        name="name"
                      />
                      {errors.name && (
                        <span className="error">{errors.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Phone No :</label>
                      <input
                        type="number"
                        onChange={handlevalue}
                        value={selectFilevalue.phone1}
                        placeholder="Enter your phone number"
                        className="form-control"
                        name="phone1"
                      />
                      {errors.phone1 && (
                        <span className="error">{errors.phone1}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Department :</label>
                      <input
                        type="text"
                        value={selectFilevalue.dep}
                        onChange={handlevalue}
                        placeholder="Enter your Department"
                        className="form-control"
                        name="dep"
                      />
                      {errors.dep && (
                        <span className="error">{errors.dep}</span>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Job Title :</label>
                      <input
                        type="text"
                        onChange={handlevalue}
                        value={selectFilevalue.job}
                        placeholder="Enter your Job Title"
                        className="form-control"
                        name="job"
                      />
                      {errors.job && (
                        <span className="error">{errors.job}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Bloop Group :</label>
                      <input
                        type="text"
                        value={selectFilevalue.bg}
                        onChange={handlevalue}
                        placeholder="Enter your Blood Group"
                        className="form-control"
                        name="bg"
                      />
                      {errors.bg && <span className="error">{errors.bg}</span>}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Email ID:</label>
                      <input
                        type="text"
                        onChange={handlevalue}
                        value={selectFilevalue.email}
                        placeholder="Enter your Email ID"
                        className="form-control"
                        name="email"
                      />
                      {errors.email && (
                        <span className="error">{errors.email}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address :</label>
                  <textarea
                    type="number"
                    onChange={handlevalue}
                    value={selectFilevalue.add}
                    placeholder="Enter your Address"
                    className="form-control"
                    name="add"
                  />
                  {errors.add && <span className="error">{errors.add}</span>}
                </div>

                <div className="mb-3">
                  {idCard ? (
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={handleData}
                          disabled={makeing}
                        >
                          {makeing ? "Making ID Card..." : "Edit"}
                        </button>
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-outline-danger"
                          type="submit"
                          onClick={Reset}
                          style={{ marginTop: "10px" }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleData}
                      disabled={makeing}
                    >
                      {makeing ? "Making ID Card..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col" style={{ marginBottom: "auto" }}>
            <h3>ID Card Preview</h3>
            <div className="card" style={{ height: "auto" }}>
              <div className="card-body">
                {idCard ? (
                  <div>
                    <div className="row">
                      <div className="col">
                        <img
                          src={`data:image/png;base64,${idCard}`}
                          style={{
                            width: "100%",
                            marginLeft: "0%",
                            marginTop: "10%",
                          }}
                        />
                      </div>
                      <div className="col">
                        <img
                          src={`data:image/png;base64,${idCardBack}`}
                          style={{
                            width: "100%",
                            marginLeft: "1%",
                            marginTop: "10%",
                          }}
                        />
                      </div>
                    </div>

                    <button
                      className="btn"
                      style={{
                        background: "green",
                        margin: "10px",
                        textAlign: "center",
                        width: "30%",
                        marginLeft: "35%",
                      }}
                    >
                      <a
                        // href={`data:image/png;base64,${idCard}`}
                        onClick={downloadImagesZip}
                        download="qrcode.png"
                        style={{
                          display: "block",
                          textAlign: "center",
                          textDecoration: "none",
                          color: "white",
                          
                        }}
                      >
                        <FaDownload style={{ marginRight: "5px" }} />{" "}
                        {/* Download icon */}
                        Id Card
                      </a>
                    </button>
                  </div>
                ) : (
                  <img
                    src={Card}
                    style={{
                      width: "50%",
                      marginLeft: "25%",
                      marginTop: "10%",
                    }}
                  />
                )}
              </div>
            </div>

            {/* <ul className="list-group">
            {dataItem.map((item, index) => (
          <li key={index} className="list-group-item">
            <img src={`data:image/jpeg;base64,${item.img}`} alt={`Image ${index}`}  style={{width: "10%", borderRadius: "50%"}}/>
           {item.name}
          </li>
    ))}
          </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
