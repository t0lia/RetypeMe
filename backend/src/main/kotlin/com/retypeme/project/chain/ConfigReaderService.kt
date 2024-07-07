package com.retypeme.project.chain

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class ConfigReaderService(private val settings: ChainSettings) {

    @Value("\${contract.chains}")
    private lateinit var contractChains: List<Int>

    fun readChainConfig(): ChainConfig {
        return ChainConfig(settings.chains.filter { contractChains.contains(it.id) })
    }

}