import Swal from "sweetalert2";

const ValidationPayment = (shippingDetails) => {
  const areFieldsFilled = Object.values(shippingDetails).every(
    (field) => field.trim() !== ""
  );

  if (!areFieldsFilled) {
    Swal.fire({
      title: "Incomplete Shipping Details",
      text: "Please fill out all the required fields before proceeding.",
      icon: "warning",
      background: "#1a1a1a",
      color: "gold",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });

    return false;
  }
  return true;
};

export default ValidationPayment;
