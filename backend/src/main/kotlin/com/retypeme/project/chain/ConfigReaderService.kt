package com.retypeme.project.chain

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.springframework.stereotype.Service

@Service
class ConfigReaderService {
    val config: String =
        """
  chains:
 
  - id: 168587773
    name: blast-sepolia
    rpc: "https://blast-sepolia.infura.io/v3"
    contract: "0xb3c33b58de859a5e06aff62c9d66319c256218da"
    
  - id: 84532
    name: base-sepolia
    rpc: "https://sepolia.base.org"
    contract: "0xb4eb30e7f583d788a1611f4b7022bdda4bd4af81"
 
  - id: 5611
    name: opbnb-testnet-rpc
    rpc: "https://opbnb-testnet-rpc.bnbchain.org"
    contract: "0x247e2bee76ec31c1a4caaf06600a80ffd6774dd6"
    
""".trimIndent()

    fun readChainConfig(): ChainConfig {
        val objectMapper = ObjectMapper(YAMLFactory())
        return objectMapper.readValue(config, ChainConfig::class.java)
    }
}