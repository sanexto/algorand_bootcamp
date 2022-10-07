import algosdk from 'algosdk';
import dotenv from 'dotenv';

dotenv.config();

const algodToken = JSON.parse(process.env.TESTNET_ALGOD_TOKEN!);
const algodServer = process.env.TESTNET_ALGOD_SERVER;
const algodPort = process.env.TESTNET_ALGOD_PORT;

export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const indexerToken = JSON.parse(process.env.TESTNET_INDEXER_TOKEN!);
const indexerServer = process.env.TESTNET_INDEXER_SERVER;
const indexerPort = process.env.TESTNET_INDEXER_PORT;

export const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, indexerPort);