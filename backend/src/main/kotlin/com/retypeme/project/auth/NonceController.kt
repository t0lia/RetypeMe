package com.retypeme.project.auth

import com.moonstoneid.siwe.util.Utils.generateNonce
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
class NonceController (val userRepository: UserRepository){

    @GetMapping("/nonce")
    fun getNonce(): ResponseEntity<String> {
//        val user: User = userRepository.getUser(address)
        return ResponseEntity.ok(generateNonce())
    }
}
