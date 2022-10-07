import algosdk from 'algosdk';

export const txAlgo = async (
  algodClient: algosdk.Algodv2,
  senderMnemonic: string,
  receiverAddress: string,
  amount: number,
) => {

  try {

    const account = algosdk.mnemonicToSecretKey(senderMnemonic);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: account.addr,
      to: receiverAddress,
      amount: amount,
      suggestedParams: suggestedParams,
    });

    const signedTxn = txn.signTxn(account.sk);
    const sentTxn = await algodClient.sendRawTransaction(signedTxn).do();

    await algosdk.waitForConfirmation(algodClient, sentTxn.txId, 4);

    console.log(`Transaction ID: ${sentTxn.txId}`);
    
  } catch (error) {

    console.log(error);
    
  }

};