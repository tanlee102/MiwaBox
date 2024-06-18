const ethers = require('ethers');
const fs = require('fs');


const env_SMARTCHAIN = {
    NETWORK: {
        chainId: "0x61",
        rpcUrls: ["https://bsc-testnet-rpc.publicnode.com","https://bsc-testnet.blockpi.network/v1/rpc/public"],
        chainName: "BNB Smart Chain Testnet",
        nativeCurrency: {
          name: "tBNB",
          symbol: "tBNB",
          decimals: 18
        },
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    },
    CONTRACT: {
        abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"LENGTH_LIST_APP_LIMIT","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_title","type":"bytes32"},{"internalType":"address","name":"_appAddress","type":"address"},{"internalType":"uint8","name":"_idNetwork","type":"uint8"},{"internalType":"uint8","name":"_appType","type":"uint8"},{"internalType":"bool","name":"_privacy","type":"bool"}],"name":"createApp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_idIcon","type":"uint8"},{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"createUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentId","outputs":[{"internalType":"uint40","name":"","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint40","name":"_appId","type":"uint40"}],"name":"getApp","outputs":[{"components":[{"internalType":"uint40","name":"id","type":"uint40"},{"internalType":"bytes32","name":"title","type":"bytes32"},{"internalType":"address","name":"appAddress","type":"address"},{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"uint8","name":"idNetwork","type":"uint8"},{"internalType":"uint8","name":"appType","type":"uint8"},{"internalType":"uint24","name":"point","type":"uint24"},{"internalType":"bool","name":"privacy","type":"bool"},{"internalType":"bool","name":"display","type":"bool"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct MiwaBox.AppData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_forward","type":"bool"},{"internalType":"bool","name":"_privacy","type":"bool"},{"internalType":"uint40","name":"_loopId","type":"uint40"},{"internalType":"uint16","name":"_count","type":"uint16"}],"name":"getApps","outputs":[{"components":[{"internalType":"uint40","name":"id","type":"uint40"},{"internalType":"bytes32","name":"title","type":"bytes32"},{"internalType":"address","name":"appAddress","type":"address"},{"internalType":"uint8","name":"appType","type":"uint8"}],"internalType":"struct MiwaBox.AppDataReList[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"getAppsByUserAddress","outputs":[{"components":[{"internalType":"uint40","name":"id","type":"uint40"},{"internalType":"bytes32","name":"title","type":"bytes32"},{"internalType":"address","name":"appAddress","type":"address"},{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"uint8","name":"idNetwork","type":"uint8"},{"internalType":"uint8","name":"appType","type":"uint8"},{"internalType":"uint24","name":"point","type":"uint24"},{"internalType":"bool","name":"privacy","type":"bool"},{"internalType":"bool","name":"display","type":"bool"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct MiwaBox.AppData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"getLatestAppByUserAddress","outputs":[{"components":[{"internalType":"uint40","name":"id","type":"uint40"},{"internalType":"bytes32","name":"title","type":"bytes32"},{"internalType":"address","name":"appAddress","type":"address"},{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"uint8","name":"idNetwork","type":"uint8"},{"internalType":"uint8","name":"appType","type":"uint8"},{"internalType":"uint24","name":"point","type":"uint24"},{"internalType":"bool","name":"privacy","type":"bool"},{"internalType":"bool","name":"display","type":"bool"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct MiwaBox.AppData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint8","name":"idIcon","type":"uint8"},{"internalType":"bool","name":"admin","type":"bool"}],"internalType":"struct MiwaBox.User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addresses","type":"address[]"}],"name":"getUsersByAddresses","outputs":[{"components":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint8","name":"idIcon","type":"uint8"},{"internalType":"bool","name":"admin","type":"bool"}],"internalType":"struct MiwaBox.User[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint40","name":"_appId","type":"uint40"}],"name":"increaseAppPoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"bool","name":"_setRole","type":"bool"}],"name":"updateAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint40","name":"_appId","type":"uint40"},{"internalType":"bool","name":"_display","type":"bool"}],"name":"updateDisplayApp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_idIcon","type":"uint8"},{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"updateUser","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        address: "0x9C95A9e76F796Df900a917bcDFE186bd3A8F927e",
        //MAIN SM: 0x9C95A9e76F796Df900a917bcDFE186bd3A8F927e
        //TEST SM: 0xBd30dc9C633292f7e42E081A01B10d33E1112D5d
    },
}


const jsonRpcUrl = env_SMARTCHAIN.NETWORK.rpcUrls[0];
const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
let contractAddress = env_SMARTCHAIN.CONTRACT.address;
let contractABI = env_SMARTCHAIN.CONTRACT.abi;
let contract = new ethers.Contract(contractAddress, contractABI, provider);



let forward = true;
let privacy = true;
let count = 100;

let final_list = []


const main = async () => {

    let maxId = Number(ethers.toNumber(await contract.currentId())) - 1;
    let initialId = Number(ethers.toNumber(await contract.initialId()));

    async function getApps(queryId) {

        let nextQueryID = queryId;
        let apps = await contract.getApps(forward, privacy, queryId, count);
    
        for(let i = 0; i < apps.length; i++){
            if(ethers.toNumber(apps[i][0]) != 0){
                final_list.push({
                    id: Number(ethers.toNumber(apps[i][0])),
                    title: (apps[i][1]),
                    appAddress: (apps[i][2]),
                    appType: Number(ethers.toNumber(apps[i][3])),
                })

                if(i == apps.length - 1){
                    nextQueryID =  Number(ethers.toNumber(apps[i][0])) + 1;
                }
            }
        }
    
        if(nextQueryID < maxId && nextQueryID > queryId){
            await getApps(nextQueryID)
        }
    
    }

    await getApps(initialId);

    let priorityList = [1021, 1020, 1000, 1019, 1007, 1031, 1004, 1022];
    let result = [];
    
    for (let priorityId of priorityList) {
        let index = final_list.findIndex(app => ethers.toNumber(app.id) === priorityId);
        if (index !== -1) {
            result.push(final_list[index]);
            final_list.splice(index, 1);
        }
    }
    
    result = result.concat(final_list);
    
    console.log(result);

    const resultJson = JSON.stringify(result);
    const filePath = '../app/data/data_suggestion_'+String(privacy)+'.json';


    fs.writeFile(filePath, resultJson, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Result saved to file:', filePath);
        }
    });
}

main();