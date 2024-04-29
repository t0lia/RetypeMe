package com.retypeme.project.chain

import com.retypeme.project.chain.contract.GamingContract
import com.retypeme.project.control.SessionService
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
import org.web3j.protocol.http.HttpService
import org.web3j.protocol.infura.InfuraHttpService
import org.web3j.tx.RawTransactionManager
import org.web3j.tx.gas.DefaultGasProvider
import java.math.BigInteger

@Service
class SmartContractService(val chainService: ChainService, val sessionService: SessionService) {

    @Value("\${contract.private-key}")
    private val privateKey: String? = null

    @Value("\${contract.apikey.infura}")
    private val apikeyInfura: String? = null

    @Value("\${contract.apikey.chainstack}")
    private val apikeyChainstack: String? = null



    private val logger = LoggerFactory.getLogger(SmartContractService::class.java)

    fun getBalance(chainId: Int): BigInteger {
        val networkUrl = getNetworkUrl(chainId)
        val web3 = Web3j.build(InfuraHttpService(networkUrl))

        val balance = web3.ethGetBalance(chainService.getChainById(chainId).contract, DefaultBlockParameterName.LATEST).send()
        logger.info("Balance: " + balance.balance)

        return balance.balance
    }

    fun getNetworkUrl(chainId: Int): String {
        val chainConfig = chainService.getChainById(chainId)
        return if (chainConfig.infura) {
            "${chainConfig.rpc}/$apikeyInfura"
        } else {
            "${chainConfig.rpc}/$apikeyChainstack"
        }
    }

    @EventListener
    fun onSessionReady(winnerFinishedEvent: WinnerFinishedEvent) {
        endGame(winnerFinishedEvent.sessionId, winnerFinishedEvent.winnerId)
    }

    fun endGame(sessionId: String, winnerId: String) {
        logger.info("finishing game: $sessionId, winner: $winnerId")
        val session = sessionService.getSessionById(sessionId)
        val chainId: Int = session.chain ?: 0
        val httpService =
            if (chainId == 534351) HttpService(getNetworkUrl(chainId)) else InfuraHttpService(getNetworkUrl(chainId))
        val web3 = Web3j.build(httpService)

        val transactionManager =
            RawTransactionManager(web3, Credentials.create(privateKey), chainId.toLong());

        val contract: GamingContract =
            GamingContract.load(chainService.getChainById(chainId).contract, web3, transactionManager, DefaultGasProvider())

        logger.info("call endGame with parameters: session-id: $sessionId, winner-id: $winnerId")
        try {
            val transaction: TransactionReceipt = contract.endGame(prepareSessionKey(sessionId), winnerId).send()
            if (!transaction.isStatusOK) {
                logger.error("Transaction failed: " + transaction.transactionHash)
            }
            logger.info("Transaction finished: " + transaction.transactionHash)
        } catch (e: Exception) {
            logger.error("Error while calling endGame: " + e.message)
        }

    }

    private fun prepareSessionKey(sessionId: String): BigInteger {
        val hash = Hash.sha3String(sessionId)

        val sessionKey = BigInteger(hash.substring(2), 16);
        return sessionKey
    }
}