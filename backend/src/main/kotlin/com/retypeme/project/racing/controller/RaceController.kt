package com.retypeme.project.racing.controller

import com.retypeme.project.racing.model.CountDown
import com.retypeme.project.racing.service.CountDownService
import com.retypeme.project.racing.service.RaceService
import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller

@Controller
class RaceController(
    private val simpMessagingTemplate: SimpMessagingTemplate,
    private val countDownService: CountDownService,
    private val sessionService: RaceService
) {

    private val logger = LoggerFactory.getLogger(RaceController::class.java)

    @MessageMapping("/stat")
    fun receiveStat(racerIncomingStat: RacerIncomingStat) {
        val response: RaceStat = sessionService.updateProgress(racerIncomingStat)
        logger.info("receive progress: ${racerIncomingStat.progress} for user ${racerIncomingStat.userId} in session ${racerIncomingStat.sessionId}")

        logger.info("sending stat for session ${racerIncomingStat.sessionId}")
        response.users.forEach { user -> logger.info("user ${user.id} progress: ${user.progress} place: ${user.place}") }
        simpMessagingTemplate.convertAndSend("/topic/" + racerIncomingStat.sessionId + "/progress", response)
    }

    @Scheduled(fixedRate = 1000)
    fun countDown() {
        countDownService.countDown().map(::send)
    }

    private fun send(it: CountDown) {
        logger.info("Sending countdown for session ${it.id} with value ${it.count} and text ${it.text}")
        simpMessagingTemplate.convertAndSend("/topic/${it.id}/countdown", it)
    }
}