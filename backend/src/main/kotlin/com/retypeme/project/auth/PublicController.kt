package com.retypeme.project.auth

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class PublicController {
    @RequestMapping("/public")
    fun home(): String {
        val authentication = SecurityContextHolder.getContext().authentication
        val currentPrincipalName = authentication.name
        return "Hello $currentPrincipalName"
    }
}
