package com.retypeme.project.chain

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class ChainService(private val configReaderService: ConfigReaderService) {

    @Value("\${contract.chains}")
    private lateinit var chains: List<Int>

    fun getChains(): List<ChainItemConfig> {
        return configReaderService.readChainConfig().chains
    }

    fun getChainById(id: Int): ChainItemConfig {
        return getChains().first { it.id == id }
    }

    fun getMainChain(): ChainItemConfig {
        val first = chains.first()
        return getChains().first { it.id == first }
    }

    fun getAddress(): String {
        return getMainChain().contract
    }

    fun getChainId(): Int {
        return getMainChain().id
    }

    fun getChainName(): String {
        return getMainChain().name
    }
}