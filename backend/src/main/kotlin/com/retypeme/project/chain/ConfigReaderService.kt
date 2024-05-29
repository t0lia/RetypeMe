package com.retypeme.project.chain

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.springframework.stereotype.Service

@Service
class ConfigReaderService {
    val config: String =
        """
  chains:
 
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