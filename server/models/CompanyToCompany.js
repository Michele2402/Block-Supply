module.exports = (sequelize, DataTypes) => {
    const CompanyToCompany = sequelize.define("CompanyToCompany",{}, {
        timestamps: false,
        freezeTableName: true
    });

    return CompanyToCompany; 
};