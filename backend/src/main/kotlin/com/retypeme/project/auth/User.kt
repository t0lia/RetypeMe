package com.retypeme.project.auth

data class User(
    val address: String,
    var nonce: Int = (Math.random() * 1000000).toInt()
) {
    fun changeNonce() {
        nonce = (Math.random() * 1000000).toInt()
    }
}
