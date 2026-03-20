import sequelize from "src/db";
import Agent from "src/db/models/Agent";
import Property from "src/db/models/Property";

const migrate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");

    await Agent.sync({ force: true });
    console.log("Agents table created.");

    await Property.sync({ force: true });
    console.log("Properties table created.");

    console.log("Migration complete.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
