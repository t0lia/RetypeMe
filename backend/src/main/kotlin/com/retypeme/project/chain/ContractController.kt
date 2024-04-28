package com.retypeme.project.chain

import com.retypeme.project.chain.contract.GamingContract
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ContractController(val chainService: ChainService) {

    @Value("\${contract.chains}")
    private lateinit var chains: List<Int>

    @RequestMapping("/contract/abi")
    fun abi(): String {
        return AbiProvider().getAbi(GamingContract::class.java);
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