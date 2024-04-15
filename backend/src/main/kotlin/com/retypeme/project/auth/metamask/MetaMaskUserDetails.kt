package com.retypeme.project.auth.metamask

import org.springframework.security.core.userdetails.User

class MetaMaskUserDetails(id: String, signature: String, val nonce: String) :
    User(id, signature, emptyList()) {
    val id: String
        get() = username
}
