import wilderAPI from "./wilderAPI";

const deleteWilder = async (id) => {
  console.log("deleteWilder", id);

  try {
    const res = (await wilderAPI.front.delete(`/wilders/${id}`)).data;
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { deleteWilder };
