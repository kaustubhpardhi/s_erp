import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BillingFormInput from "../Components/BillingFormInput";
import DatePicker from "react-datepicker";
import country_state_district from "country_state_district";
import { useTranslation } from "react-i18next";

const OrnamentForm = () => {
  const stateList = country_state_district.getAllStates();
  const navigate = useNavigate();
  const [pawti, setPawti] = useState();
  const dt = new Date();
  const year = dt.getFullYear();
  const m = dt.getMonth();
  const d = dt.getDate();
  const [receiptDate, setReceiptDate] = useState(
    `${d < 10 ? "0" + d : d}-${("0" + (m + 1)).slice(-2)}-${year}`
  );
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [ornamentName, setOrnamentName] = useState();
  const [ornamentType, setOrnamentType] = useState();
  const [ornamentWeight, setOrnamentWeight] = useState();
  const [ornamentValue, setOrnamentValue] = useState();
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [gotra, setGotra] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  //checking the last pawti number
  useEffect(() => {
    axios.get("/receipt/check-pawati-number", {}).then((res) => {
      if (res.data) {
        const pawatiNumber = res.data[0]?.pawatiNumber || 0;
        setPawti(pawatiNumber + 1);
        setLoading(false);
      }
    });
  }, []);

  // get all cities by state name
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          "api-token":
            "eOO6JCQY1TiZ79HOSapDwHmTiGpkJeKYQjnaq5Yj60vh_mFaUr2ueAG1Br7wmMgKkmA",
          "user-email": "suronjit797@gmail.com",
        },
      })
      .then((res) => {
        const token = res.data.auth_token;
        if (state && token) {
          axios
            .get(`https://www.universal-tutorial.com/api/cities/${state}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setCityList(res.data);
            });
        }
      })
      .catch((error) => setCityList([]));
  }, [state]);

  const handleOrnamentForm = (event) => {};
  return (
    <div className="ornaments">
      <Box mb={2}>
        <Typography
          variant="h1"
          sx={{ fontSize: "30px", fontWeight: "700", mt: "15px" }}
          gutterBottom
        >
          Generate Ornament Receipt
        </Typography>
        <Box
          component="form"
          onSubmit={handleOrnamentForm}
          sx={{
            backgroundColor: "#fff",
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            px: 3,
            py: 2,
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr", sm: "1fr 1fr" },
              gap: 1.5,
              mb: 2,
            }}
          >
            <BillingFormInput
              value={receiptDate}
              onChange={setReceiptDate}
              label={t("receipt-date")}
              id="date"
              placeholder="Receipt Date"
              type="text"
              disabled={true}
            />
            <BillingFormInput
              value={name}
              onChange={setName}
              label={t("name")}
              id="date"
              placeholder={t("fullname")}
              type="text"
              disabled={true}
            />
            <BillingFormInput
              value={mobile}
              onChange={setMobile}
              label={t("mobile")}
              id="date"
              placeholder={t("mobile")}
              type="text"
              disabled={true}
            />
            <BillingFormInput
              value={name}
              onChange={setName}
              label={t("name")}
              id="date"
              placeholder={t("fullname")}
              type="text"
              disabled={true}
            />
            <FormControl>
              <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="state">
                {t("state")}
              </FormLabel>
              <Select
                id="state"
                placeholder="state"
                sx={{ width: "100%" }}
                color="third"
                size="small"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <MenuItem value={0} disabled>
                  {t("select-one")}
                </MenuItem>
                {stateList.map((s) => (
                  <MenuItem
                    key={s?.id}
                    name={s?.id}
                    value={s?.name}
                    selected={s.name === "Tripura"}
                    onClick={() => setCity("")}
                  >
                    {s?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrnamentForm;
