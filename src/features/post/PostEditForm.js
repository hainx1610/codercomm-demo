// import React, { useRef } from "react";
import React, { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, Stack, alpha } from "@mui/material";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { FTextField, FUploadImage, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
// import { createPost } from "./postSlice";
import { editPost } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
  // check api for posts for hints
};

function PostEditForm({ post = defaultValues }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: { ...post },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isDirty },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  // const fileInput = useRef();
  // for upload pics (outdated)

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(editPost(data)).then(() => reset());
  };

  // const handleFile = (e) => {
  //   // console.log(fileInput.current.files[0]);
  //   // React for uncontrolled components
  //   const file = fileInput.current.files[0];
  //   if (file) {
  //     setValue("image", file);
  //   }
  // };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          { shouldDirty: true }
        );
      }
    },
    [setValue]
  );

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name={"content"}
            multiline
            fullWidth
            rows={4}
            placeholder=""
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          {/* <FTextField name={"image"} placeholder="Image (outdated anw)" /> */}

          {/* <input type="file" ref={fileInput} onChange={handleFile} /> */}
          {/* read-only according to React docs */}

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {isDirty ? (
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting || isLoading}
              >
                Update
              </LoadingButton>
            ) : (
              <Button variant="contained" size="small" type="button" disabled>
                Update
              </Button>
            )}

            {/* {isDirty && (
              <Button
                type="button"
                onClick={() => reset()}
                variant="contained"
                size="small"
              >
                Cancel
              </Button>
            )} */}
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostEditForm;
