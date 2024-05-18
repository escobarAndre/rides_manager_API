const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
})

const User = sequelize.define(
    'USER',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        total_rides: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        current_ride_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Ride',
                key: 'id',
            },
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
    }
)

module.exports = User
