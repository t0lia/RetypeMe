package com.retypeme.project.auth.metamask

import org.springframework.security.core.userdetails.User


class MetaMaskUserDetails(address: String, signature: String, val nonce: Int) :
    User(address, signature, emptyList()) {
    val address: String
        get() = username
}
