import algosdk from 'algosdk';

export const optInApp = async (
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  appId: number,
) => {

  try {

    const signer = algosdk.mnemonicToSecretKey(signerMnemo);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeApplicationOptInTxnFromObject({
      appIndex: appId,
      from: signer.addr,
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

export const registerDiploma = async (
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  appId: number,
  studentAddr: string,
  diplomaTitle: string,
  calification: number,
) => {

  try {

    const signer = algosdk.mnemonicToSecretKey(signerMnemo);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const appArgs: Uint8Array[] = [
      new Uint8Array(Buffer.from('register_diploma')),
      new Uint8Array(Buffer.from(diplomaTitle)),
      algosdk.encodeUint64(calification),
    ];

    const txn = algosdk.makeApplicationCallTxnFromObject({
      accounts: [studentAddr],
      appArgs: appArgs,
      appIndex: appId,
      from: signer.addr,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
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

export const checkIfHasDiploma = async (
  indexerClient: algosdk.Indexer,
  appId: number,
  address: string,
) => {

  try {

    const accountAppLocalStates = await indexerClient.lookupAccountAppLocalStates(address).applicationID(appId).do();

    console.log(JSON.stringify(accountAppLocalStates));
    
  } catch (error) {

    console.log(error);
    
  }

};