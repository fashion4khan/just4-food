export const FormValidation = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;

  if (!mobile) return "Mobile number is required :";
  if (!mobileRegex.test(mobile)) return "Mobile number is invalid :";

  return null;
};
export const FormValidationWithName = (name, email, mobile) => {
  const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  const isNameValid = nameRegex.test(name);
  const isEmailValid = regexEmail.test(email);
  const isMobileValid = mobileRegex.test(mobile);

  if (!isNameValid) return "Name is Invalid :";
  if (!isEmailValid) return "Email is Invalid :";
  if (!isMobileValid) return "Mobile number is Invalid :";

  return null;
};
