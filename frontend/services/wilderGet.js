import wilderAPI from "./wilderAPI";

const getSkills = async () => {
  console.log("getSkills");

  try {
    const res = (await wilderAPI.front.get(`/skills/`)).data;
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { getSkills };
