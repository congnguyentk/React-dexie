import { useState, forwardRef } from "react";
import { Box, Button, Snackbar, TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

import { db, Items } from "./db";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddItemForm() {
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  }>({ type: "success", message: "" });
  const [open, setOpen] = useState(false);

  async function addItems(item: Items) {
    try {
      const id = await db.items.add({
        name: item.name,
        tel: item.tel
      });

      setStatus({
        type: "success",
        message: `${item.name} (id: ${id}) を追加しました。`
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: `${item.name} を追加できませんでした。: ${error}`
      });
    } finally {
      setOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      tel: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("名前を入力してください"),
      tel: Yup.number()
        .typeError("数字で入力してください（-は不要です）")
        .required("電話番号を入力してください")
    }),
    onSubmit: ({ name, tel }, { resetForm }) => {
      addItems({ name, tel });
      resetForm();
    }
  });

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            mb: 2
          }}
        >
          <TextField
            label="名前"
            type="text"
            name="name"
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            size="small"
          />
          <TextField
            label="電話番号"
            type="text"
            name="tel"
            error={Boolean(formik.touched.tel && formik.errors.tel)}
            helperText={formik.touched.tel && formik.errors.tel}
            onBlur={formik.handleBlur}
            value={formik.values.tel}
            onChange={formik.handleChange}
            size="small"
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={status.type}
          sx={{ width: "100%" }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddItemForm;
