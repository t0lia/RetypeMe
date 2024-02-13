package com.retypeme.project.auth

import com.apozdniakov.cryptoauth.User
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
class NonceController (val userRepository: UserRepository){

    @GetMapping("/nonce/{address}")
    fun getNonce(@PathVariable address: String): ResponseEntity<Int> {
        val user: User = userRepository.getUser(address)
        return ResponseEntity.ok(user.nonce)
    }
}
