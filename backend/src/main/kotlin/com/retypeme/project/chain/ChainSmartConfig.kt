package com.retypeme.project.chain

import com.fasterxml.jackson.annotation.JsonCreator

data class ChainSmartConfig(val chains: List<ChainItem>){
    @JsonCreator
    constructor() : this(emptyList())
}
