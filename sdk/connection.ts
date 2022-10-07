import algosdk from 'algosdk';
import dotenv from 'dotenv';

dotenv.config();

const token = JSON.parse(process.env.TESTNET_TOKEN!);
const server = process.env.TESTNET_SERVER;
const port = process.env.TESTNET_PORT;

export const algodClient = new algosdk.Algodv2(token, server, port);