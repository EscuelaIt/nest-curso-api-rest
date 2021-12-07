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
    }
});