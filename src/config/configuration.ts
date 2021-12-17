export default () => ({
    app_port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: (process.env.DATABASE_SYNC==='true')
    },
    jwt: {
        jwt_access_expiresin: parseInt(process.env.JWT_ACCESS_EXPIRESIN) || 2592000000, // segundos
        jwt_secret: process.env.JWT_SECRETKEY  
    }
});