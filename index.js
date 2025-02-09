const dotenv = require("dotenv");
const { Relayer } = require("dot-vote-relayer");
dotenv.config();

const getEndBlockFunction = async (governor, proposalId) => {
  return Number(await governor.methods.proposalDeadline(proposalId).call());
};

const config = {
  ethRpcUrl: process.env.ETH_RPC,
  mongoDbUrl: process.env.MONGODB_URL,
  notificationHook: process.env.NOTIFICATION_HOOK,
  governorAddress: "0x309a862bbC1A00e45506cB8A802D1ff10004c8C0",
  tokenAddress: "0xc00e94cb662c3520282e6f5717214004a7f26888",
  governorGetProposalEndBlock: getEndBlockFunction,
  governorVoteFunction: "castVoteBySig",
  governorGetReceiptFunction: "hasVoted",
  governorGetProposalState: "state",
  ozApiKey: process.env.OZ_API_KEY,
  ozApiSecret: process.env.OZ_API_SECRET,
  relayAtBlocks: [2000, 5000],
};

const relayer = new Relayer(config);
relayer.start();
