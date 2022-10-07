import algosdk from 'algosdk';
import fs from 'fs';

export const deployApp = async (
  algodClient: algosdk.Algodv2,
  senderMnemo: string,
) => {

  try {

    const signer = algosdk.mnemonicToSecretKey(senderMnemo);
    const suggestedParams = await algodClient.getTransactionParams().do();
    const onComplete = algosdk.OnApplicationComplete.NoOpOC;

    const approvalSource = fs.readFileSync('../smart_contract/approval.teal').toString();
    const approvalCompile = await algodClient.compile(approvalSource).do();
    const approvalProgram = new Uint8Array(Buffer.from(approvalCompile.result, 'base64'));

    const clearSource = fs.readFileSync('../smart_contract/clear.teal').toString();
    const clearCompile = await algodClient.compile(clearSource).do();
    const clearProgram = new Uint8Array(Buffer.from(clearCompile.result, 'base64'));

    const txn = algosdk.makeApplicationCreateTxnFromObject({
      approvalProgram: approvalProgram,
      clearProgram: clearProgram,
      from: signer.addr,
      numGlobalByteSlices: 1,
      numGlobalInts: 0,
      numLocalByteSlices: 1,
      numLocalInts: 1,
      onComplete: onComplete,
      suggestedParams: suggestedParams,
    });

    const signedTxn = txn.signTxn(signer.sk);
    const sentTxn = await algodClient.sendRawTransaction(signedTxn).do();
    
    await algosdk.waitForConfirmation(algodClient, sentTxn.txId, 4);

    console.log(`Transaction ID: ${sentTxn.txId}`);
    
  } catch (error) {

    console.log(error);
    
  }

};