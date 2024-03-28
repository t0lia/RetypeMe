package com.retypeme.project.auth.metamask

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

class MetaMaskAuthenticationRequest(address: String, signature: String): UsernamePasswordAuthenticationToken(address, signature) {

    init {
        isAuthenticated = false
    }

    fun getAddress(): String = principal as String

    fun getVerificationBody(): String = credentials as String
}
