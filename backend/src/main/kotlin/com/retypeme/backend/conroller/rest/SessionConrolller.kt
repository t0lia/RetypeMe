package com.retypeme.backend.conroller.rest

import com.retypeme.backend.api.SessionsApi
import com.retypeme.backend.model.JoinSessionResponse
import com.retypeme.backend.model.Players
import com.retypeme.backend.model.SessionResponse
import com.retypeme.backend.service.SessionService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/sessions")
class SessionController(val sessionService: SessionService) : SessionsApi {

    @GetMapping("")
    @Operation(summary = "Get all sessions")
    override fun getAllSessions(): ResponseEntity<List<SessionResponse>> {
        return ResponseEntity.ok(sessionService.getAllSessions())
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get session by ID")
    override fun getSessionById(@RequestParam id: String): ResponseEntity<SessionResponse> {
        return ResponseEntity.ok(sessionService.getSessionById(id))
    }

    @PostMapping("")
    @Operation(summary = "Create a new session")
    override fun createSession(@RequestBody players: Players): ResponseEntity<SessionResponse> {
        return ResponseEntity.ok(sessionService.createSession(players.players))
    }

    @PostMapping("{id}/join")
    @Operation(summary = "Join a session")
    override fun joinSession(@PathVariable id: String): ResponseEntity<JoinSessionResponse> {
        return ResponseEntity.ok(sessionService.joinSession(id))
    }
}