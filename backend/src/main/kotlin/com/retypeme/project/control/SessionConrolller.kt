package com.retypeme.project.control

import com.retypeme.project.api.SessionsApi
import com.retypeme.project.model.JoinSessionResponse
import com.retypeme.project.model.Players
import com.retypeme.project.model.SessionResponse
import com.retypeme.project.model.UserJoinRequest
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
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
    override fun getSessionById(@RequestParam id: String): ResponseEntity<SessionResponse> {
        val response = sessionService.getSessionById(id)
        return ok(response)
    }

    @PostMapping("")
    @Operation(summary = "Create a new session")
    override fun createSession(@RequestBody players: Players): ResponseEntity<SessionResponse> {
        val response = sessionService.createSession(players.players)
        return ok(response)
    }

//    @PostMapping("{id}/join")
//    @Operation(summary = "Join a session")
//    override fun joinSession(@PathVariable id: String, @RequestBody userJoinRequest: UserJoinRequest): ResponseEntity<JoinSessionResponse> {
//        val response = sessionService.joinSession(id, userJoinRequest.userId)
//        return ok(response)
//    }
}