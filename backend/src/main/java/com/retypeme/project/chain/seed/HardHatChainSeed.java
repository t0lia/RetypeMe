package com.retypeme.project.chain.seed;

import org.web3j.protocol.http.HttpService;

public class HardHatChainSeed implements ChainSeed {
    @Override
    public int getChainId() {
        return 31337;
    }

    @Override
    public HttpService getHttpServer() {
        return new HttpService();
    }
}
