package com.retypeme.project.chain

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class ChainService(private val configReaderService: ConfigReaderService) {

    @Value("\${contract.chains}")
    private lateinit var chains: List<Long>

    fun getChains(): List<ChainItemConfig> {
        return configReaderService.readChainConfig().chains
    }

    fun getMainChain(): ChainItemConfig {
        val first = chains.first()
        return getChains().first { it.id == first }
    }

    fun getAddress(): String {
        return getMainChain().contract
    }

    fun getChainId(): Long {
        return getMainChain().id
    }

    fun getChainName(): String {
        return getMainChain().name
    }
}