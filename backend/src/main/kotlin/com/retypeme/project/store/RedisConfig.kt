package com.retypeme.project.store

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.RedisConnectionFactory
import org.springframework.data.redis.connection.RedisPassword
import org.springframework.data.redis.connection.RedisStandaloneConfiguration
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer

@Configuration
class RedisConfig {

    @Bean
    fun redisConnectionFactory(
        @Value("\${spring.data.redis.host}") host: String,
        @Value("\${spring.data.redis.port}") port: Int,
        @Value("\${spring.data.redis.password}") password: String,
    ): RedisConnectionFactory {
        val config = RedisStandaloneConfiguration(host, port)
        config.password = RedisPassword.of(password)
        return LettuceConnectionFactory(config)
    }

    @Bean
    fun <T> redisTemplate(redisConnectionFactory: RedisConnectionFactory): RedisTemplate<String, T> {
        val template = RedisTemplate<String, T>()
        template.connectionFactory = redisConnectionFactory

        // Configure the ObjectMapper
        val objectMapper = ObjectMapper()
            .registerModule(KotlinModule.Builder().build())
            .registerModule(JavaTimeModule())
            .activateDefaultTyping(
                BasicPolymorphicTypeValidator.builder()
                    .allowIfBaseType(Any::class.java)
                    .build(), ObjectMapper.DefaultTyping.EVERYTHING
            )

        val serializer = GenericJackson2JsonRedisSerializer(objectMapper)
        template.keySerializer = serializer
        template.valueSerializer = serializer
        template.hashKeySerializer = serializer
        template.hashValueSerializer = serializer

        return template
    }
}