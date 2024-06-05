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
   
""".trimIndent()

    fun readChainConfig(): ChainConfig {
        val objectMapper = ObjectMapper(YAMLFactory())
        return objectMapper.readValue(config, ChainConfig::class.java)
    }
}