const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
})

const Ride = sequelize.define(
    'Ride',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        passenger_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['pending', 'running', 'completed', 'cancelled']],
            },
            defaultValue: 'pending',
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['credit_card', 'cash']],
            },
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

module.exports = Ride
