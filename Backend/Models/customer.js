// import { DataTypes } from "sequelize";
// import sequelize from "../config/db.js";
// // import sequelize from "../connsection/db.js";

// export const customers=sequelize.define('customers',{
//     id:{
//         type:DataTypes.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     name:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:DataTypes.STRING,
//         allowNull:false,
//         unique:true,
//     },
//     password:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     }
// })
// export default customers;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const customers = sequelize.define('customer', {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Role:{
        type: DataTypes.STRING,
        defaultValue:"user"
    }
});

export default customers;
