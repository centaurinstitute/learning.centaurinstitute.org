async function init() {
  const { Project } = require("@canmingir/link-express/models");

  const Video = require("./Video");

  Video.belongsTo(Project, {
    foreignKey: "teamId",
  });
}

export default { init };
