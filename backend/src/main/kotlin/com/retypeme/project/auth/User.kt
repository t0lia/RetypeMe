package com.retypeme.project.auth

import com.moonstoneid.siwe.util.Utils.generateNonce
import java.io.Serializable

data class User(
    val address: String,
    var nonce: String = generateNonce()
) : Serializable {
    fun changeNonce() {
        nonce = generateNonce()
    }

}
