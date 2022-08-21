import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { RestartAlt, Save, AddCircle, Delete } from "@mui/icons-material";
import { brandList } from "../demoData";
import divisionList from "../demoData";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  URL,
  GET_DISTRICT,
  GET_UPAZILA,
  GET_SUBCATEGORY,
  SUBMIT_DATA,
} from "../Axios/Api";
import { districtList } from "../demoData";
import { upazillaList } from "../demoData";
import axios from "axios";
const Dashboard = () => {
  //STATE DICLARE
  const [defaultCategoryValue, setDefaultCategoryValue] = useState("");
  const [defaultSubcategoryValue, setDefaultSubcategoryValue] = useState("");
  const [division, setDivision] = useState(0);
  const [district, setDistrict] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [upazila, setUpazilla] = useState(0);
  const [upazillaOptions, setUpazillaOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [retail, setRetail] = useState("");
  const [retailType, setRetailType] = useState("");
  const [storeSize, setStoreSize] = useState("");
  const [felPartner, setFelPartner] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [csm, setCsm] = useState("");
  const [asm, setAsm] = useState("");
  const [tsm, settsm] = useState("");
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [productDetails, setProductDetails] = useState([
    {
      category_id: 0,
      subcategory_id: 0,
      samsung_brand: { name: "SAMSUNG", qnty: 0 },
      sony_brand: { name: "SONY", qnty: 0 },
      lg_brand: { name: "LG", qnty: 0 },
      oth_foreign_brand: { name: "OTH-FOREIGN", qnty: 0 },
      walton_brand: { name: "WALTON", qnty: 0 },
      singer_brand: { name: "SINGER", qnty: 0 },
      vision_brand: { name: "VISION", qnty: 0 },
      sharp_brand: { name: "SHARP", qnty: 0 },
      oth_bd_brand: { name: "OTH-BD", qnty: 0 },
      hitachi_brand: { name: "HITACHI", qnty: 0 },
      jamuna_brand: { name: "JAMUNA", qnty: 0 },
      eco_plus_brand: { name: "ECO PLUS", qnty: 0 },
      miyako_brand: { name: "MIYAKO", qnty: 0 },
      gree_brand: { name: "GREE", qnty: 0 },
      midea_brand: { name: "MIDEA", qnty: 0 },
    },
  ]);

  const handleDivisionChange = (event, newValue) => {
    setDivision(newValue.id);
    const getDistrictList = async () => {
      const res = await axios
        .post(URL + GET_DISTRICT, {
          id: newValue.id,
        })
        .then((response) => setDistrictOptions(response.data.districtList));
    };
    getDistrictList();
  };
  const handleDistrictChange = (event, newValue) => {
    setDistrict(newValue.District_ID);
    const getUpazila = async () => {
      const res = await axios
        .post(URL + GET_UPAZILA, {
          id: newValue.District_ID,
        })
        .then((response) => setUpazillaOptions(response.data.upazilaList));
    };
    getUpazila();
  };
  const handleUpazillaChange = (event, newValue) => {
    setUpazilla(newValue.Upazila_ID);
  };
  const handleCategoryChange = (index, event) => {
    const values = [...productDetails];
    let categoryid = event.target.value;
    values[index]["category_id"] = event.target.value;
    setProductDetails(values);

    const getSubcategoryList = async () => {
      const res = await axios
        .post(URL + GET_SUBCATEGORY, {
          id: categoryid,
        })
        .then((response) =>
          setSubcategoryOptions(response.data.subCategoryList)
        );
    };
    getSubcategoryList();
  };
  const handleSubcategoryChange = (index, event) => {
    const values = [...productDetails];
    console.log(event.target.value);
    values[index]["subcategory_id"] = event.target.value;
    setProductDetails(values);
  };
  const handleChangeInput = (index, event) => {
    const values = [...productDetails];
    values[index][event.target.name]["qnty"] = event.target.value;
    setProductDetails(values);
  };
  const handleAddButton = () => {
    setProductDetails([
      ...productDetails,
      {
        category_id: 0,
        subcategory_id: 0,
        samsung_brand: { name: "SAMSUNG", qnty: 0 },
        sony_brand: { name: "SONY", qnty: 0 },
        lg_brand: { name: "LG", qnty: 0 },
        oth_foreign_brand: { name: "OTH-FOREIGN", qnty: 0 },
        walton_brand: { name: "WALTON", qnty: 0 },
        singer_brand: { name: "SINGER", qnty: 0 },
        vision_brand: { name: "VISION", qnty: 0 },
        sharp_brand: { name: "SHARP", qnty: 0 },
        oth_bd_brand: { name: "OTH-BD", qnty: 0 },
        hitachi_brand: { name: "HITACHI", qnty: 0 },
        jamuna_brand: { name: "JAMUNA", qnty: 0 },
        eco_plus_brand: { name: "ECO PLUS", qnty: 0 },
        miyako_brand: { name: "MIYAKO", qnty: 0 },
        gree_brand: { name: "GREE", qnty: 0 },
        midea_brand: { name: "MIDEA", qnty: 0 },
      },
    ]);
    toast.success("New Segment Added!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // enqueueSnackbar("Successfully added new segment!", "success");
  };
  const handleRemoveButton = (index) => {
    const list = [...productDetails];
    list.splice(index, 1);

    // enqueueSnackbar("Successfully deleted the segment!", "success");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setProductDetails(list);
        toast.success("Successfully Removed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let submittedData = {
      district: district,
      division: division,
      upazila: upazila,
      location: location,
      retail: retail,
      retail_type: retailType,
      store_size: storeSize,
      fel_partner: felPartner,
      owner_name: ownerName,
      owner_number: ownerNumber,
      csm: csm,
      asm: asm,
      tsm: tsm,
      products: productDetails,
    };
    console.log(submittedData);
    const submitData = async () => {
      const res = await axios
        .post(URL + SUBMIT_DATA, submittedData)
        .then((response) => console.log(response));
      setDefaultCategoryValue("");
      setDefaultSubcategoryValue("");
      setProductDetails([
        {
          category_id: 0,
          subcategory_id: 0,
          samsung_brand: { name: "SAMSUNG", qnty: 0 },
          sony_brand: { name: "SONY", qnty: 0 },
          lg_brand: { name: "LG", qnty: 0 },
          oth_foreign_brand: { name: "OTH-FOREIGN", qnty: 0 },
          walton_brand: { name: "WALTON", qnty: 0 },
          singer_brand: { name: "SINGER", qnty: 0 },
          vision_brand: { name: "VISION", qnty: 0 },
          sharp_brand: { name: "SHARP", qnty: 0 },
          oth_bd_brand: { name: "OTH-BD", qnty: 0 },
          hitachi_brand: { name: "HITACHI", qnty: 0 },
          jamuna_brand: { name: "JAMUNA", qnty: 0 },
          eco_plus_brand: { name: "ECO PLUS", qnty: 0 },
          miyako_brand: { name: "MIYAKO", qnty: 0 },
          gree_brand: { name: "GREE", qnty: 0 },
          midea_brand: { name: "MIDEA", qnty: 0 },
        },
      ]);
    };
    // submitData();
    Swal.fire({
      title: "Do you want to submit the details?",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        submitData();
        Swal.fire("Submitted!", "", "success");
      }
    });
  };
  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">Dashboard Page</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <Form className="mx-6" onSubmit={handleSubmit}>
                <div className="row mt-5">
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>Division</span>
                      </Form.Label>
                      <Autocomplete
                        // defaultValue={{ name: "Dhaka", value: "dhaka" }}
                        className="mt-2"
                        onChange={handleDivisionChange}
                        disablePortal
                        options={divisionList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a division"
                            required={true}
                          />
                        )}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}> Disctrict</span>
                      </Form.Label>
                      <Autocomplete
                        disabled={false}
                        // defaultValue={{ name: "Dhaka", value: "dhaka" }}
                        className="mt-2"
                        onChange={handleDistrictChange}
                        disablePortal
                        options={districtOptions}
                        getOptionLabel={(option) => option.District_Name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a disctrict"
                            required={true}
                          />
                        )}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}> Upazila</span>
                      </Form.Label>
                      <Autocomplete
                        disabled={false}
                        // defaultValue={{ name: "Dhaka", value: "dhaka" }}
                        className="mt-2"
                        onChange={handleUpazillaChange}
                        disablePortal
                        options={upazillaOptions}
                        getOptionLabel={(option) => option.Upazila_Name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a upazila"
                            required={true}
                          />
                        )}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6 col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>
                          City/Town/Village
                        </span>
                      </Form.Label>
                      <div>
                        <TextField
                          fullWidth
                          required={true}
                          className="mt-2"
                          label="Enter details"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>Retail</span>
                      </Form.Label>
                      <div>
                        <TextField
                          required={true}
                          fullWidth
                          className="mt-2"
                          label="Enter retail name"
                          value={retail}
                          onChange={(e) => setRetail(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>Retail Type</span>
                      </Form.Label>
                      <div>
                        <TextField
                          fullWidth
                          required={true}
                          className="mt-2"
                          label="Enter retail type"
                          value={retailType}
                          onChange={(e) => setRetailType(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}> Store Size</span>
                      </Form.Label>
                      <div>
                        <TextField
                          fullWidth
                          required={true}
                          className="mt-2"
                          label="Enter retail type"
                          value={storeSize}
                          onChange={(e) => setStoreSize(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label id="demo-simple-select-label">
                        <span style={{ fontWeight: "bold" }}> Fel Partner</span>
                      </Form.Label>

                      <FormControl className="mt-2" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Fel Partner Status
                        </InputLabel>
                        <Select
                          required={true}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Fel Partner Status"
                          value={felPartner}
                          onChange={(event) => {
                            setFelPartner(event.target.value);
                          }}
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>Owner Name</span>
                      </Form.Label>
                      <TextField
                        required={true}
                        fullWidth
                        className="mt-2"
                        label="Enter owner name"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>Owner Number</span>
                      </Form.Label>
                      <TextField
                        required={true}
                        fullWidth
                        className="mt-2"
                        type="number"
                        label="Enter owner number"
                        value={ownerNumber}
                        onChange={(e) => setOwnerNumber(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>CSM Name</span>
                      </Form.Label>
                      <TextField
                        fullWidth
                        required={true}
                        className="mt-2"
                        label="Enter CSM name"
                        value={csm}
                        onChange={(e) => setCsm(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}> ASM Name</span>
                      </Form.Label>
                      <TextField
                        fullWidth
                        required={true}
                        className="mt-2"
                        label="Enter ASM name"
                        value={asm}
                        onChange={(e) => setAsm(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>TSM Name</span>
                      </Form.Label>
                      <TextField
                        fullWidth
                        required={true}
                        className="mt-2"
                        label="Enter TSM name"
                        value={tsm}
                        onChange={(e) => settsm(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>

                {productDetails.map((product, index) => (
                  <div key={index}>
                    <div className="row mt-6">
                      <div className="col-12	col-sm-12	col-md-5	col-lg-5	col-xl-5	col-xxl-5 ">
                        <div className=" row d-flex justify-content-between align-items-center">
                          <Form.Label className="col-4">
                            <span
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              Select Category:
                            </span>
                          </Form.Label>
                          <Form.Group
                            className="col-8 mb-4"
                            controlId="exampleForm.ControlInput1"
                          >
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Choose a category
                              </InputLabel>
                              <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Choose a category"
                                onChange={(event) => {
                                  handleCategoryChange(index, event);
                                }}
                              >
                                <MenuItem value={5}>MWO Category</MenuItem>
                                <MenuItem value={6}>RAC Category</MenuItem>
                                <MenuItem value={3}>REF Category</MenuItem>
                                <MenuItem value={2}>TV Category</MenuItem>
                                <MenuItem value={4}>WM Category</MenuItem>
                              </Select>
                            </FormControl>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-12	col-sm-12	col-md-5	col-lg-5	col-xl-5	col-xxl-5 ">
                        <div className=" row d-flex justify-content-between align-items-center">
                          <Form.Label className="col-6">
                            <span
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              Select Subcategory:
                            </span>
                          </Form.Label>
                          <Form.Group
                            className="col-6 mb-4"
                            controlId="exampleForm.ControlInput1"
                          >
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Choose a subcategory
                              </InputLabel>
                              <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Choose a subcategory"
                                onChange={(event) => {
                                  handleSubcategoryChange(index, event);
                                }}
                              >
                                {subcategoryOptions.map((option, index) => (
                                  <MenuItem
                                    key={option.Sub_Cat_ID}
                                    value={option.Sub_Cat_ID}
                                  >
                                    {option.Sub_Category_Name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Form.Group>
                        </div>
                      </div>
                      {productDetails.length > 1 &&
                      productDetails.length - 1 === index ? (
                        <div className="col-12	col-sm-12	col-md-2	col-lg-2	col-xl-2	col-xxl-2 ">
                          <div className="d-flex justify-content-end align-items-center">
                            <Button
                              className="mx-2"
                              variant="danger"
                              onClick={() => handleRemoveButton(index)}
                            >
                              <Delete />
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="row mt-3">
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[0]}
                            </span>
                          </Form.Label>
                          <TextField
                            type="number"
                            fullWidth
                            name="samsung_brand"
                            className="mt-2"
                            label="Enter amount"
                            value={product.samsung_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[1]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            type="number"
                            className="mt-2"
                            name="sony_brand"
                            label="Enter amount"
                            value={product.sony_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[2]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="lg_brand"
                            type="number"
                            className="mt-2"
                            label="Enter amount"
                            value={product.lg_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[3]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="oth_foreign_brand"
                            type="number"
                            className="mt-2"
                            label="Enter amount"
                            value={product.oth_foreign_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[4]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="walton_brand"
                            type="number"
                            className="mt-2"
                            label="Enter amount"
                            value={product.walton_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[5]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="singer_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.singer_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[6]}
                            </span>
                          </Form.Label>
                          <TextField
                            type="number"
                            name="vision_brand"
                            fullWidth
                            className="mt-2"
                            label="Enter amount"
                            value={product.vision_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[7]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="oth_bd_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.oth_bd_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[8]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="hitachi_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.hitachi_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[9]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="jamuna_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.jamuna_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[10]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="sharp_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.sharp_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[11]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="eco_plus_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.eco_plus_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[12]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="miyako_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.miyako_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[13]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="gree_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.gree_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-3	col-xxl-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              {brandList[14]}
                            </span>
                          </Form.Label>
                          <TextField
                            fullWidth
                            name="midea_brand"
                            className="mt-2"
                            type="number"
                            label="Enter amount"
                            value={product.midea_brand.qnty}
                            onChange={(event) => {
                              handleChangeInput(index, event);
                            }}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="row mt-4 mb-5">
                  <div className="d-flex justify-content-end align-content-center">
                    <Button
                      className="mx-2"
                      variant="warning"
                      size="lg"
                      onClick={handleAddButton}
                    >
                      <AddCircle sx={{ marginRight: 1 }} />
                      Add
                    </Button>
                    {/* <Button className="mx-2" variant="secondary" size="lg">
                      <RestartAlt sx={{ marginRight: 1 }} />
                      Reset
                    </Button> */}
                    <Button
                      className="mx-2"
                      variant="primary"
                      type="submit"
                      size="lg"
                    >
                      <Save sx={{ marginRight: 1 }} />
                      Submit
                    </Button>
                    <ToastContainer />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;