package com.retypeme.project.chain;

import static com.retypeme.project.chain.provider.Chain.lookup;
import static org.web3j.tx.Contract.GAS_LIMIT;
import static org.web3j.tx.ManagedTransaction.GAS_PRICE;

import com.retypeme.project.chain.contract.GamingContract;
import com.retypeme.project.chain.provider.Chain;
import com.retypeme.project.chain.provider.InfuraProvider;
import com.retypeme.project.chain.provider.NetworkProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Profile;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.StaticGasProvider;

@SpringBootApplication
@Profile("gen")
public class DeployContractApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(DeployContractApplication.class, args);
    }

    Logger logger = LoggerFactory.getLogger(DeployContractApplication.class);

    private final String privateKey;
    private final String network;
    private final String apikey;

    public DeployContractApplication(
        @Value("${contract.private-key}") String privateKey,
        @Value("${contract.network}") String network,
        @Value("${contract.apikey}") String apikey) {
        this.privateKey = privateKey;
        this.network = network;
        this.apikey = apikey;
    }


    @Override
    public void run(String... args) throws Exception {
        Chain chain = lookup(network);
        logger.info("Deploying contract to network: " + chain.getName());
        NetworkProvider provider = new InfuraProvider(chain, apikey);

        GamingContract contract = deploy(provider, privateKey);

        String contractAddress = contract.getContractAddress();
        logger.info("Contract deployed at address: " + contractAddress);
    }

    private GamingContract deploy(NetworkProvider provider, String privateKey) throws Exception {
        Credentials credentials = Credentials.create(privateKey);
        Web3j web3j = Web3j.build(provider.getHttpServer());
        TransactionManager tm =
            new RawTransactionManager(web3j, credentials, provider.getChainId());
        StaticGasProvider staticGasProvider = new StaticGasProvider(GAS_PRICE, GAS_LIMIT);
        return GamingContract.deploy(web3j, tm, staticGasProvider).send();
    }

}