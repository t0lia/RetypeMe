package com.retypeme.project.auth

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class RestController {
    @RequestMapping("/api")
    fun api(): String {
        val authentication = SecurityContextHolder.getContext().authentication
        val currentPrincipalName = authentication.name
        return "Hello $currentPrincipalName"
    }
}
