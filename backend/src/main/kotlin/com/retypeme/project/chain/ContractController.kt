package com.retypeme.project.chain

import com.retypeme.project.chain.contract.GamingContract
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ContractController {

    @Value("\${contract.address}")
    private val contractAddress: String? = null

    @RequestMapping("/contract/abi")
    fun abi(): String {
        return AbiProvider().getAbi(GamingContract::class.java);
    }

    @RequestMapping("/contract/address")
    fun address(): String? {
        return contractAddress;
    }
}