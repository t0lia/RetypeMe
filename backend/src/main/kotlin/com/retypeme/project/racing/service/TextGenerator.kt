package com.retypeme.project.racing.service

import org.springframework.stereotype.Service

@Service
class TextGenerator {

    val sentences = listOf(
        "scroll pulls together research and engineering from blockchain protocols and zero knowledge cryptography",
        "scroll is compatible with evm bytecode and designed to feel just like developing on ethereum",
        "scroll is more accessible more responsive and can support more users at once than ethereum alone",
        "scroll stores additional information of the contract bytecode in the account to facilitate the zkevm circuit to prove the state transition more efficiently",
        "scroll gains its security and speed by executing transactions offchain and also producing a cryptographic proof that the transactions were executed correctly"
    )

    fun generateText(): String {
        return sentences.random()
    }
}