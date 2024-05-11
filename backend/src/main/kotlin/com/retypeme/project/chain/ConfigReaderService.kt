package com.retypeme.project.chain

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.springframework.stereotype.Service

@Service
class ConfigReaderService {
    val config: String =
        """
  chains:
  
  - id: 534351
    name: scroll-sepolia
    rpc: "https://scroll-sepolia.core.chainstack.com"
    contract: "0x078869dd68d019900098b5b1006951ea7b3f01f2"
    
  - id: 5611
    name: opbnb-testnet-rpc
    rpc: "https://opbnb-testnet-rpc.bnbchain.org"
    contract: "0x1e3248d540B0c177047ec17592A42C5747F050a1"
    
  - id: 80002
    name: polygon-amoy
    rpc: "https://polygon-amoy.infura.io/v3"
    contract: "0x993558c22ebe07c96e8f85d1ef4318c513abff0d"
    
  - id: 168587773
    name: blast-sepolia
    rpc: "https://blast-sepolia.infura.io/v3"
    contract: "0xb3c33b58de859a5e06aff62c9d66319c256218da"
    
""".trimIndent()

    fun readChainConfig(): ChainConfig {
        val objectMapper = ObjectMapper(YAMLFactory())
        return objectMapper.readValue(config, ChainConfig::class.java)
    }
}