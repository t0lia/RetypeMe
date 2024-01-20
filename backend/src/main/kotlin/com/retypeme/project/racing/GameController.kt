package com.retypeme.project.racing

import com.retypeme.project.racing.model.CountDown
import com.retypeme.project.racing.model.SessionStat
import com.retypeme.project.racing.model.UserStat
import com.retypeme.project.common.service.CountDownService
import com.retypeme.project.common.service.SessionService
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
        val response: SessionStat = sessionService.updateProgress(userStat)
        logger.info("receive progress: ${userStat.progress} for user ${userStat.userId} in session ${userStat.sessionId}")

        logger.info("sending stat for session ${userStat.sessionId}")
        response.users.forEach { user -> logger.info("user ${user.id} progress: ${user.progress} place: ${user.place}") }
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