package com.retypeme.backend.service

import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class DateTimeProvider {
    fun now(): LocalDateTime {
        return LocalDateTime.now()
    }
}