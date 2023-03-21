const required = (v: string) => {
  return !!v;
};

const numberOnly = (v: string) => {
  return /^[\d]+$/.test(v);
};

const engLangOnly = (v: string) => {
  return /^[a-zA-Z\s]+$/.test(v);
};

const thaiLangOnly = (v: string) => {
  return /^[ก-ฮะ-์\s]+$/.test(v);
};

const thai_engLanguage = (v: string) => {
  return /^[a-zA-Zก-ฮะ-์\s]+$/.test(v);
};

//Password must have least 8 characters and mustn't have characters in thai language
const password = (v: string) => {
  return /^([a-zA-Z0-9@$!%*?&%#._-]{8,})$/.test(v);
};

const email = (v: string) => {
  return /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(
    v
  );
};

const phoneNumber = (v: string) => {
  return /^([02]*-([0-9]{3})*-([0-9]{4})+$|^([0-9]{3})*-([0-9]{3})*-([0-9]{4}))+$|^(([02]+[0-9]{7})+$|^([0-9]{10}))+$/.test(
    v
  );
};

const creditCard = (v: string) => {
  return /^([0-9]{16})+$/.test(v);
};

//Id Card must have 13 numbers (XXXXXXXXXXXXX)
const idCard = (v: string) => {
  return /^(([0-9])*-([0-9]{4})*-([0-9]{5})*-([0-9]{2})*-([0-9]{1}))+$|^([0-9]{13})+$/.test(
    v
  );
};

//Car license plate must be valid (กข 1234) or (1กข 1234)
const car_license_plate = (v: string) => {
  return /^([ก-ฮ]{2})(\s)([0-9]{4})+$|^(([0-9])([ก-ฮ]{2}))(\s)([0-9]{4})+$/.test(
    v
  );
};

//Must be character in thai and english language and have special character is - / ; . , _ ()
const text = (v: string) => {
  return /^[a-zA-Zก-ฮะ-์-/;.,_()\s]+$/.test(v);
};

//Must be character in thai and english language, number and special character is - / ; . , _ ()
const text_num = (v: string) => {
  return /^[a-zA-Z0-9ก-ฮะ-์-/;.,_()\s]+$/.test(v);
};

export default {
  required,
  numberOnly,
  engLangOnly,
  thaiLangOnly,
  thai_engLanguage,
  password,
  email,
  phoneNumber,
  creditCard,
  car_license_plate,
  idCard,
  text,
  text_num,
};
