import algosdk from 'algosdk';

export const createASA = async (
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  decimals: number,
  total: number,
  unitName: string,
  assetName: string,
) => {

  try {

    const signer = algosdk.mnemonicToSecretKey(signerMnemo);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      decimals: decimals,
      total: total,
      from: signer.addr,
      defaultFrozen: false,
      unitName: unitName,
      assetName: assetName,
      suggestedParams: suggestedParams,
    });

    const signedTxn = txn.signTxn(signer.sk);
    const sentTxn = await algodClient.sendRawTransaction(signedTxn).do();
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, sentTxn.txId, 4);

    console.log(`Transaction ID: ${sentTxn.txId} -------- Asset ID: ${confirmedTxn['asset-index']}`);
    
  } catch (error) {

    console.log(error);
    
  }

};

export const optinASA = async (
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  asaId: number,
) => {

  try {

    const signer = algosdk.mnemonicToSecretKey(signerMnemo);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: signer.addr,
      to: signer.addr,
      amount: 0,
      assetIndex: asaId,
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

export const transferASA = async (
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  receiverAddress: string,
  amount: number,
  asaId: number,
) => {

  try {

    const signer = algosdk.mnemonicToSecretKey(signerMnemo);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: signer.addr,
      to: receiverAddress,
      amount: amount,
      assetIndex: asaId,
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