import dotenv from 'dotenv';

import { algodClient } from './connection';
import { createAccount } from './account';
import { txAlgo } from './algo';
import { createASA, optinASA, transferASA } from './asa';

dotenv.config();

const mnemo1 = process.env.MNEMO1!;
const address1 = process.env.ADDR1!;

const mnemo2 = process.env.MNEMO2!;
const address2 = process.env.ADDR2!;

// createAccount();
// txAlgo(algodClient, mnemo1, address2, 500000);
// createASA(algodClient, mnemo1, 2, 100 * 1000000, 'STO', 'Sanexto');
// optinASA(algodClient, mnemo2, 114742774);
// transferASA(algodClient, mnemo1, address2, 3200, 114742774);