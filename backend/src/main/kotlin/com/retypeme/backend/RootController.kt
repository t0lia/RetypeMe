package com.retypeme.backend

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class RootController {

    private val sessionList = mutableListOf<SessionResponse>()

    @CrossOrigin(origins = ["*"])
    @GetMapping("")
    fun getAllSessions(): List<SessionResponse> {
        return sessionList
    }

    @CrossOrigin(origins = ["*"])
    @GetMapping("/{id}")
    fun getSessionById(id: String): SessionResponse? {
        return sessionList.find { it.id == id }
    }

    @CrossOrigin(origins = ["*"])
    @PostMapping("")
    fun createSession(): SessionResponse {
        val session = SessionResponse(id = UUID.randomUUID().toString())
        sessionList.add(session)
        return session
    }
}