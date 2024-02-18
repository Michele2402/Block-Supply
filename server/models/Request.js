module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        requestBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        timestamps: false,
        freezeTableName: true
    });

    return Request; 
};