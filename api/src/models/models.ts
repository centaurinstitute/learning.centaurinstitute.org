import platform from "@canmingir/link-express";

async function init() {
  const {
    Postgres: { sequelize },
  } = await platform.getModules();
  const models = sequelize.models;

  models.Video.belongsTo(models.Project, {
    foreignKey: "teamId",
  });
}

export default { init };
