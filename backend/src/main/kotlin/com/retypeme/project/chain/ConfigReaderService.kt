package com.retypeme.project.chain

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Service

@Service
class ConfigReaderService {
    fun readChainConfig(): ChainConfig {
        val objectMapper = ObjectMapper(YAMLFactory())
        val resource = ClassPathResource("chains.yml").file
        return objectMapper.readValue(resource, ChainConfig::class.java)
    }
}