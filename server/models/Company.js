module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
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
       
        type_of_company: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    Company.associate = (models) => {
        Company.hasMany(models.Request, {
            onDelete: "cascade",
            onUpdate: "cascade"
        });

        Company.belongsToMany(models.Company, {
            as: "Partner",
            through: "CompanyToCompany",
            onDelete: "cascade",
            onUpdate: "cascade"
        })
    }

    return Company; // Return the defined model object
};