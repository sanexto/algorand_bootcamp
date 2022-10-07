import dotenv from 'dotenv';

import { algodClient, indexerClient } from './connection';
import { deployApp } from './deploy';
import { optInApp, registerDiploma, checkIfHasDiploma } from './methods';

dotenv.config();

// deployApp(algodClient, process.env.TEACHER_MNEMO!);
// optInApp(algodClient, process.env.STUDENT1_MNEMO!, parseInt(process.env.TESTNET_APP_ID!));
// registerDiploma(algodClient, process.env.TEACHER_MNEMO!, parseInt(process.env.TESTNET_APP_ID!), process.env.STUDENT1_ADDR!, 'Algorand Developer', 11);
// checkIfHasDiploma(indexerClient, parseInt(process.env.TESTNET_APP_ID!), process.env.STUDENT1_ADDR!);