package com.retypeme.backend.service

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class CountDownScheduleTask(private val countDownService: CountDownService) {

    @Scheduled(fixedRate = 1000)
    fun countDown() {
        countDownService.countDown()
    }
}