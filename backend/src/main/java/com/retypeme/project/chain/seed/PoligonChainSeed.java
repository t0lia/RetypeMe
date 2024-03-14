package com.retypeme.project.chain.seed;

import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.infura.InfuraHttpService;

public class PoligonChainSeed implements ChainSeed {

    private final String networkUrl;
    private final int chainId;

    @Override
    public int getChainId() {
        return chainId;
    }

    public PoligonChainSeed(String networkUrl, int chainId) {
        this.networkUrl = networkUrl;
        this.chainId = chainId;
    }

    @Override
    public HttpService getHttpServer() {
        return new InfuraHttpService(networkUrl);
    }
}
