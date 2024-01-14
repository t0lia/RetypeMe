package com.retypeme.backend

import com.retypeme.backend.contract.Acc
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import org.web3j.crypto.Credentials
import org.web3j.protocol.Web3j
import org.web3j.protocol.http.HttpService
import org.web3j.tx.Contract.GAS_LIMIT
import org.web3j.tx.Contract.GAS_PRICE
import java.math.BigInteger

class Runner : CommandLineRunner {

    @Value("\${contract.address}")
    private val contractAddress: String? = null

    @Value("\${contract.private-key}")
    private val privateKey: String? = null

    private val logger = LoggerFactory.getLogger(Runner::class.java)

    override fun run(vararg args: String?) {
        val web3 = Web3j.build(HttpService())
        val web3ClientVersion = web3.web3ClientVersion().send()
        val clientVersion = web3ClientVersion.web3ClientVersion
        logger.info("Client version: $clientVersion")

        val contract = Acc.load(contractAddress, web3, Credentials.create(privateKey), GAS_PRICE, GAS_LIMIT)

        var result = contract.myValue().send()
        logger.info("Result of myValue(): $result")

        val newValue = BigInteger.valueOf(42)
        contract.addValue(newValue).send()

        result = contract.myValue().send()
        logger.info("Updated result of getSomeValue(): $result")
    }
}