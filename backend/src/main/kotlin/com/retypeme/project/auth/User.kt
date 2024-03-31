package com.retypeme.project.auth

import com.moonstoneid.siwe.util.Utils.generateNonce

data class User(
    val address: String,
    var nonce: String = generateNonce()
) {
    fun changeNonce() {
        nonce = generateNonce()
    }

}
