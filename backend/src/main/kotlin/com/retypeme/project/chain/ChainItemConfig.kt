package com.retypeme.project.chain

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty

data class ChainItemConfig @JsonCreator constructor(
    @JsonProperty("id") val id: Int,
    @JsonProperty("name") val name: String,
    @JsonProperty("infura") val infura: Boolean,
    @JsonProperty("rpc") val rpc: String,
    @JsonProperty("contract") val contract: String

)