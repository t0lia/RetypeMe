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

    fun getChainByName(name: String): ChainItemConfig {
        return getChains().first { it.name == name }
    }

    fun getChainById(id: Int): ChainItemConfig {
        return getChains().first { it.id == id }
    }

}