package com.retypeme.project.chain

import com.retypeme.project.chain.contract.GamingContract
import com.retypeme.project.messaging.WinnerFinishedEvent
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import org.web3j.crypto.Credentials
import org.web3j.crypto.Hash
import org.web3j.protocol.Web3j
import org.web3j.protocol.core.DefaultBlockParameterName
import org.web3j.protocol.core.methods.response.TransactionReceipt
import org.web3j.protocol.infura.InfuraHttpService
import org.web3j.tx.RawTransactionManager
import org.web3j.tx.gas.DefaultGasProvider
import java.math.BigInteger

@Service
class SmartContractService {

    @Value("\${contract.address}")
    private val contractAddress: String? = null

    @Value("\${contract.private-key}")
    private val privateKey: String? = null

    @Value("\${contract.network}")
    private val network: String? = null

    @Value("\${contract.apikey}")
    private val apikey: String? = null


    @Value("\${contract.chain-id}")
    private val chainId: Long? = null


    private val logger = LoggerFactory.getLogger(SmartContractService::class.java)

    fun getBalance(): BigInteger {
        val networkUrl = getNetworkUrl()
        val web3 = Web3j.build(InfuraHttpService(networkUrl))

        val balance = web3.ethGetBalance(contractAddress, DefaultBlockParameterName.LATEST).send()
        logger.info("Balance: " + balance.balance)

        return balance.balance
    }

    private fun getNetworkUrl() = "https://$network.infura.io/v3/$apikey"

    fun getNetworkVersion(): String {
        val web3 = Web3j.build(InfuraHttpService(getNetworkUrl()))

        val version = web3.netVersion().send()
        logger.info("Network version: " + version.netVersion)

        return version.netVersion
    }

    @EventListener
    fun onSessionReady(winnerFinishedEvent: WinnerFinishedEvent) {
        endGame(winnerFinishedEvent.sessionId, winnerFinishedEvent.winnerId)
    }

    fun endGame(sessionId: String, winnerId: String) {
        logger.info("finishing game: $sessionId, winner: $winnerId")

        val web3 = Web3j.build(InfuraHttpService(getNetworkUrl()))

        val transactionManager = RawTransactionManager(web3, Credentials.create(privateKey), chainId ?: 80001);

        val contract = GamingContract.load(contractAddress, web3, transactionManager, DefaultGasProvider())

        logger.info("call endGame with parameters: session-id: $sessionId, winner-id: $winnerId")
        val transaction: TransactionReceipt = contract.endGame(prepareSessionKey(sessionId), winnerId).send()

        logger.info("Transaction finished: " + transaction.transactionHash)
    }

    private fun prepareSessionKey(sessionId: String): BigInteger {
        val hash = Hash.sha3String(sessionId)

        val sessionKey = BigInteger(hash.substring(2), 16);
        return sessionKey
    }
}