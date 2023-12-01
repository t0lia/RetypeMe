package com.retypeme.backend

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/sessions")
class SessionController {

    private val sessionList = mutableListOf<SessionResponse>()

    @GetMapping("")
    @Operation(summary = "Get all sessions")
    fun getAllSessions(): ResponseEntity<List<SessionResponse>> {
        return ResponseEntity.ok(sessionList)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get session by ID")
    fun getSessionById(@Parameter(description = "Session ID") @RequestParam id: String): ResponseEntity<SessionResponse> {
        val session = sessionList.find { it.id == id } ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(session)
    }

    @PostMapping("")
    @Operation(summary = "Create a new session")
    fun createSession(): ResponseEntity<SessionResponse> {
        val session = SessionResponse(id = UUID.randomUUID().toString())
        sessionList.add(session)
        return ResponseEntity.ok(session)
    }

    @PostMapping("{id}/join")
    @Operation(summary = "Join a session")
    fun joinSession(@PathVariable id: String): ResponseEntity<JoinSessionResponse> {
        sessionList.find { it.id == id } ?: return ResponseEntity.notFound().build()
        val result = JoinSessionResponse(id, userId = UUID.randomUUID().toString())
        return ResponseEntity.ok(result)
    }
}