package com.retypeme.project.auth

import com.moonstoneid.siwe.util.Utils.generateNonce

data class User(
    val address: String,
    var nonce: String = "841X12iKVYs2eVRmt"//generateNonce()
) {
    fun changeNonce() {
        nonce= "841X12iKVYs2eVRmt"
//        nonce = generateNonce()
    }

}
