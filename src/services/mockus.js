export const MOCKUP_COINS = [
  { id: 1, name: "Binance", category: "Exchange", img: "/imgs/binance.webp" },
  {
    id: 2,
    name: "Binance US",
    category: "Exchange",
    img: "/imgs/binance.webp",
  },
  {
    id: 3,
    name: "Binance Smart Chain",
    category: "Blockchain",
    img: "/imgs/binance.webp",
  },
  { id: 4, name: "Coinbase", category: "Exchange", img: "/imgs/coinbase.png" },
  {
    id: 5,
    name: "Coinbase Pro",
    category: "Exchange",
    img: "/imgs/coinbase_pro.png",
  },
  {
    id: 6,
    name: "Crypto.com",
    category: "Exchange",
    img: "/imgs/crypto.webp",
  },
  {
    id: 7,
    name: "Ethereum",
    category: "Blockchain",
    img: "/imgs/ethereum.svg",
  },
  {
    id: 8,
    name: "Gemini",
    category: "Blockchain",
    img: "/imgs/gemini.webp",
  },
  {
    id: 9,
    name: "Kraken",
    category: "Exchange",
    img: "/imgs/kraken.png",
  },
  {
    id: 10,
    name: "KuCoin",
    category: "Exchange",
    img: "/imgs/kucoin.png",
  },
  {
    id: 11,
    name: "AdaLite",
    category: "Wallet",
    img: "/imgs/adalite.webp",
  },
  {
    id: 12,
    name: "AirGap",
    category: "Wallet",
    img: "/imgs/airgap.webp",
  },
  {
    id: 13,
    name: "Polygon",
    category: "Blockchain",
    img: "/imgs/polygon.webp",
  },
];

export const MOCKUP_TRANSACTIONS = [
  {
    id: "1",
    date: "2023-02-09T05:18:32+01:00",
    type: "Withdrawal",
    amount: "0.03687565",
  },
  {
    id: "2",
    date: "2023-02-08T05:18:32+01:00",
    type: "Deposit",
    amount: "0.00113729",
  },
  {
    id: "3",
    date: "2023-02-07T05:18:32+01:00",
    type: "Withdrawal",
    amount: "1.66786509",
  },
  {
    id: "4",
    date: "2023-02-07T08:18:32+01:00",
    type: "Deposit",
    amount: "1.58245465",
  },
  {
    id: "5",
    date: "2023-01-09T03:45:32+01:00",
    type: "Withdrawal",
    amount: "0.08008519",
  },
  {
    id: "6",
    date: "2022-02-09T05:18:32+01:00",
    type: "Deposit",
    amount: "0.02651968",
  },
  {
    id: "7",
    date: "2022-12-19T05:18:32+01:00",
    type: "Withdrawal",
    amount: "0.02371868",
  },
  {
    id: "8",
    date: "2022-09-09T05:18:32+01:00",
    type: "Withdrawal",
    amount: "0.02371868",
  },
];

export const MOCKUP_REVIEW_TRANSACTIONS = [
  {
    id: "0xa4aa25847d15f4e52d6b63e76df63c9841def87c72088a4d106b587ce1c99546",
    date: "2023-02-09T05:18:32+01:00",
    type: "Withdrawal",
    amount: "0.03687565",
    account_id: "1",
  },
  {
    id: "0xd50136130788dee7e6ac19ad485e2dcb778b7fb6862e56eac482708f36e9e21c",
    date: "2023-02-08T05:18:32+01:00",
    type: "Deposit",
    amount: "0.00113729",
    account_id: "1",
  },
  {
    id: "0x4fb3243b54f7033203a4ec63ed9da285579b1b5aa8f7b8cf47e702c5051df512",
    date: "2023-02-07T05:18:32+01:00",
    type: "Withdrawal",
    amount: "1.66786509",
    account_id: "2",
  },
];

