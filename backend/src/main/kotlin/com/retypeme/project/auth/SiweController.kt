package com.retypeme.project.auth

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SiweController {
    @RequestMapping("/siwe/session")
    fun api(): SiweSession {
        val context = SecurityContextHolder.getContext()
        val authentication = context.authentication
        if (authentication.name.startsWith("0x")) {
            return SiweSession(authentication.name, 80002)
        }
        return SiweSession(null,null)
    }
}