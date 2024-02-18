module.exports = (sequelize, DataTypes) => {
    const TransportationCompany = sequelize.define("TransportationCompany", {
        internetID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        timestamps: false,
        freezeTableName: true
    });


    TransportationCompany.associate = (models) => {
        TransportationCompany.hasMany(models.Request, {
            onDelete: "cascade"
        });


    }

    return TransportationCompany; // Return the defined model object
};