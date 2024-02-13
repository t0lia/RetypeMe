package com.retypeme.project

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.socket.config.annotation.*

@SpringBootApplication
@EnableWebSocketMessageBroker
@EnableScheduling
class BackendApplication(@Value("\${application.cors.allowed-origins}") val corsAllowedOrigin: String) :
    WebSocketMessageBrokerConfigurer {

    override fun configureMessageBroker(config: MessageBrokerRegistry) {
        config.enableSimpleBroker("/topic")
        config.setApplicationDestinationPrefixes("/app")
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/ws").setAllowedOrigins(corsAllowedOrigin)
    }

    @Bean
    fun corsConfigurer(
        @Value("\${application.cors.allowed-origins}") corsAllowedOrigin: String): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins(corsAllowedOrigin)
                    .allowedMethods("*")
            }
        }
    }
}
//@JvmStatic
fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}
