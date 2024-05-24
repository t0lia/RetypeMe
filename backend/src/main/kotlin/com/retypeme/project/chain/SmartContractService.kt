package com.retypeme.project.chain

import com.retypeme.project.control.SessionService
import com.retypeme.project.messaging.WinnerFinishedEvent
import com.retypeme.project.model.SessionResponse
import com.retypeme.project.statistic.model.StatisticModel
import com.retypeme.project.statistic.repository.StatisticRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import org.web3j.crypto.Hash
import org.web3j.protocol.core.methods.response.TransactionReceipt
import xyz.retypeme.sc.GamingContract
import java.math.BigInteger

@Service
class SmartContractService(
    val chainService: ChainService,
    val sessionService: SessionService,
    val web3jBuilder: Web3jBuilder,
    val statisticRepository: StatisticRepository
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
        contract.subscribeToGameEndedEvents { onGameEndedEvent(it, winnerId) }

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

    private fun onGameEndedEvent(event: GamingContract.GameEndedEventResponse, winnerId: String) {
        val existingStatistic = statisticRepository.findById(event.winner)
        if (winnerId != event.winner) {
            return
        }
        val updatedStatistic = existingStatistic?.copy(
            overallWinsInDuels = existingStatistic.overallWinsInDuels + event.winnings.toInt()
        )
            ?: StatisticModel(
                userId = event.winner,
                completedDuels = 0,
                averageSpeed = 0.0,
                totalReward = 0.0,
                overallWinsInDuels = event.winnings.toInt(),
                maxSpeed = 0.0,
                topSpeeds = mutableListOf()
            )
        statisticRepository.save(updatedStatistic)
    }

    private fun getContract(session: SessionResponse): SmartContractWrapper {
        val chainId: Int = session.chain ?: 0

        val chain = chainService.getChainById(chainId)
        val web3j = web3jBuilder.getWeb3j(chain.rpc, chainId.toLong())
        return SmartContractWrapper(chain.contract, privateKey!!, chainId.toLong(), web3j)
    }

    private fun prepareSessionKey(sessionId: String): BigInteger {
        val hash = Hash.sha3String(sessionId)
        return BigInteger(hash.substring(2), 16)
    }
}
