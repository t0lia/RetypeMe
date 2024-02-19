package com.retypeme.project.auth

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController {
    @RequestMapping("/auth")
    fun api(): AuthInfo {
        val context = SecurityContextHolder.getContext()
        val authentication = context.authentication
        if (authentication.name.startsWith("0x")) {
            return AuthInfo(authentication.name, true)
        }
        return AuthInfo(authentication.name, false)
    }
}