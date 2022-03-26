module.exports=(sequelize,datatypes)=>{
    const stocks=sequelize.define("stocks",{
        email:{
            type:datatypes.STRING,
            primaryKey:true
        },
        CokaCula: {
            type:datatypes.INTEGER,
        },
        HettanPetroleum: {
            type:datatypes.INTEGER,
        },
        Vedophene: {
            type:datatypes.INTEGER,
        },
        Abibas: {
            type:datatypes.INTEGER,
        },
        LycaLabs: {
            type:datatypes.INTEGER,
        },
        Yechier: {
            type:datatypes.INTEGER,
        },
        Wallet: {
            type:datatypes.INTEGER,
        },
    });
    return stocks;
}