package com.retypeme.project.chain.provider;

import org.web3j.protocol.http.HttpService;

public interface NetworkProvider {

    int getChainId();

    HttpService getHttpServer();
}
