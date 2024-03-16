package com.retypeme.project.chain.provider;

import org.web3j.protocol.http.HttpService;

public class HardHatProvider implements NetworkProvider {
    @Override
    public int getChainId() {
        return 31337;
    }

    @Override
    public HttpService getHttpServer() {
        return new HttpService();
    }
}
