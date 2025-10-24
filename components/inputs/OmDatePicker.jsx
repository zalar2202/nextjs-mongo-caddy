"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fa";

export default function OmDatePicker({
  label = "Select date",
  value,
  onChange,
  format = "YYYY/MM/DD",
  locale = "fa",
  slotProps = {},
  textFieldProps = {},
}) {
  const [internal, setInternal] = React.useState(value ? dayjs(value) : null);

  React.useEffect(() => {
    if (value) setInternal(dayjs(value));
  }, [value]);

  const handleChange = (newVal) => {
    setInternal(newVal);
    onChange?.(newVal ? newVal.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        label={label}
        value={internal}
        onChange={handleChange}
        format={format}
        slotProps={{
          textField: { fullWidth: true, ...textFieldProps },
          ...slotProps,
        }}
      />
    </LocalizationProvider>
  );
}
