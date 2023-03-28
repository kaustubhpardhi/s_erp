import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { yellow } from "@mui/material/colors";
import pdfPhoto from "../images/nirareceipt.png";
import bob from "../images/BOB_CMYK_complogo-01.webp";
import qr from "../images/nira-deosthan-qr.png";
import moment from "moment";

const getPageMargins = () => {
  const pageStyle = `
  @page {
    size: auto;  
    margin: 0mm;
   marks: crop cross;
  // margin: 20px;
     margin-left: 8px;
   margin-top:8px;
  
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    title {
      display: none;
    }
    .pagebreak {
      page-break-before: always;
    }
    .pdfBody{
        height: 5.5in;
        width: 4in;
        padding: 12px !important;
    }
    .pdfBody h5{
        font-size: 12px !important;
    }
    .printFlex{
        display: flex;
    }
    .printFlex > div{
        width: 50%;
    }
    .printFlex img{
        width:  1.8in;
        height: 1in;
    }

    .pdfTable {
        font-size: 10px !important;
    }
    .pdfBottom{
        display: flex
    }
    .pdfBottomFirst{
        width: 66%;
        font-size: 10px !important;
    }
    .pdfBottomImg{
        width: 1in !important;
    }
    .pdfAmount{
        font-size: 14px ! important;
    }
  }
`;
  return pageStyle;
};

class PdfBody extends React.Component {
  render() {
    const { information, forwardRef } = this.props;
    console.log(information);
    return (
      <div>
        <style>{getPageMargins()}</style>
        <Box
          ref={forwardRef}
          className="pdfBody"
          sx={{
            py: 4,
            px: 4,
            background: yellow[100],
            border: "1px solid black",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#8c2d29",
              fontWeight: "700",
              textAlign: "center",
              my: 0,
            }}
            gutterBottom
          >
            श्री लक्ष्मी नृसिंह देवस्थान ट्रस्ट नीरा नरसिंहपुर{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#8c2d29",
              fontWeight: "400",
              textAlign: "center",
              my: 5,
              mt: 0,
            }}
            gutterBottom
          >
            (पब्लिक ट्रस्ट र. नं. ए. / ५८ पुणे) PAN No. :AAATS6138B Phone No.
            +91 9665882895
          </Typography>
          <Box
            className="printFlex"
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "repeat(2, 1fr)" },
              gap: 3,
            }}
          >
            {/* heading */}
            <div>
              <img src={pdfPhoto} alt="GodImage" className="pdfGodImage" />
              <Typography
                className="pdfAmount"
                sx={{ fontSize: "24px", textAlign: "center" }}
              >
                {" "}
                <b>Amount : </b> &#x20B9; {information?.amount}{" "}
              </Typography>
            </div>
            <div>
              {/* body */}
              <table style={{ textAlign: "left" }} className="pdfTable">
                <tbody>
                  <tr>
                    <th> Receipt No </th>
                    <td> : {information?.pawti} </td>
                  </tr>
                  <tr>
                    <th>Receipt Date </th>
                    <td>
                      {" "}
                      : {information.receiptDate
                        ? information.receiptDate
                        : ""}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th> Name </th>
                    <td> : {information?.name} </td>
                  </tr>
                  <tr>
                    <th> Gotra </th>
                    <td> : {information?.gotra} </td>
                  </tr>
                  <tr>
                    <th> Date </th>
                    <td>
                      {" "}
                      :{" "}
                      {information.poojaDate
                        ? moment(information.poojaDate).format("DD-MM-yyyy")
                        : ""}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th> State </th>
                    <td> : {information?.state} </td>
                  </tr>
                  <tr>
                    <th> Mobile </th>
                    <td> : {information?.mobile} </td>
                  </tr>
                  <tr>
                    <th> Email </th>
                    <td> : {information?.email} </td>
                  </tr>
                  <tr>
                    <th>PAN </th>
                    <td> : {information?.uid} </td>
                  </tr>
                  {/* <tr>
                    <th> Aadhar </th>
                    <td> : {information?.aadhar} </td>
                  </tr> */}
                  <tr>
                    <th> Purpose </th>
                    <td> : {information?.forWhich} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>

          {/* footer */}
          <Box
            className="pdfBottom"
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "2fr 1fr" },
              gap: 1,
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <Box sx={{ textAlign: "center" }} className="pdfBottomFirst">
              <div>
                {" "}
                ट्रस्ट को दान आयकर अधिनियम की धारा 80 जी के तहत छूट प्राप्त है
                AAATS6138BF1974201{" "}
              </div>
              <div> नीरा नरसिंहपुर, इंदापुर तालुका, महाराष्ट्र 413211</div>
            </Box>
            <Box sx={{ display: "flex" }} className="pdfBottomSecond">
              <Box sx={{ marginLeft: "auto" }}>
                <img
                  className="pdfBottomImg"
                  src={bob}
                  style={{
                    maxWidth: "120px",
                    display: "block",
                    marginLeft: "auto",
                    marginBottom: "16px",
                  }}
                  alt=""
                />
                <img
                  className="pdfBottomImg"
                  src={qr}
                  style={{ width: "120px", display: "block" }}
                  alt=""
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}

export default PdfBody;
