package com.retypeme.backend.conroller.websock

import com.retypeme.backend.conroller.websock.model.CountDown
import com.retypeme.backend.conroller.websock.model.UserStat
import com.retypeme.backend.service.CountDownService
import com.retypeme.backend.service.SessionService
import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller

@Controller
class GameController(
    private val simpMessagingTemplate: SimpMessagingTemplate,
    private val countDownService: CountDownService,
    private val sessionService: SessionService
) {

    private val logger = LoggerFactory.getLogger(GameController::class.java)

    @MessageMapping("/stat")
    fun receiveStat(userStat: UserStat) {
        val response = sessionService.updateProgress(userStat)
        logger.info("progress: ${userStat.progress}")
        simpMessagingTemplate.convertAndSend("/topic/" + userStat.sessionId + "/progress", response)
    }

    @Scheduled(fixedRate = 1000)
    fun countDown() {
        countDownService.countDown()
            .map(::send)
    }

    private fun send(it: CountDown) {
        logger.info("Sending countdown for session ${it.id} with value ${it.count} and text ${it.text}")
        simpMessagingTemplate.convertAndSend("/topic/${it.id}/countdown", it)
    }
}