import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
};

const DateSelector = ({ setValue, value, label }: Props) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <DatePicker
        label={label}
        value={value}
        defaultValue=""
        onChange={(newValue) => setValue(newValue)}
        minDate={dayjs().subtract(29, "day")}
        maxDate={dayjs()}
      />
    </FormControl>
  );
};

export default DateSelector;
