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

const updateDescription = async (id, description) => {
  console.log("updateDescription", id, description);

  try {
    const res = (await wilderAPI.front.put(`/wilders/${id}`, { description }))
      .data;

    console.log("res", res);
  } catch (err) {
    console.error(err);
  }
};

const updateSkills = async (id, skills) => {
  console.log("updateSkills", id, skills);

  try {
    const res = (await wilderAPI.front.put(`/wilders/${id}/skills`, { skills }))
      .data;

    console.log("res", res);
  } catch (err) {
    console.error(err);
  }
};

const updateSkillRating = async (id, skillId, rating) => {
  console.log("updateSkillRating", id, skillId, rating);

  try {
    const res = (
      await wilderAPI.front.put(`/wilders/${id}/skills/${skillId}`, { rating })
    ).data;
  } catch (err) {
    console.error(err);
  }
};

export { updateName, updateDescription, updateSkills, updateSkillRating };
