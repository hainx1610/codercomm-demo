import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import UploadSingleFile from "../UploadSingleFile";
import { FormHelperText } from "@mui/material";

function FUploadImage({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadSingleFile
            accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

export default FUploadImage;
