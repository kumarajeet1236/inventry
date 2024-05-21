export default () => ({
    "PORT":process.env.PORT,
    "DB_HOST":process.env.POSTGRES_HOST,
    "DB_PORT":process.env.POSTGRES_PORT,
    "DB_USERNAME":process.env.POSTGRES_USERNAME,
    "DB_PASSWORD":process.env.POSTGRES_PASSWORD,
    "DB_DATABASE":process.env.POSTGRES_DATABASE,
    "DB_SYNC":process.env.POSTGRES_SYNC,
    "KAFKA_BROKER_1":process.env.KAFKA_BROKER_1,
    "NODE_ENV":process.env.NODE_ENV,
});
