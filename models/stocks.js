module.exports=(sequelize,datatypes)=>{
    const stocks=sequelize.define("stocks",{
        email:{
            type:datatypes.STRING,
            primaryKey:true
        },
        VocaCola: {
            type:datatypes.INTEGER,
        },
        Yecher: {
            type:datatypes.INTEGER,
        },
        HindPetroleum: {
            type:datatypes.INTEGER,
        },
        VI: {
            type:datatypes.INTEGER,
        },
        LyccaLabs: {
            type:datatypes.INTEGER,
        },
        Abibas: {
            type:datatypes.INTEGER,
        },
        Wallet: {
            type:datatypes.INTEGER,
        },
    });
    return stocks;
}