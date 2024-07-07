package com.retypeme.project.chain

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "w3")
class ChainSettings {
    var chains: List<ChainItemConfig> = mutableListOf()
}