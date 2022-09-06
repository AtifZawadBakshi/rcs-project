import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { SystemUpdateAlt, CancelPresentation } from "@mui/icons-material";
import { categoryList, brandList } from "../demoData";
import divisionList from "../demoData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  URL,
  GET_DMS_CODE,
  UPDATE_DATA,
  GET_UPAZILA,
  GET_DISTRICT,
  GET_SUBCATEGORY,
  UPDATE_SUBMIT,
} from "../Axios/Api";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CencusData = () => {
  //STATE DICLARE
  const user_details = JSON.parse(localStorage.getItem("login_info"));
  const accessToken = user_details.access_token || null;
  const authAxios = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getDistrictDefault = async (district) => {
    await authAxios
      .post(URL + GET_DISTRICT, { id: district.Division_ID })
      .then((response) => setDistrictOptions(response.data.districtList));
  };
  const getUpazilaDefault = async (upazila) => {
    await authAxios
      .post(URL + GET_UPAZILA, {
        id: upazila.District_ID,
      })
      .then((response) => setUpazillaOptions(response.data.upazilaList));
  };

  const subcategoryDefaultOptionsFunction = async (products) => {
    products.map(
      async (product) =>
        await authAxios
          .post(URL + GET_SUBCATEGORY, {
            id: product.category,
          })
          .then((response) => {
            setSubcategoryDefaultOptions((subcategoryOptions) => [
              ...subcategoryOptions,
              response.data.subCategoryList,
            ]);
            setDefaultBrandList((brandLists) => [
              ...brandLists,
              response.data.brandList,
            ]);
          })
    );
  };

  const [defaultDivisonValue, setDefaultDivisonValue] = useState("");
  const [defaultDistrictValue, setDefaultDistrictValue] = useState("");
  const [defaultUpazilaValue, setDefaultUpazilaValue] = useState("");
  const [division, setDivision] = useState(0);
  const [district, setDistrict] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [upazila, setUpazila] = useState(0);
  const [upazillaOptions, setUpazillaOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [retail, setRetail] = useState("");
  const [retailType, setRetailType] = useState("");
  const [storeSize, setStoreSize] = useState("");
  const [felPartner, setFelPartner] = useState(false);
  const [dmsCode, setDmsCode] = useState("");
  const [defaultDmsCodeValue, setDefaultDmsCodeValue] = useState("");
  const [dmsCodeOptions, setDmsCodeOptions] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [csm, setCsm] = useState("");
  const [asm, setAsm] = useState("");
  const [tsm, settsm] = useState("");
  const [subcategoryDefaultOptions, setSubcategoryDefaultOptions] = useState(
    []
  );
  const [defaultBrandList, setDefaultBrandList] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  let { cencusID } = useParams();
  const navigate = useNavigate();
  const getDmsCodeList = async () => {
    const res = await authAxios
      .get(URL + GET_DMS_CODE)
      .then((response) => setDmsCodeOptions(response.data));
  };
  useEffect(() => {
    async function fetchData() {
      const res = await authAxios
        .get(URL + UPDATE_DATA + "/" + cencusID)
        .then((response) => {
          console.log(response.data);
          setDivision(response.data.division.Division_ID);
          setDistrict(response.data.district.District_ID);
          setUpazila(response.data.upazila.Upazila_ID);
          setDefaultDivisonValue(response.data.division);
          getDistrictDefault(response.data.division);
          setDefaultDistrictValue(response.data.district);
          getUpazilaDefault(response.data.district);
          setDefaultUpazilaValue(response.data.upazila);
          setCsm(response.data.csm_name);
          setAsm(response.data.asm_name);
          settsm(response.data.tsm_name);
          setLocation(response.data.location_details);
          setOwnerName(response.data.owner_name);
          setStoreSize(response.data.store_size);
          setOwnerNumber(response.data.owner_number);
          setFelPartner(response.data.fel_partner === "1" ? true : false);
          setDmsCode(response.data.dmscode);
          setDefaultDmsCodeValue({
            DMS_ID: response.data.dmscode,
            DMS_Code: response.data.dmscode,
          });
          setRetailType(response.data.retail_type);
          setRetail(response.data.retail_name);
          setProductDetails(response.data.enrolled_products);
          subcategoryDefaultOptionsFunction(response.data.enrolled_products);
          setLoading(true);
        });
    }
    getDmsCodeList();
    fetchData();
  }, []);

  const handleDivisionChange = (event, newValue) => {
    setDivision(newValue.Division_ID);
    setDefaultDistrictValue({ District_ID: 0, District_Name: "" });
    setDefaultUpazilaValue({ Upazila_ID: 0, Upazila_Name: "" });
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
    setDefaultUpazilaValue({ Upazila_ID: 0, Upazila_Name: "" });
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
    setUpazila(newValue.Upazila_ID);
  };
  const handleDmsCodeChange = (event, newValue) => {
    setDmsCode(newValue.DMS_ID);
  };
  const handleCategoryChange = (index, event) => {
    const values = [...productDetails];
    values[index]["category"] = event.target.value;
    values[index]["eco_plus_brand"] = 0;
    values[index]["gree_brand"] = 0;
    values[index]["hitachi_brand"] = 0;
    values[index]["jamuna_brand"] = 0;
    values[index]["lg_brand"] = 0;
    values[index]["midea_brand"] = 0;
    values[index]["miyako_brand"] = 0;
    values[index]["oth_bd_brand"] = 0;
    values[index]["oth_foreign_brand"] = 0;
    values[index]["samsumg_brand"] = 0;
    values[index]["sharp_brand"] = 0;
    values[index]["singer_brand"] = 0;
    values[index]["sony_brand"] = 0;
    values[index]["walton_brand"] = 0;
    values[index]["vision_brand"] = 0;
    setProductDetails(values);
    const getSubcategoryList = async () => {
      const res = await authAxios
        .post(URL + GET_SUBCATEGORY, {
          id: event.target.value,
        })
        .then((response) => {
          // const tempsub = [...subcategoryOptions];
          // tempsub[index] = response.data.subCategoryList;
          // setSubcategoryOptions(tempsub);
          const tempbrand = [...defaultBrandList];
          tempbrand[index] = response.data.brandList;
          setDefaultBrandList(tempbrand);

          const values = [...subcategoryDefaultOptions];
          values[index] = response.data.subCategoryList;
          setSubcategoryDefaultOptions(values);
        });
    };
    getSubcategoryList();
  };
  const handleSubcategoryChange = (index, event) => {
    const values = [...productDetails];
    values[index]["Sub_category"] = event.target.value;
    setProductDetails(values);
  };
  const handleChangeInput = (index, event) => {
    const values = [...productDetails];
    values[index][event.target.name] = event.target.value;
    setProductDetails(values);
  };
  const handleDiscardButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All your changes will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, discard changes!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };
  //   const handleRemoveButton = (index) => {
  //     const list = [...productDetails];
  //     list.splice(index, 1);
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setProductDetails(list);
  //         toast.success("Successfully Removed!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //     });
  //   };
  const handleSubmit = (event) => {
    event.preventDefault();
    let submittedData = {
      transID: cencusID,
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
      owner_number: ownerNumber,
      csm: csm,
      asm: asm,
      tsm: tsm,
      enrolled_products: productDetails,
    };
    console.log(submittedData);
    const submitData = async () => {
      await authAxios
        .patch(URL + UPDATE_SUBMIT, submittedData)
        .then((response) => console.log(response));
    };
    Swal.fire({
      title: "Do you want to submit the updated details?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        submitData();
        navigate(-1);
        toast.success("Successfully Updated!", {
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
        <h1 className="h3 mb-3">CENSUS DATA DETAILS</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              {subcategoryDefaultOptions.length !== 0 &&
                console.log(subcategoryDefaultOptions)}
              {loading && (
                <Form className="mx-6" onSubmit={handleSubmit}>
                  <div className="row mt-5">
                    <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                      <Form.Group className="mb-4">
                        <Form.Label>
                          <span style={{ fontWeight: "bold" }}>Division</span>
                        </Form.Label>
                        <Autocomplete
                          defaultValue={defaultDivisonValue}
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
                          defaultValue={defaultDistrictValue}
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
                          defaultValue={defaultUpazilaValue}
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
                          <span style={{ fontWeight: "bold" }}>
                            Retail Type
                          </span>
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
                    </div>
                    <div className="col-12	col-sm-12	col-md-6	col-lg-6	col-xl-4	col-xxl-4">
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label id="demo-simple-select-label">
                          <span style={{ fontWeight: "bold" }}>
                            FEL Partner
                          </span>
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
                              event.target.value === true && getDmsCodeList();
                              event.target.value === false && setDmsCode("");
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
                            defaultValue={defaultDmsCodeValue}
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
                          label="Enter owner contact number"
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
                  {console.log(productDetails)}
                  {productDetails.length !== 0 &&
                    productDetails.map((product, index) => (
                      <div key={product.ID}>
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
                                    defaultValue={product.category}
                                    onChange={(event) => {
                                      handleCategoryChange(index, event);
                                    }}
                                  >
                                    {categoryList.length !== 0 &&
                                      categoryList.map((option) => (
                                        <MenuItem
                                          key={option.category_Id}
                                          value={option.category_Id}
                                          name={option.category_name}
                                        >
                                          {option.category_name}
                                        </MenuItem>
                                      ))}
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
                                    defaultValue={product.Sub_category}
                                    onChange={(event) => {
                                      handleSubcategoryChange(index, event);
                                    }}
                                  >
                                    {subcategoryDefaultOptions.length !== 0 &&
                                      subcategoryDefaultOptions[index] &&
                                      subcategoryDefaultOptions[index].map(
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
                        </div>
                        {defaultBrandList.length !== 0 && (
                          <div className="row mt-3">
                            {defaultBrandList[index][0].isActive === "TRUE" && (
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
                                    name="samsumg_brand"
                                    className="mt-2"
                                    label="Enter amount"
                                    value={product.samsumg_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][1].isActive === "TRUE" && (
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
                                    value={product.sony_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}

                            {defaultBrandList[index][2].isActive === "TRUE" && (
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
                                    value={product.lg_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][8].isActive === "TRUE" && (
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
                                    value={product.hitachi_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][10].isActive ===
                              "TRUE" && (
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
                                    value={product.sharp_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][13].isActive ===
                              "TRUE" && (
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
                                    value={product.gree_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][14].isActive ===
                              "TRUE" && (
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
                                    value={product.midea_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][3].isActive === "TRUE" && (
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
                                    value={product.oth_foreign_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][4].isActive === "TRUE" && (
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
                                    value={product.walton_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][5].isActive === "TRUE" && (
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
                                    value={product.singer_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][6].isActive === "TRUE" && (
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
                                    value={product.vision_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}

                            {defaultBrandList[index][9].isActive === "TRUE" && (
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
                                    value={product.jamuna_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}

                            {defaultBrandList[index][11].isActive ===
                              "TRUE" && (
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
                                    value={product.eco_plus_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][12].isActive ===
                              "TRUE" && (
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
                                    value={product.miyako_brand}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                    }}
                                  />
                                </Form.Group>
                              </div>
                            )}
                            {defaultBrandList[index][7].isActive === "TRUE" && (
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
                                    value={product.oth_bd_brand}
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
                        variant="secondary"
                        size="lg"
                        onClick={handleDiscardButton}
                      >
                        <CancelPresentation sx={{ marginRight: 1 }} />
                        Discard
                      </Button>
                      <Button
                        className="mx-2"
                        variant="success"
                        type="submit"
                        size="lg"
                      >
                        <SystemUpdateAlt sx={{ marginRight: 1 }} />
                        Update
                      </Button>
                      <ToastContainer />
                    </div>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CencusData;
