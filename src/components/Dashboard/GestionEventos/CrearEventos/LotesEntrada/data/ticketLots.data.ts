import * as Yup from "yup";

export const ticketLotInitialValues = {
  name: "",
  price: 0,
  validUntil: "",
  commissionType: "fixed" as "fixed" | "percent",
  commissionValue: 0,
};

export const ticketLotValidationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  price: Yup.number().min(0).required("Requerido"),
  validUntil: Yup.date().required("Requerido"),
  commissionType: Yup.string().oneOf(["fixed", "percent"]).required(),
  commissionValue: Yup.number().min(0).required("Requerido"),
});
