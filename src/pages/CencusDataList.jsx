import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Edit, Visibility } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Modal from "react-bootstrap/Modal";
import { Card } from "@mui/material";
import { URL, FETCH_DATA } from "../Axios/Api";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
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
    label: "Upazila",
    align: "center",
  },
  {
    id: "retail",
    label: "Retail",
    align: "center",
  },
  {
    id: "enrolled-products",
    label: "Enrolled Products",
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
    console.log(event);
    setModalData(event);
    setModalShow(true);
  };
  const modalonClose = (event) => {
    setModalShow(false);
  };
  return (
    <main className="content m-0">
      <div className="container-fluid p-0 m-0">
        <h1 className="h3 mb-3" style={{ fontWeight: "bold" }}>
          Cencus Data List
        </h1>
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
                                    {data.enrolled_products.length}
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
                                      <Link
                                        to={`/cencus-datalist/${data.transId}`}
                                      >
                                        <Button variant="warning">
                                          <Edit />
                                          Edit
                                        </Button>
                                      </Link>
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

                            <div className="row d-flex justify-content-center align-items-center">
                              <div className="col-5">
                                <Table
                                  sx={{ textAlign: "center" }}
                                  responsive
                                  alignitems="center"
                                >
                                  <tbody>
                                    <tr>
                                      <th align="right">Division:</th>
                                      <td align="left">
                                        {modalData.division.Division_Name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">District:</th>
                                      <td align="left">
                                        {modalData.district.District_Name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Upazila:</th>
                                      <td align="left">
                                        {modalData.upazila.Upazila_Name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Location Details:</th>
                                      <td align="left">
                                        {modalData.location_details}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Retail Name:</th>
                                      <td align="left">
                                        {modalData.retail_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Retail Type:</th>
                                      <td align="left">
                                        {modalData.retail_type}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Date & Time:</th>
                                      <td align="left">
                                        {modalData.created_date +
                                          " " +
                                          modalData.created_time}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                              <div className="col-3">
                                <Table
                                  sx={{ textAlign: "center" }}
                                  responsive
                                  alignitems="center"
                                >
                                  <tbody>
                                    <tr>
                                      <th align="right">Store Size:</th>
                                      <td align="left">
                                        {modalData.store_size} sqft
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">FEL Partner:</th>
                                      <td align="left">
                                        {modalData.fel_partner === "1"
                                          ? "Yes"
                                          : "No"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Owner:</th>
                                      <td align="left">
                                        {modalData.owner_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Number:</th>
                                      <td align="left">
                                        {modalData.owner_number}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">CSM Name:</th>
                                      <td align="left">{modalData.csm_name}</td>
                                    </tr>
                                    <tr>
                                      <th align="right">ASM Name:</th>
                                      <td align="left">{modalData.asm_name}</td>
                                    </tr>
                                    <tr>
                                      <th align="right">TSM Name:</th>
                                      <td align="left">{modalData.tsm_name}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
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
                                      <Table
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
                                      </Table>
                                      <Table
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
                                            <th align="center">Brand Name</th>
                                            <th align="left">Quantity</th>
                                            <th align="center">Brand Name</th>
                                            <th align="left">Quantity</th>
                                          </tr>
                                          <tr>
                                            <td align="center">SAMSUNG</td>
                                            <td align="center">
                                              {product.samsumg_brand}
                                            </td>
                                            <td align="center">SONY</td>
                                            <td align="center">
                                              {product.sony_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">LG</td>
                                            <td align="center">
                                              {product.lg_brand}
                                            </td>
                                            <td align="center">
                                              OTH - FOREIGN
                                            </td>
                                            <td align="center">
                                              {product.oth_foreign_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">WALTON</td>
                                            <td align="center">
                                              {product.walton_brand}
                                            </td>
                                            <td align="center">SINGER</td>
                                            <td align="center">
                                              {product.singer_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">MIDEA</td>
                                            <td align="center">
                                              {product.midea_brand}
                                            </td>
                                            <td align="center">VISION</td>
                                            <td align="center">
                                              {product.vision_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">OTH-BD</td>
                                            <td align="center">
                                              {product.oth_bd_brand}
                                            </td>
                                            <td align="center">HITACHI</td>
                                            <td align="center">
                                              {product.hitachi_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">JAMUNA</td>
                                            <td align="center">
                                              {product.jamuna_brand}
                                            </td>
                                            <td align="center">SHARP</td>
                                            <td align="center">
                                              {product.sharp_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">ECO PLUS</td>
                                            <td align="center">
                                              {product.eco_plus_brand}
                                            </td>
                                            <td align="center">MIYAKO</td>
                                            <td align="center">
                                              {product.miyako_brand}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">GREE</td>
                                            <td align="center">
                                              {product.gree_brand}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
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
