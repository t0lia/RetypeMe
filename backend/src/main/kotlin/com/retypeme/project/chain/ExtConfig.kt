package com.retypeme.project.chain

import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration


@Configuration
@EnableConfigurationProperties(ChainSettings::class)
class ExtConfig {
}