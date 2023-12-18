package com.retypeme.backend.conroller.websock

import com.retypeme.backend.conroller.websock.model.UserStat
import com.retypeme.backend.service.CountDownService
import com.retypeme.backend.service.SessionService
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller

@Controller
class GameController(private val simpMessagingTemplate: SimpMessagingTemplate,
                     private val countDownService: CountDownService,
                     private val sessionService: SessionService) {

    @MessageMapping("/stat")
    fun receiveStat(userStat: UserStat) {
        simpMessagingTemplate.convertAndSend("/topic/${userStat.sessionId}/progress", sessionService.updateProgress(userStat))
    }

    @Scheduled(fixedRate = 1000)
    fun countDown() {
        countDownService.countDown()
                .map { simpMessagingTemplate.convertAndSend("/topic/${it.id}/countdown", it) }
    }
}