export const MOCKUP_REVIEW_TRANSACTION_DETAIL = [
  {
    id: "1",
    net_proceeds: "$0.00",
    cost_basis: "$0.00",
    gain: "$0.00",
    fee: "$0.00",
    isTaxable: "Taxable",
    transaction_id:
      "0xa4aa25847d15f4e52d6b63e76df63c9841def87c72088a4d106b587ce1c99546",
    transaction_link: "https://polygonscan.com/tx/",
    received: [
      {
        date: "2022-10-03T02:14:32+01:00",
        asset_type_id: "3",
        change: "+1",
        balance: "1",
      },
      {
        date: "2022-10-03T02:14:32+01:00",
        asset_type_id: "3",
        change: "+1",
        balance: "1",
      },
      {
        date: "2022-10-03T02:14:32+01:00",
        asset_type_id: "3",
        change: "+1",
        balance: "1",
      },
      {
        date: "2022-10-03T02:14:32+01:00",
        asset_type_id: "3",
        change: "+1",
        balance: "1",
      },
    ],
    fees: [
      {
        date: "2022-10-03T02:14:32+01:00",
        asset_type_id: "6",
        change: "-0.00451338",
        balance: "-0.00451338",
      },
    ],
  },
  {
    id: "2",
    net_proceeds: "$0.40",
    cost_basis: "$0.00",
    gain: "$0.40",
    isTaxable: "Taxable",
    transaction_id:
      "0xd50136130788dee7e6ac19ad485e2dcb778b7fb6862e56eac482708f36e9e21c",
    transaction_link: "https://polygonscan.com/tx/",
    received: [
      {
        date: "2022-11-22T02:14:32+01:00",
        asset_type_id: "6",
        change: "+0.49025",
        balance: "0.47224",
      },
    ],
    sent: [
      {
        date: "2022-11-22T02:14:32+01:00",
        asset_type_id: "3",
        change: "-1",
        balance: "-1",
      },
      {
        date: "2022-11-22T02:14:32+01:00",
        asset_type_id: "3",
        change: "-1",
        balance: "-1",
      },
    ],
  },
  {
    id: "3",
    net_proceeds: "$28.85",
    cost_basis: "$0.00",
    gain: "$28.85",
    fee: "$0.48",
    isTaxable: "Taxable",
    transaction_id:
      "0x4fb3243b54f7033203a4ec63ed9da285579b1b5aa8f7b8cf47e702c5051df512",
    transaction_link: "https://etherscan.io/tx/",
    sent: [
      {
        date: "2023-01-25T02:14:32+01:00",
        asset_type_id: "7",
        change: "-0.01824812",
        balance: "-0.01824812",
      },
    ],
    fees: [
      {
        date: "2023-01-25T02:14:32+01:00",
        asset_type_id: "7",
        change: "-0.00030834",
        balance: "-0.01855646",
      },
    ],
  },
];

export const MOCKUP_MISSING_COST_BASIS_INFOS = [
  {
    id: "1",
    amount_1: "2.201523",
    asset_type_id: "6",
    impact_amount: "0.00",
    amount_2: "0.00451338",
    review_id:
      "0xa4aa25847d15f4e52d6b63e76df63c9841def87c72088a4d106b587ce1c99546",
  },
  {
    id: "2",
    amount_1: "1.3913",
    asset_type_id: "7",
    impact_amount: "0.40",
    amount_2: "1.00",
    review_id:
      "0xd50136130788dee7e6ac19ad485e2dcb778b7fb6862e56eac482708f36e9e21c",
  },
  {
    id: "3",
    amount_1: "10.23",
    asset_type_id: "3",
    amount_2: "0.1338",
    impact_amount: "2.20",
    review_id:
      "0x4fb3243b54f7033203a4ec63ed9da285579b1b5aa8f7b8cf47e702c5051df512",
  },
];

export const TRANSACTION_CLASSIFICATION = [
  { id: "1", name: "Add Liquidity" },
  { id: "2", name: "Airdrop" },
  { id: "3", name: "Casualty Loss" },
  { id: "4", name: "Composite Swap" },
  { id: "5", name: "Deposit" },
  { id: "6", name: "Failed (Revertied)" },
  { id: "7", name: "Fee" },
  { id: "8", name: "Fiat Buy" },
  { id: "9", name: "Fiat Sell" },
  { id: "10", name: "Hard Fork" },
  { id: "11", name: "Income" },
  { id: "12", name: "Withdrawal" },
];

