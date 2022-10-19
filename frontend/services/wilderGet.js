import wilderAPI from "../api/api";
import findSkills from "../graphql/wilder.deleteWilder";

const getSkills = async () => {
  try {
    const res = (await wilderAPI.front.post(`/graphql/`, findSkills)).data.data
      .Skills;
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { getSkills };
