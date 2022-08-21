import React from "react";
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

const submittedData = [
  {
    id: 1,
    date_time: "23 August 2023 04:00PM",
    division_name: "Chiitagong",
    district_name: "Chiitagong",
    upazilla_name: "Cox's Bazar",
    location_details: "12/B ABC, BD Street",
    retail_name: "SAMSUNG Bangladesh",
    retail_type: "Premium",
    store_size: "2000 sqft",
    fel_partner: true,
    owner_name: "Atif Zawad Bakshi",
    owner_number: "01721624775",
    csm_name: "ABC NSKJSO SLKSP",
    asm_name: "PWIW SOSPMWS SKSP",
    tsm_name: "SKSIS SJSOS BSSI",
    enrolled_products_details: [
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
    ],
  },
  {
    id: 2,
    date_time: "24 August 2023 04:00PM",
    division_name: "Chiitagong",
    district_name: "Chiitagong",
    upazilla_name: "Cox's Bazar",
    location_details: "12/B ABC, BD Street",
    retail_name: "SAMSUNG Bangladesh",
    retail_type: "Premium",
    store_size: "2000 sqft",
    fel_partner: true,
    owner_name: "Atif Zawad Bakshi",
    owner_number: "01721624775",
    csm_name: "ABC NSKJSO SLKSP",
    asm_name: "PWIW SOSPMWS SKSP",
    tsm_name: "SKSIS SJSOS BSSI",
    enrolled_products_details: [
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
    ],
  },
  {
    id: 3,
    date_time: "25 August 2023 04:00PM",
    division_name: "Chiitagong",
    district_name: "Chiitagong",
    upazilla_name: "Cox's Bazar",
    location_details: "12/B ABC, BD Street",
    retail_name: "SAMSUNG Bangladesh",
    retail_type: "Premium",
    store_size: "2000 sqft",
    fel_partner: true,
    owner_name: "Atif Zawad Bakshi",
    owner_number: "01721624775",
    csm_name: "ABC NSKJSO SLKSP",
    asm_name: "PWIW SOSPMWS SKSP",
    tsm_name: "SKSIS SJSOS BSSI",
    enrolled_products_details: [
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
    ],
  },
  {
    id: 4,
    date_time: "26 August 2023 04:00PM",
    division_name: "Chiitagong",
    district_name: "Chiitagong",
    upazilla_name: "Cox's Bazar",
    location_details: "12/B ABC, BD Street",
    retail_name: "SAMSUNG Bangladesh",
    retail_type: "Premium",
    store_size: "2000 sqft",
    fel_partner: true,
    owner_name: "Atif Zawad Bakshi",
    owner_number: "01721624775",
    csm_name: "ABC NSKJSO SLKSP",
    asm_name: "PWIW SOSPMWS SKSP",
    tsm_name: "SKSIS SJSOS BSSI",
    enrolled_products_details: [
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
      {
        category_name: "TV Category",
        subcategory_name: "FHD",
        samsung_qnty: 0,
        sony_qnty: 0,
        lg_qnty: 0,
        oth_foreign_qnty: 0,
        walton_qnty: 0,
        singer_qnty: 0,
        vision_qnty: 0,
        oth_bd_qnty: 0,
        hitachi_qnty: 0,
        jamuna_qnty: 0,
        sharp_qnty: 0,
        eco_plus_qnty: 0,
        miyako_qnty: 0,
        gree_qnty: 0,
        midea_qnty: 0,
      },
    ],
  },
];

const CencusDataList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const modalonClick = async (event) => {
    console.log(event);
    await setModalData(event);
    setModalShow(true);
  };
  const modalonClose = (event) => {
    setModalShow(false);
  };
  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">Cencus Data List Page</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ height: 600 }}>
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
                        {submittedData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((data, id) => {
                            return (
                              <TableRow hover key={data.id}>
                                <TableCell>{data.date_time}</TableCell>
                                <TableCell align="center">
                                  {data.division_name}
                                </TableCell>
                                <TableCell align="center">
                                  {data.district_name}
                                </TableCell>
                                <TableCell align="center">
                                  {data.upazilla_name}
                                </TableCell>
                                <TableCell align="center">
                                  {data.retail_name}
                                </TableCell>
                                <TableCell align="center">
                                  {data.enrolled_products_details.length}
                                </TableCell>
                                <TableCell align="center">
                                  <div className="d-flex justify-content-around align-content-center">
                                    <Button
                                      variant="scondary"
                                      sx={{ ":hover": { border: "6px solid" } }}
                                      onClick={() => modalonClick(data)}
                                    >
                                      <Visibility />
                                      Show
                                    </Button>

                                    <Button variant="warning">
                                      <Edit />
                                      Edit
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                                        {modalData.division_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">District:</th>
                                      <td align="left">
                                        {modalData.district_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">Upazila:</th>
                                      <td align="left">
                                        {modalData.upazilla_name}
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
                                        {modalData.date_time}
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
                                        {modalData.store_size}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th align="right">FEL Partner:</th>
                                      <td align="left">
                                        {modalData.fel_partner ? "Yes" : "No"}
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
                              {modalData.enrolled_products_details.map(
                                (product, index) => (
                                  <div className="col-6 my-1" key={index}>
                                    <Card>
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
                                              {product.category_name}
                                            </td>
                                            <th align="right">SUBCATEGORY:</th>
                                            <td align="left">
                                              {product.subcategory_name}
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
                                              {product.samsung_qnty}
                                            </td>
                                            <td align="center">SONY</td>
                                            <td align="center">
                                              {product.sony_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">LG</td>
                                            <td align="center">
                                              {product.lg_qnty}
                                            </td>
                                            <td align="center">
                                              OTH - FOREIGN
                                            </td>
                                            <td align="center">
                                              {product.oth_foreign_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">WALTON</td>
                                            <td align="center">
                                              {product.walton_qnty}
                                            </td>
                                            <td align="center">SINGER</td>
                                            <td align="center">
                                              {product.singer_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">MIDEA</td>
                                            <td align="center">
                                              {product.midea_qnty}
                                            </td>
                                            <td align="center">VISION</td>
                                            <td align="center">
                                              {product.vision_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">OTH-BD</td>
                                            <td align="center">
                                              {product.oth_bd_qnty}
                                            </td>
                                            <td align="center">HITACHI</td>
                                            <td align="center">
                                              {product.hitachi_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">JAMUNA</td>
                                            <td align="center">
                                              {product.jamuna_qnty}
                                            </td>
                                            <td align="center">SHARP</td>
                                            <td align="center">
                                              {product.sharp_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">ECO PLUS</td>
                                            <td align="center">
                                              {product.eco_plus_qnty}
                                            </td>
                                            <td align="center">MIYAKO</td>
                                            <td align="center">
                                              {product.miyako_qnty}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">GREE</td>
                                            <td align="center">
                                              {product.gree_qnty}
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
                    rowsPerPageOptions={[10, 15, 20]}
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