export const MOCKUP_ASSETTYPES = [
  { id: "1", name: "$ NFTGiftX.com", elision: "", img: "" },
  { id: "2", name: "Art Forges Ape #3682", elision: "", img: "" },
  {
    id: "3",
    name: "Art Forges Ape #3681",
    elision: "SKN",
    img: "/imgs/public.avif",
  },
  { id: "4", name: "Bald, Bold and Okay Cats #3681", elision: "", img: "" },
  { id: "5", name: "Skelenous Nft Gang #6116", elision: "SNG", img: "" },
  {
    id: "6",
    name: "Matic Network",
    elision: "MATIC",
    img: "/imgs/matic.png",
  },
  { id: "7", name: "Etherium", elision: "ETH", img: "/imgs/ethereum.svg" },
];

export const MOCKUP_SEND_ASSETS = [
  {
    id: "1",
    type_id: "3",
    amount: "0.2342",
    historical_price: "1554.65923",
    historical_value: "28.3696083",
  },
];

export const MOCKUP_RECEIVE_ASSETS = [
  {
    id: "1",
    type_id: "4",
    amount: "0.1234",
    historical_price: "4521.5422",
    historical_value: "123.654",
  },
];
export const MOCKUP_FEE_ASSETS = [
  {
    id: "1",
    type_id: "2",
    amount: "0.7844",
    historical_price: "14.23",
    historical_value: "8.083",
  },
];

export const MOCKUP_REPORTS = [
  {
    id: "1",
    year: "2023",
    calculation: { method: "HIFO", transactions: "721" },
    capital_gains: [
      { label: "Short Term", amount: "30.00" },
      { label: "Long Term", amount: "0.00" },
      { label: "Total", amount: "30.00" },
    ],
    others: [
      { label: "Tax Loss Harvesting" },
      { label: "End of Year Position" },
      { label: "Missing Basis Reconciliation" },
    ],
    taxable_income: [
      { label: "Airdrop", amount: "0.00" },
      { label: "Interest", amount: "0.00" },
      { label: "Mining", amount: "0.00" },
      { label: "Staking", amount: "0.00" },
      { label: "Income", amount: "0.00" },
      { label: "Other", amount: "0.00" },
      { label: "Total", amount: "0.00" },
    ],
  },
  {
    id: "2",
    year: "2022",
    calculation: { method: "HIFO", transactions: "11" },
    capital_gains: [
      { label: "Short Term", amount: "13.00" },
      { label: "Long Term", amount: "20.00" },
      { label: "Total", amount: "33.00" },
    ],
    others: [
      { label: "End of Year Position" },
      { label: "Missing Basis Reconciliation" },
    ],
    taxable_income: [
      { label: "Airdrop", amount: "0.00" },
      { label: "Interest", amount: "0.00" },
      { label: "Mining", amount: "0.00" },
      { label: "Staking", amount: "0.00" },
      { label: "Income", amount: "0.00" },
      { label: "Other", amount: "0.00" },
      { label: "Total", amount: "0.00" },
    ],
  },
];

export const MOCKUP_PROFESSIONALS = [
  { id: "1", name: "Liam" },
  { id: "2", name: "Noah" },
  { id: "3", name: "Oliver" },
  { id: "4", name: "William" },
  { id: "5", name: "Elijah" },
];

export const MOCKUP_CHAT_MSGS = [
  {
    id: "1",
    msg: "How often should i take the medicine?",
    type: "received",
    time: "01:25",
  },
  {
    id: "2",
    msg: "Twice a day, at breakfast and before bed",
    type: "sent",
    time: "02:32",
  },
  {
    id: "3",
    msg: "Thanks a lot doc",
    type: "received",
    time: "05:42",
  },
  {
    id: "4",
    msg: "Thats my duty, mention not",
    type: "sent",
    time: "05:44",
  },
  {
    id: "5",
    msg: "sorry to bother again but can i ask you one more favour?",
    type: "received",
    time: "11:14",
  },
];
