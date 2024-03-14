package com.retypeme.project.chain.seed;

import org.web3j.protocol.http.HttpService;

public interface ChainSeed {

    int getChainId();

    HttpService getHttpServer();
}
