module.exports = 
[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bthday_year",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bthday_month",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bthday_day",
				"type": "uint256"
			}
		],
		"name": "addTeammate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "changeSalary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "birthday",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "bonusPaid",
				"type": "bool"
			}
		],
		"name": "HappyBirthday",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "birthday",
				"type": "uint256"
			}
		],
		"name": "NewContact",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "SalaryPaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sendBirthdayBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendSalaryAuto",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "checkBirthday",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getTeammate",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "salary",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "birthday",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "todayBirthdayPaid",
						"type": "bool"
					}
				],
				"internalType": "struct TeamDB.Teammates",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]