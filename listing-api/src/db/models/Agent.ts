import { DataTypes, Model } from "sequelize";
import sequelize from "src/db";

class Agent extends Model {}

Agent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "agents",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default Agent;