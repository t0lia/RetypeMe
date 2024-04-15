package com.retypeme.project.auth

import com.retypeme.project.chain.ChainService
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SiweController {

    @RequestMapping("/siwe/session")
    fun api(): SiweSession {
        val context = SecurityContextHolder.getContext()
        val authentication: Authentication = context.authentication

        if (!authentication.name.startsWith("0x") || !authentication.name.contains("|")) {
            return SiweSession(null, null)
        }

        val address = authentication.name.split("|")[0]
        val chain = authentication.name.split("|")[1].toInt()
        return SiweSession(address, chain)
    }
}