import dotenv from 'dotenv';
dotenv.config();

export const { port_no, db_connection, token_key, client_mail, client_password } = process.env;