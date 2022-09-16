import wilderAPI from "./wilderAPI";

const createWilder = async (wilder) => {
  console.log("createWilder", wilder);

  try {
    const res = (await wilderAPI.front.post(`/wilders`, wilder)).data;
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { createWilder };


