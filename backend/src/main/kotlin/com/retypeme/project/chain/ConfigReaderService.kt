package com.retypeme.project.chain

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Service
import java.io.File

@Service
class ConfigReaderService {
    fun readChainConfig(): ChainConfig {
        val objectMapper = ObjectMapper(YAMLFactory())
        val resource: String = """chains:
  - id: 534351
    name: scroll-sepolia
    rpc: "https://scroll-sepolia.core.chainstack.com"
    infura: false
    contract: "0x078869dd68d019900098b5b1006951ea7b3f01f2"
  - id: 5611
    name: opbnb-testnet
    rpc: "https://opbnb-testnet-rpc.bnbchain.org"
    infura: false
    contract: "0x83da278c942eefe7a77db1a28863e57a490625ed"
  - id: 80002
    name: polygon-amoy
    rpc: "https://polygon-amoy.infura.io/v3"
    infura: true
    contract: "0x993558c22ebe07c96e8f85d1ef4318c513abff0d"
  - id: 31337
    name: etherium-sepolia
    rpc: "https://sepolia.infura.io/v3"
    infura: true
    contract: "0x0000000000000000000000000000000000000000"
  - id: 168587773
    name: blast-sepolia
    rpc: "https://blast-sepolia.infura.io/v3"
    infura: true
    contract: "0xb3c33b58de859a5e06aff62c9d66319c256218da"
        """.trimIndent()
        return objectMapper.readValue(resource, ChainConfig::class.java)
    }
    fun readChainConfigShort(): ChainSmartConfig {
        val objectMapper = ObjectMapper(YAMLFactory())
        val resource: String = """chains:
  - id: 534351
    name: scroll-sepolia
    rpc: "https://scroll-sepolia.core.chainstack.com"
  - id: 80002
    name: polygon-amoy
    rpc: "https://polygon-amoy.infura.io/v3"
  - id: 31337
    name: etherium-sepolia
    rpc: "https://sepolia.infura.io/v3"
  - id: 168587773
    name: blast-sepolia
    rpc: "https://blast-sepolia.infura.io/v3"
        """.trimIndent()
        return objectMapper.readValue(resource, ChainSmartConfig::class.java)
    }
}