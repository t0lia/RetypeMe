package com.retypeme.project.auth

import com.retypeme.project.chain.ChainService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SiweController(val chainService: ChainService) {
    @RequestMapping("/siwe/session")
    fun api(): SiweSession {
        val context = SecurityContextHolder.getContext()
        val authentication = context.authentication
        if (authentication.name.startsWith("0x")) {
            return SiweSession(authentication.name,  chainService.getChainId())
        }
        return SiweSession(null,null)
    }
}