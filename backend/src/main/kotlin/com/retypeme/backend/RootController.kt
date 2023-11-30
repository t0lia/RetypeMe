package com.retypeme.backend

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/sessions")
class SessionController {

    private val sessionList = mutableListOf<SessionResponse>()

    @GetMapping("")
    @Operation(summary = "Get all sessions")
    fun getAllSessions(): List<SessionResponse> {
        return sessionList
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get session by ID")
    fun getSessionById(
            @Parameter(description = "Session ID")
            @RequestParam id: String
    ): SessionResponse? {
        return sessionList.find { it.id == id }
    }

    @PostMapping("")
    @Operation(summary = "Create a new session")
    fun createSession(): SessionResponse {
        val session = SessionResponse(id = UUID.randomUUID().toString())
        sessionList.add(session)
        return session
    }
}