import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Save, AddCircle, Delete } from "@mui/icons-material";
import { brandList } from "../demoData";
import divisionList from "../demoData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import Swal from "sweetalert2";
import {
  URL,
  GET_DMS_CODE,
  GET_DISTRICT,
  GET_UPAZILA,
  GET_SUBCATEGORY,
  SUBMIT_DATA,
} from "../Axios/Api";
import axios from "axios";
const Dashboard = () => {
  //STATE DICLARE
  const user_details = JSON.parse(localStorage.getItem("login_info"));
  const accessToken = user_details.access_token || null;

  const authAxios = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const [division, setDivision] = useState(0);
  const [districtValue, setDistrictValue] = useState(0);
  const [district, setDistrict] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [upazila, setUpazilla] = useState(0);
  const [upazillaOptions, setUpazillaOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [retail, setRetail] = useState("");
  const [retailType, setRetailType] = useState("");
  const [storeSize, setStoreSize] = useState("");
  const [dmsCode, setDmsCode] = useState("");
  const [dmsCodeOptions, setDmsCodeOptions] = useState([]);
  const [felPartner, setFelPartner] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [csm, setCsm] = useState(user_details.userInfo.CSM_Name);
  const [asm, setAsm] = useState(user_details.userInfo.ASM_Name);
  const [tsm, settsm] = useState(user_details.userInfo.TSM_Name);
  const [subcategoryOptions, setSubcategoryOptions] = useState([[]]);
  const [brandStatusList, setBrandStatusList] = useState([[]]);
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
    setDivision(newValue.Division_ID);
    setUpazillaOptions([]);
    const getDistrictList = async () => {
      const res = await authAxios
        .post(URL + GET_DISTRICT, {
          id: newValue.Division_ID,
        })
        .then((response) => setDistrictOptions(response.data.districtList));
    };

    getDistrictList();
  };
  const handleDistrictChange = (event, newValue) => {
    setDistrict(newValue.District_ID);
    const getUpazila = async () => {
      const res = await authAxios
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

  const handleDmsCodeChange = (event, newValue) => {
    setDmsCode(newValue.DMS_ID);
  };
  const handleCategoryChange = (index, event) => {
    const values = [...productDetails];
    let categoryid = event.target.value;
    values[index]["category_id"] = event.target.value;
    setProductDetails(values);

    const getSubcategoryList = async () => {
      const res = await authAxios
        .post(URL + GET_SUBCATEGORY, {
          id: categoryid,
        })
        .then((response) => {
          const tempsub = [...subcategoryOptions];
          tempsub[index] = response.data.subCategoryList;
          setSubcategoryOptions(tempsub);
          const tempbrand = [...brandStatusList];
          tempbrand[index] = response.data.brandList;
          setBrandStatusList(tempbrand);
        });
    };
    getSubcategoryList();
  };
  const handleSubcategoryChange = (index, event) => {
    const values = [...productDetails];
    values[index]["subcategory_id"] = event.target.value;
    setProductDetails(values);
  };
  const handleChangeInput = (index, event) => {
    const values = [...productDetails];
    values[index][event.target.name]["qnty"] = event.target.value;
    setProductDetails(values);
  };
  const handleAddButton = () => {
    setSubcategoryOptions([...subcategoryOptions, []]);
    setBrandStatusList([...brandStatusList, []]);
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
  };
  const handleRemoveButton = (index) => {
    const productlist = [...productDetails];
    productlist.splice(index, 1);
    const subcategorylist = [...subcategoryOptions];
    subcategorylist.splice(index, 1);
    const brandlist = [...brandStatusList];
    brandlist.splice(index, 1);
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
        setProductDetails(productlist);
        setSubcategoryOptions(subcategorylist);
        setBrandStatusList(brandlist);
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
    let phn = "01" + ownerNumber;
    let submittedData = {
      district: district,
      division: division,
      upazila: upazila,
      location: location,
      retail: retail,
      retail_type: retailType,
      store_size: storeSize,
      fel_partner: felPartner,
      dms_code: dmsCode,
      owner_name: ownerName,
      owner_number: phn,
      csm: csm,
      asm: asm,
      tsm: tsm,
      products: productDetails,
    };
    console.log(submittedData);
    const submitData = async () => {
      await authAxios
        .post(URL + SUBMIT_DATA, submittedData)
        .then((response) => {
          response.data === "Successful" && window.location.reload(false);
        });
    };

    Swal.fire({
      title: "Do you want to submit the details?",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        submitData();
        setProductDetails([]);
        toast.success("Successfully Submitted!", {
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

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3" style={{ fontWeight: "bold" }}>
          RCS
        </h1>
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
                        className="mt-2"
                        onChange={handleDivisionChange}
                        disablePortal
                        options={divisionList}
                        getOptionLabel={(option) => option.Division_Name}
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
                        key={districtOptions}
                        disabled={false}
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
                        <span style={{ fontWeight: "bold" }}>
                          Upazila/Metro/Town
                        </span>
                      </Form.Label>
                      <Autocomplete
                        key={upazillaOptions}
                        disabled={false}
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
                        <span style={{ fontWeight: "bold" }}>Address</span>
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
                      <Form.Label id="demo-simple-select-label">
                        <span style={{ fontWeight: "bold" }}>Retail Type</span>
                      </Form.Label>

                      <FormControl className="mt-2" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose retail type
                        </InputLabel>
                        <Select
                          required={true}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Choose retail type"
                          value={retailType}
                          onChange={(e) => setRetailType(e.target.value)}
                        >
                          <MenuItem value="Brand Shop">Brand Shop</MenuItem>
                          <MenuItem value="MBO">MBO</MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                    {/* <Form.Group
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
                    </Form.Group> */}
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label id="demo-simple-select-label">
                        <span style={{ fontWeight: "bold" }}>
                          Store Size (SQFT)
                        </span>
                      </Form.Label>

                      <FormControl className="mt-2" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose store size
                        </InputLabel>
                        <Select
                          required={true}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Choose store size"
                          value={storeSize}
                          onChange={(event) => {
                            setStoreSize(event.target.value);
                          }}
                        >
                          <MenuItem value="< 1000 sq ft">
                            {"<"} 1000 sq ft
                          </MenuItem>
                          <MenuItem value="1000-2000 sq ft">
                            1000-2000 sq ft
                          </MenuItem>
                          <MenuItem value="2000-3500 sq ft">
                            2000-3500 sq ft
                          </MenuItem>
                          <MenuItem value="> 3500sq sq ft">
                            {">"} 3500 sq ft
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                    {/* <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        <span style={{ fontWeight: "bold" }}>Store Size</span>
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
                    </Form.Group> */}
                  </div>
                  <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label id="demo-simple-select-label">
                        <span style={{ fontWeight: "bold" }}> FEL Partner</span>
                      </Form.Label>

                      <FormControl className="mt-2" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          FEL Partner Status
                        </InputLabel>
                        <Select
                          required={true}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="FEL Partner Status"
                          value={felPartner}
                          onChange={(event) => {
                            setFelPartner(event.target.value);
                            const getDmsCodeList = async () => {
                              const res = await authAxios
                                .get(URL + GET_DMS_CODE)
                                .then((response) =>
                                  setDmsCodeOptions(response.data)
                                );
                            };

                            event.target.value === true && getDmsCodeList();
                          }}
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                  </div>
                  {felPartner ? (
                    <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          <span style={{ fontWeight: "bold" }}>DMS Code</span>
                        </Form.Label>
                        <Autocomplete
                          disabled={false}
                          className="mt-2"
                          onChange={handleDmsCodeChange}
                          disablePortal
                          options={dmsCodeOptions}
                          getOptionLabel={(option) => option.DMS_Code}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose DMS code"
                              required={true}
                            />
                          )}
                        />
                      </Form.Group>
                      {/* <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label id="demo-simple-select-label">
                          <span style={{ fontWeight: "bold" }}>DMS Code</span>
                        </Form.Label>

                        <TextField
                          required={true}
                          fullWidth
                          className="mt-2"
                          label="Enter DMS code"
                          value={dmsCode}
                          onChange={(e) => setDmsCode(e.target.value)}
                        />
                      </Form.Group> */}
                    </div>
                  ) : (
                    <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4"></div>
                  )}
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
                        <span style={{ fontWeight: "bold" }}>
                          Owner Contact Number
                        </span>
                      </Form.Label>
                      <TextField
                        required={true}
                        fullWidth
                        className="mt-2"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">01</InputAdornment>
                          ),
                        }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 9);
                        }}
                        label="Enter contact number"
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
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
                                fontSize: "15px",
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
                      <div className="col-12	col-sm-12	col-md-6	col-lg-5	col-xl-6	col-xxl-6 ">
                        <div className=" row d-flex justify-content-between align-items-center">
                          <Form.Label className="col-4">
                            <span
                              style={{
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              Select Subcategory:
                            </span>
                          </Form.Label>
                          <Form.Group
                            className="col-8 mb-4"
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
                                {subcategoryOptions[index].length === 0 ? (
                                  <MenuItem value="">
                                    <em>No options</em>
                                  </MenuItem>
                                ) : (
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                )}

                                {subcategoryOptions[index].map(
                                  (option, index) => (
                                    <MenuItem
                                      key={option.Sub_Cat_ID}
                                      value={option.Sub_Cat_ID}
                                      name={option.Sub_Cat_Name}
                                    >
                                      {option.Sub_Category_Name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Form.Group>
                        </div>
                      </div>
                      {productDetails.length > 1 &&
                      productDetails.length - 1 === index ? (
                        <div className="col-12	col-sm-12	col-md-1	col-lg-1	col-xl-1	col-xxl-1 ">
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

                    {brandStatusList[index].length !== 0 && (
                      <div className="row mt-3">
                        {brandStatusList[index][0].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][1].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][2].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][3].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][4].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][5].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][6].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][7].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][8].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][9].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][10].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][11].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][12].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][13].isActive === "TRUE" && (
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
                        )}
                        {brandStatusList[index][14].isActive === "TRUE" && (
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
                        )}
                      </div>
                    )}
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
