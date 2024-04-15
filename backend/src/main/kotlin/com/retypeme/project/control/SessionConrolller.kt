package com.retypeme.project.control

import com.retypeme.project.api.SessionsApi
import com.retypeme.project.model.Players
import com.retypeme.project.model.SessionResponse
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/sessions")
class SessionController(val sessionService: SessionService) : SessionsApi {

    @GetMapping("")
    @Operation(summary = "Get all sessions")
    override fun getAllSessions(): ResponseEntity<List<SessionResponse>> {
        val response = sessionService.getAllSessions()
        return ok(response)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get session by ID")
    override fun getSessionById(@PathVariable id: String): ResponseEntity<SessionResponse> {
        val response = sessionService.getSessionById(id)
        return ok(response)
    }

    @PostMapping("")
    @Operation(summary = "Create a new session")
    override fun createSession(@RequestBody players: Players): ResponseEntity<SessionResponse> {
        val response = sessionService.createSession(players.players, getChain())
        return ok(response)
    }

    private fun getChain(): Int {
        val context = SecurityContextHolder.getContext()
        val authentication = context.authentication
        if (!authentication.name.startsWith("0x") || !authentication.name.contains("|")) {
            return 0;
        }
        return authentication.name.split("|")[1].toInt()
    }


}