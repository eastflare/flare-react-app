import { Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
interface SelectItems {
  [key: string]: string | number;
}

interface RapSelectProps {
  id?: string;
  label?: string;
  value?: string | string[];
  required?: boolean;
  message?: string;
  readonly?: boolean;
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  selectItems: SelectItems;
}
const CustomSelect = forwardRef<HTMLDivElement, RapSelectProps>(({ id, label, value, required = false, message, readonly = false, multiple = false, onValueChange, selectItems }, ref) => {
  const [values, setValues] = useState<string | string[]>(() => (multiple ? (Array.isArray(value) ? value : []) : (value as string)));
  const [items, setItems] = useState<SelectItems>(selectItems);

  useEffect(() => {
    if (!multiple && Object.keys(selectItems).length > 0) {
      setItems({ "": "전체", ...selectItems });
      setValues("");
    } else {
      setItems(selectItems);
      setValues(Array.isArray(value) ? value : []);
    }
  }, [multiple, selectItems]);

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const newValue = event.target.value;
    setValues(newValue);

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const isChecked = (selectedValue: string | number) => {
    return Array.isArray(values) && values.includes(selectedValue as string);
  };

  return (
    <div>
      {readonly ? (
        <Typography sx={{ height: "29px", lineHeight: "29px", backgroundColor: "#f5f5f5", paddingLeft: "8px" }}>
          {multiple ? ((values as string[]).length > 0 ? (values as string[]).join(", ") : "선택되지 않음") : values || "선택되지 않음"}
        </Typography>
      ) : (
        <Select
          id={id}
          label={label}
          size='small'
          value={values}
          onChange={handleChange}
          displayEmpty
          fullWidth
          multiple={multiple}
          renderValue={selected => (multiple && Array.isArray(selected) && selected.length > 0 ? selected.join(", ") : items[values as string] || "선택")}
          sx={{ height: "29px", backgroundColor: "#ffffff" }}
        >
          {Object.entries(items).map(([value, text]) => (
            <MenuItem key={value} value={value}>
              {multiple ? (
                <>
                  <Checkbox checked={isChecked(value)} />
                  <ListItemText primary={text} />
                </>
              ) : (
                text
              )}
            </MenuItem>
          ))}
        </Select>
      )}
      {required && !readonly && (
        <Typography fontSize={"13px"} color={"#f54245"}>
          {message || "값을 선택해주세요"}
        </Typography>
      )}
    </div>
  );
});
export const RapSelect = forwardRef<HTMLInputElement, RapSelectProps>((props, ref) => <CustomSelect {...props} ref={ref} />);
