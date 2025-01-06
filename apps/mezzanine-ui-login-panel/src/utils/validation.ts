export const generatePasswordRegRxp = (length: number) =>
  new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{${length},}$`);
