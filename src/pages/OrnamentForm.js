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
import { useTranslation } from "react-i18next";

const OrnamentForm = () => {
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
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [gotra, setGotra] = useState("");
  const [address, setAddress] = useState("");
  const { t } = useTranslation();
};
