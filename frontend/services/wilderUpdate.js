import wilderAPI from "./wilderAPI";

const updateName = async (id, name) => {
  console.log("updateName", id, name);

  try {
    const res = (await wilderAPI.front.put(`/wilders/${id}`, { name })).data;

    console.log("res", res);
  } catch (err) {
    console.error(err);
  }
};

export { updateName };
