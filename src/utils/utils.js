export const jsonDateConvert = (val = "") => {
  try {
    let temp = new Date(val).toJSON().substring(0, 10);
    console.log(temp);
    return temp;
  } catch (error) {
    return new Date().toJSON().substring(0, 10);
  }
};
