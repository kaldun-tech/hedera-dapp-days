import { TopicMessageSubmitTransaction } from "@hashgraph/sdk";

async function topicMessageFcn(walletData, accountId) {
	console.log(`\n=======================================`);
	console.log(`- Sending topic message...`);

	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

	const topicMessageTx = new TopicMessageSubmitTransaction()
		.setTopicMemo("Hello World!")
		.setTopicId(saveData.topic)
		.freezeWithSigner(signer);
	const topicMessageSubmit = topicMessageTx.executeWithSigner(signer);
	const topicMessageRx = await provider.getTransactionReceipt(topicMessageSubmit.transactionId);
	const topicMessageId = topicMessageRx.topicId;
	console.log(`- Topic message sent. Topic ID is ${topicMessageId}`);

	return [topicMessageId];
}

export default topicMessageFcn;
