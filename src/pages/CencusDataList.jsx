import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Table as TableA } from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Download, Edit, Visibility } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Modal from "react-bootstrap/Modal";
import { Card } from "@mui/material";
import { URL, FETCH_DATA, EXCEL_DATA } from "../Axios/Api";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { XLSX } from "xlsx";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const columns = [
  { id: "time-date", label: "Date & Time" },
  { id: "division", label: "Division", align: "center" },
  {
    id: "district",
    label: "District",
    align: "center",
  },
  {
    id: "upazila",
    label: "Upazila/Metro/Town",
    align: "center",
  },
  {
    id: "retail",
    label: "Retail",
    align: "center",
  },

  {
    id: "actions",
    label: "Actions",
    align: "center",
  },
];

const CencusDataList = () => {
  const user_details = JSON.parse(localStorage.getItem("login_info"));
  const accessToken = user_details.access_token || null;
  const authAxios = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalExcelShow, setModalExcelShow] = React.useState(false);
  const [modalExccelData, setModalExcelData] = React.useState([]);
  const modalonExcelClick = async () => {
    async function fetchData() {
      const res = await authAxios.get(URL + EXCEL_DATA).then((response) => {
        console.log(response);
        setModalExcelData(response.data);
      });
    }
    fetchData();
    setModalExcelShow(true);
  };
  const modalonExcelClose = (event) => {
    setModalExcelShow(false);
  };
  const modalonExcelProceed = () => {
    var XLSX = require("xlsx");
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(modalExccelData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "RCSDataSheet.xlsx");
  };
  useEffect(() => {
    async function fetchData() {
      const res = await authAxios.get(URL + FETCH_DATA).then((response) => {
        setSubmittedData(response.data);
        setLoading(true);
      });
    }
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const modalonClick = async (event) => {
    setModalData(event);
    setModalShow(true);
  };
  const modalonClose = (event) => {
    setModalShow(false);
  };
  return (
    <main className="content m-0">
      <div className="container-fluid p-0 m-0">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-3" style={{ fontWeight: "bold" }}>
            Cencus Data List
          </h1>

          <button className="btn btn-success mb-3" onClick={modalonExcelClick}>
            <Download />
            Export to Excel
          </button>
        </div>
        <Modal
          show={modalExcelShow}
          onHide={modalonExcelClose}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Button variant="success" onClick={modalonExcelProceed}>
              <Download /> Proceed Download
            </Button>
          </Modal.Header>
          <Modal.Body>
            <TableA
              sx={{ textAlign: "center" }}
              responsive
              alignitems="center"
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th align="center">SL No.</th>
                  <th align="center">Date</th>
                  <th align="center">Entry Time</th>
                  <th align="center">Name</th>
                  <th align="center">Login Code</th>
                  <th align="center">CSM Name</th>
                  <th align="center">ASM Name</th>
                  <th align="center">TSM Name</th>
                  <th align="center">Division Name</th>
                  <th align="center">District Name</th>
                  <th align="center">Upazila/Metro/Town Name</th>
                  <th align="center">Location Details</th>
                  <th align="center">Retail Name</th>
                  <th align="center">Retail Type</th>
                  <th align="center">Store Size</th>
                  <th align="center">Fel Partner </th>
                  <th align="center">DMS Code</th>
                  <th align="center">Owner Name</th>
                  <th align="center">Owner Number</th>
                  <th align="center">Category Name</th>
                  <th align="center">Subcategory Name</th>
                  <th align="center">Samsung QNTY</th>
                  <th align="center">Sony QNTY</th>
                  <th align="center">LG QNTY</th>
                  <th align="center">OTH Foreign QNTY</th>
                  <th align="center">Walton QNTY</th>
                  <th align="center">Singer QNTY</th>
                  <th align="center">Sharp QNTY</th>
                  <th align="center">Vision QNTY</th>
                  <th align="center">Eco Plus QNTY</th>
                  <th align="center">Miyako QNTY</th>
                  <th align="center">Gree QNTY</th>
                  <th align="center">Midea QNTY</th>
                  <th align="center">OTH BD Foreign QNTY</th>
                  <th align="center">Hitachi QNTY</th>
                  <th align="center">Jamuna QNTY</th>
                </tr>
              </thead>
              <tbody>
                {modalExccelData &&
                  modalExccelData.map((data, index) => (
                    <tr key={index}>
                      <td align="center">{index + 1}</td>
                      <td align="center">{data.Date}</td>
                      <td align="center">{data.Entry_Time}</td>
                      <td align="center">{data.Name}</td>
                      <td align="center">{data.Login_Code}</td>
                      <td align="center">{data.CSM}</td>
                      <td align="center">{data.ASM}</td>
                      <td align="center">{data.TSM}</td>
                      <td align="center">{data.Division_Name}</td>
                      <td align="center">{data.District_Name}</td>
                      <td align="center">{data.Upazila_Name}</td>
                      <td align="center">{data.City_Town_Village}</td>
                      <td align="center">{data.Retail_Name}</td>
                      <td align="center">{data.Retail_Type}</td>
                      <td align="center">{data.Store_Size}</td>
                      <td align="center">{data.Fel_Partner}</td>
                      <td align="center">{data.DMS_Code}</td>
                      <td align="center">{data.Owner_Name}</td>
                      <td align="center">{data.Owner_Mobile}</td>
                      <td align="center">{data.Category_Name}</td>
                      <td align="center">{data.Sub_Category_Name}</td>
                      <td align="center">{data.SAMSUNG_Brand}</td>
                      <td align="center">{data.SONY_Brand}</td>
                      <td align="center">{data.LG_Brand}</td>
                      <td align="center">{data.OTH_FOREIGN_Brand}</td>
                      <td align="center">{data.WALTON_Brand}</td>
                      <td align="center">{data.SINGER_Brand}</td>
                      <td align="center">{data.SHARP_Brand}</td>
                      <td align="center">{data.VISION_Brand}</td>
                      <td align="center">{data.ECO_PLUS_Brand}</td>
                      <td align="center">{data.MIYAKO_Brand}</td>
                      <td align="center">{data.GREE_Brand}</td>
                      <td align="center">{data.MIDEA_Brand}</td>
                      <td align="center">{data.OTH_FOREIGN_Brand}</td>
                      <td align="center">{data.HITACHI}</td>
                      <td align="center">{data.JAMUNA}</td>
                    </tr>
                  ))}
              </tbody>
            </TableA>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={modalonExcelProceed}>
              <Download /> Proceed Download
            </Button>
            <Button onClick={modalonExcelClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ height: 570 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.label}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading &&
                          submittedData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((data, id) => {
                              return (
                                <TableRow hover key={data.transId}>
                                  <TableCell>
                                    {data.created_date +
                                      " " +
                                      data.created_time}
                                  </TableCell>
                                  <TableCell align="center">
                                    {data.division.Division_Name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {data.district.District_Name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {data.upazila.Upazila_Name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {data.retail_name}
                                  </TableCell>

                                  <TableCell align="center">
                                    <div className="d-flex justify-content-around align-content-center">
                                      <Button
                                        variant="scondary"
                                        sx={{
                                          ":hover": { border: "6px solid" },
                                        }}
                                        onClick={() => modalonClick(data)}
                                      >
                                        <Visibility />
                                        Show
                                      </Button>
                                      {user_details.isAdmin === false && (
                                        <Link
                                          to={`/cencus-datalist/${data.transId}`}
                                        >
                                          <Button variant="warning">
                                            <Edit />
                                            Edit
                                          </Button>
                                        </Link>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        <Outlet />
                      </TableBody>
                      {modalShow && (
                        <Modal
                          show={modalShow}
                          onHide={modalonClose}
                          size="xl"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Enrolled Data Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row my-2">
                              <h5 className="text-center">
                                Personoal Information
                              </h5>
                            </div>

                            <div className="container row d-flex justify-content-around align-items-center">
                              <div className="col">
                                <TableA sx={{ textAlign: "center" }} responsive>
                                  <tbody>
                                    <tr>
                                      <th>Division:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.division.Division_Name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>District:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.district.District_Name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Upazila/Metro/Town:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.upazila.Upazila_Name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Location Details:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.location_details}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Retail Name:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.retail_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Retail Type:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.retail_type}
                                      </td>
                                    </tr>
                                  </tbody>
                                </TableA>
                              </div>
                              <div className="col">
                                <TableA sx={{ textAlign: "center" }} responsive>
                                  <tbody>
                                    <tr>
                                      <th>Date & Time:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.created_date +
                                          " " +
                                          modalData.created_time}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Store Size:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.store_size}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>FEL Partner:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.fel_partner === "1"
                                          ? "Yes"
                                          : "No"}
                                      </td>
                                    </tr>
                                    {modalData.fel_partner === "1" && (
                                      <tr>
                                        <th>DMS Code:</th>
                                        <td style={{ textAlign: "left" }}>
                                          {modalData.dmscode}
                                        </td>
                                      </tr>
                                    )}
                                    <tr>
                                      <th>Owner:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.owner_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Number:</th>
                                      <td style={{ textAlign: "left" }}>
                                        {modalData.owner_number}
                                      </td>
                                    </tr>
                                  </tbody>
                                </TableA>
                              </div>
                            </div>
                            <div className="row my-2">
                              <TableA
                                responsive
                                striped
                                bordered
                                hover
                                size="sm"
                                sx={{ textAlign: "center" }}
                                alignitems="center"
                              >
                                <tbody>
                                  <tr>
                                    <th>CSM Name:</th>
                                    <td>{modalData.csm_name}</td>
                                    <th>ASM Name:</th>
                                    <td>{modalData.asm_name}</td>
                                    <th>TSM Name:</th>
                                    <td>{modalData.tsm_name}</td>
                                  </tr>
                                </tbody>
                              </TableA>
                            </div>
                            <div className="row my-2">
                              <h6 className="text-center">
                                Products Information
                              </h6>
                            </div>
                            <div className="row d-flex justify-content-around align-items-center">
                              {modalData.enrolled_products.map(
                                (product, index) => (
                                  <div className="col-6 my-1" key={index}>
                                    <Card
                                      sx={{
                                        boxShadow: "0.01rem 0 0.5rem #000",
                                      }}
                                    >
                                      <TableA
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        sx={{
                                          textAlign: "center",

                                          marginTop: 2,
                                        }}
                                        responsive
                                        alignitems="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <th align="right">CATEGORY:</th>
                                            <td align="left">
                                              {product.category.category_name}
                                            </td>
                                            <th align="right">SUBCATEGORY:</th>
                                            <td align="left">
                                              {
                                                product.Sub_category
                                                  .sub_cat_name
                                              }
                                            </td>
                                          </tr>
                                        </tbody>
                                      </TableA>
                                      <TableA
                                        sx={{
                                          textAlign: "center",
                                          marginTop: 2,
                                          marginBottom: 2,
                                        }}
                                        responsive
                                        alignitems="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <th>Brand Name</th>
                                            <th>Quantity</th>
                                            <th>Brand Name</th>
                                            <th>Quantity</th>
                                          </tr>
                                          <tr>
                                            <td>SAMSUNG</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.samsumg_brand}
                                            </td>
                                            <td>SONY</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.sony_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>LG</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.lg_brand}
                                            </td>
                                            <td>OTH - FOREIGN</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.oth_foreign_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>WALTON</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.walton_brand}
                                            </td>
                                            <td>SINGER</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.singer_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>MIDEA</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.midea_brand}
                                            </td>
                                            <td>VISION</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.vision_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>OTH-BD</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.oth_bd_brand}
                                            </td>
                                            <td>HITACHI</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.hitachi_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>JAMUNA</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.jamuna_brand}
                                            </td>
                                            <td>SHARP</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.sharp_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>ECO PLUS</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.eco_plus_brand}
                                            </td>
                                            <td>MIYAKO</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.miyako_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>GREE</td>
                                            <td style={{ textAlign: "center" }}>
                                              {product.gree_brand}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </TableA>
                                    </Card>
                                  </div>
                                )
                              )}
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={modalonClose}>Close</Button>
                          </Modal.Footer>
                        </Modal>
                      )}
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[7, 10, 15, 20]}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      alignitems: "center",
                    }}
                    count={submittedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CencusDataList;
