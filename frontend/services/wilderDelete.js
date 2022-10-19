import wilderAPI from "../api/api";
import deleteW from "../graphql/wilder.deleteWilder";

const deleteWilder = async (id) => {
  console.log("deleteWilder", id);

  try {
    const res = (await wilderAPI.front.post(`/graphql/`, deleteW(id))).data;
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { deleteWilder };
