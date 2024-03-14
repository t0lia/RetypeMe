package com.retypeme.project.chain;

import static org.web3j.tx.Contract.GAS_LIMIT;
import static org.web3j.tx.ManagedTransaction.GAS_PRICE;

import com.retypeme.project.chain.seed.ChainSeed;
import com.retypeme.project.chain.contract.HelloWorld;
import com.retypeme.project.chain.seed.PoligonChainSeed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.StaticGasProvider;

@Component
public class Runner implements CommandLineRunner {

    static Logger logger = LoggerFactory.getLogger(CommandLineRunner.class);

    private HelloWorld deploy(ChainSeed seed, String privateKey) throws Exception {
        Credentials credentials = Credentials.create(privateKey);
        Web3j web3j = Web3j.build(seed.getHttpServer());
        TransactionManager tm =
            new RawTransactionManager(web3j, credentials, seed.getChainId());
        StaticGasProvider staticGasProvider = new StaticGasProvider(GAS_PRICE, GAS_LIMIT);
        return HelloWorld.deploy(web3j, tm, staticGasProvider).send();
    }

    @Value("${contract.chain.id}")
    private int chainId;
    @Value("${contract.private.key}")
    private String privateKey;
    @Value("${contract.network.url}")
    private String networkUrl;


    @Override
    public void run(String... args) throws Exception {
        ChainSeed seed = new PoligonChainSeed(networkUrl, chainId);
        HelloWorld contract = deploy(seed, privateKey);

        String contractAddress = contract.getContractAddress();
        logger.info("contract address: " + contractAddress);
    }
}
