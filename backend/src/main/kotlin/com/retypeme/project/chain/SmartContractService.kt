package com.retypeme.project.chain

import com.retypeme.project.control.SessionService
import com.retypeme.project.messaging.WinnerFinishedEvent
import com.retypeme.project.model.SessionResponse
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import org.web3j.crypto.Hash
import org.web3j.protocol.core.methods.response.TransactionReceipt
import java.math.BigInteger

@Service
class SmartContractService(
    val chainService: ChainService,
    val sessionService: SessionService,
    val web3jBuilder: Web3jBuilder
) {

    @Value("\${contract.private-key}")
    private val privateKey: String? = null

    private val logger = LoggerFactory.getLogger(SmartContractService::class.java)

    @EventListener
    fun onSessionReady(winnerFinishedEvent: WinnerFinishedEvent) {
        endGame(winnerFinishedEvent.sessionId, winnerFinishedEvent.winnerId)
    }

    fun endGame(sessionId: String, winnerId: String) {
        logger.info("finishing game: $sessionId, winner: $winnerId")
        val session = sessionService.getSessionById(sessionId)
        val contract = getContract(session)

        logger.info("call endGame with parameters: session-id: $sessionId, winner-id: $winnerId")
        try {
            val transaction: TransactionReceipt = contract.endGame(prepareSessionKey(sessionId), winnerId)
            if (!transaction.isStatusOK) {
                logger.error("Transaction failed: " + transaction.transactionHash)
            }
            logger.info("Transaction finished: " + transaction.transactionHash)
        } catch (e: Exception) {
            logger.error("Error while calling endGame: " + e.message)
        }
    }

    private fun getContract(session: SessionResponse): SmartContractWrapper {
        val chainId: Int = session.chain ?: 0

        val chain = chainService.getChainById(chainId)
        val web3j = web3jBuilder.getWeb3j(chain.rpc, chainId.toLong())
        val contract = SmartContractWrapper(chain.contract, privateKey!!, chainId.toLong(), web3j)
        return contract
    }

    private fun prepareSessionKey(sessionId: String): BigInteger {
        val hash = Hash.sha3String(sessionId)

        val sessionKey = BigInteger(hash.substring(2), 16);
        return sessionKey
    }
}