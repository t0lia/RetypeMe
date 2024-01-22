package com.retypeme.backend.info

import com.retypeme.backend.service.SmartContractService
import org.springframework.boot.actuate.info.Info
import org.springframework.boot.actuate.info.InfoContributor
import org.springframework.stereotype.Component

@Component
class ContractInfoContributor(private val smartContractService: SmartContractService) : InfoContributor {

    override fun contribute(builder: Info.Builder) {
        builder.withDetail("smart-contract", getSmartContractInfo())
    }

    private fun getSmartContractInfo(): Map<String, Any> {
        val infoMap = mutableMapOf<String, Any>()

        infoMap["balance"] =  "unavailable"
        infoMap["networkVersion"] = "unavailable"
        return infoMap
    }
}