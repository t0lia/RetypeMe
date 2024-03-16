package com.retypeme.project.chain.provider;

import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.infura.InfuraHttpService;

public class InfuraProvider implements NetworkProvider {

    static final String INFURA_URL_TEMPLATE = "https://%s.infura.io/v3/%s";

    private final String networkUrl;
    private final int chainId;

    @Override
    public int getChainId() {
        return chainId;
    }

    public InfuraProvider(Chain chain, String apiKey) {
        this.networkUrl = String.format(INFURA_URL_TEMPLATE, chain.getName(), apiKey);
        this.chainId = chain.getId();
    }

    @Override
    public HttpService getHttpServer() {
        return new InfuraHttpService(networkUrl);
    }
}
