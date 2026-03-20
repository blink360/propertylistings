import sequelize from "src/db";
import Agent from "src/db/models/Agent";
import Property from "src/db/models/Property";
import { testData } from "src/db/test_data";

const seed = async () => {
  try {
    await sequelize.authenticate();
    
    await Agent.bulkCreate(
      testData.agents.map(({ id, name, email, phone }) => ({
        id,
        name,
        email,
        phone,
      })),
    );
    console.log(`Seeded ${testData.agents.length} agents.`);

    await Property.bulkCreate(
      testData.properties.map((p) => ({
        id: p.id,
        agent_id: p.agent_id,
        title: p.title,
        description: p.description,
        price: p.price,
        beds: p.beds,
        baths: p.baths,
        property_type: p.property_type,
        suburb: p.suburb,
        address: p.address,
        status: p.status,
        internal_notes: p.internal_notes,
      })),
    );
    console.log(`Seeded ${testData.properties.length} properties.`);

    console.log("Seed complete.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
