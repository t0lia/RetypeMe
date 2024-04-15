package com.retypeme.project.auth.metamask

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

class MetaMaskAuthenticationRequest(addressChain: String, signature: String) :
    UsernamePasswordAuthenticationToken(addressChain, signature) {

    init {
        isAuthenticated = false
    }

    fun getId():String = (principal as String)

    fun getAddress(): String = (principal as String).split("|")[0]

    fun getChain(): Int = (principal as String).split("|")[1].toInt()

    fun getVerificationBody(): String = credentials as String
}
