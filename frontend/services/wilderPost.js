import wilderAPI from "../api/api";
import create from "../graphql/wilder.createWilder";

const createWilder = async (wilder) => {
  try {
    const res = (await wilderAPI.front.post(`/graphql`, create(wilder))).data
      .data.createWilder;
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { createWilder };
