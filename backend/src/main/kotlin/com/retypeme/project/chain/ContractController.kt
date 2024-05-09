package com.retypeme.project.chain

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import xyz.retypeme.sc.GamingContract
import java.io.IOException

@RestController
class ContractController(val chainService: ChainService) {

    @Value("\${contract.chains}")
    private lateinit var chains: List<Int>

    @RequestMapping("/contract/abi")
    fun abi(): String {
        val path = "/solidity/abi/" + GamingContract::class.java.canonicalName.replace(".", "/") + ".json"
        try {
            return GamingContract::class.java.getResourceAsStream(path)?.bufferedReader()?.readText()
                ?: throw RuntimeException("Failed to read ABI from path: $path")
        } catch (e: IOException) {
            throw RuntimeException("Failed to read ABI from path: $path", e)
        }
    }

    @RequestMapping("/contract/config")
    fun smartConfig(): SmartConfig {
        return chainService.getSmartConfig()
    }

    @RequestMapping("/contract/chain")
    fun chain(): List<ChainItemConfig> {
        println("chains: $chains")
        return chainService.getChains()
    }

    @RequestMapping("/contract/chains")
    fun chains(): List<Int> {
        return chains
    }
}