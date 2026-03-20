import { DataTypes, Model } from "sequelize";
import sequelize from "src/db";
import Agent from "./Agent";

class Property extends Model {}

Property.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Agent,
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        beds: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        baths: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        property_type: {
            type: DataTypes.ENUM("house", "apartment", "townhouse"),
            allowNull: false,
        },
        suburb: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("active", "under_contract", "sold"),
            allowNull: false,
            defaultValue: "active",
        },
        internal_notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "properties",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
        indexes: [
            { fields: ["price"] },
            { fields: ["suburb"] },
            { fields: ["property_type"] },
            { fields: ["beds"] },
            { fields: ["baths"] },
        ],
    }
);

Property.belongsTo(Agent, { foreignKey: "agent_id", as: "agent" });

export default Property;