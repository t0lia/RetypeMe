package com.retypeme.project.chain

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.web3j.protocol.Web3j
import org.web3j.protocol.http.HttpService
import org.web3j.protocol.infura.InfuraHttpService

@Service
class Web3jBuilder(
    @Value("\${contract.apikey.infura}") private val apikeyInfura: String?,
    @Value("\${contract.apikey.chainstack}") private val apikeyChainstack: String?
) {
    fun getWeb3j(rpc: String, chainId: Long): Web3j {
        return Web3j.build(
            when (chainId.toInt()) {
                5611 -> HttpService(rpc)
                534351 -> HttpService("${rpc}/$apikeyChainstack")
                else -> InfuraHttpService("${rpc}/$apikeyInfura")
            }
        )
    }
}