package com.retypeme.project.chain

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import xyz.retypeme.sc.GamingContract
import java.io.IOException

@Service
class ChainService(private val configReaderService: ConfigReaderService) {

    @Value("\${contract.chains}")
    private lateinit var chains: List<Int>

    fun getChains(): List<ChainItemConfig> {
        return configReaderService.readChainConfig().chains
    }

    fun getChainsSmart(): List<ChainItem> {
        return configReaderService.readChainConfigShort().chains.filter { chains.contains(it.id) }
    }

    fun getChainByName(name: String): ChainItemConfig {
        return getChains().first { it.name == name }
    }

    fun getChainById(id: Int): ChainItemConfig {
        return getChains().first { it.id == id }
    }

    fun getSmartConfig(): SmartConfig {
        return SmartConfig("0x993558c22ebe07c96e8f85d1ef4318c513abff0d", getChainsSmart(), abi())
    }

    fun abi(): List<Any> {
        val path = "/solidity/abi/" + GamingContract::class.java.canonicalName.replace(".", "/") + ".json"
        try {
            val jsonText: String = GamingContract::class.java.getResourceAsStream(path)?.bufferedReader()?.readText()
                ?: throw RuntimeException("Failed to read ABI from path: $path")

            return jacksonObjectMapper().readValue<List<Any>>(jsonText)
        } catch (e: IOException) {
            throw RuntimeException("Failed to read ABI from path: $path", e)
        }
    }

}