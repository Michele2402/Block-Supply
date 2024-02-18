module.exports = (sequelize, DataTypes) => {
    const RequestB2B = sequelize.define("RequestB2B", {
        requestBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
        askingCompanyInternetID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receivingCompanyInternetID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transportationCompanyInternetID: {
            type: DataTypes.STRING,
        },
        quote: {
            type: DataTypes.STRING,
        },
        quoteSent: {
            type: DataTypes.BOOLEAN,
        },
        quoteAccepted: {
            type: DataTypes.BOOLEAN,
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return RequestB2B; 
};