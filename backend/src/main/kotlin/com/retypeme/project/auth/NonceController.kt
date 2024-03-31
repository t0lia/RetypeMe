package com.retypeme.project.auth

import com.moonstoneid.siwe.util.Utils.generateNonce
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class NonceController(val userRepository: UserRepository) {

    @GetMapping("/nonce")
    fun getNonce(): ResponseEntity<String> {
        val context = SecurityContextHolder.getContext()
        val authentication = context.authentication
        if (authentication.name.startsWith("0x")) {
            val user: User = userRepository.getUser(authentication.name)
            return ResponseEntity.ok(user.nonce)
        }
        return ResponseEntity.ok(generateNonce())
    }
}
