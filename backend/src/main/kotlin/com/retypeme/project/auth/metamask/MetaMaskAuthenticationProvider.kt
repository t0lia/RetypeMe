package com.retypeme.project.auth.metamask

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.moonstoneid.siwe.SiweMessage
import com.moonstoneid.siwe.error.SiweException
import com.retypeme.project.auth.UserRepository
import com.retypeme.project.auth.VerificationRequest
import com.retypeme.project.chain.ChainItemConfig
import com.retypeme.project.chain.ConfigReaderService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import org.web3j.protocol.Web3j
import org.web3j.protocol.http.HttpService

@Component
class MetaMaskAuthenticationProvider : AbstractUserDetailsAuthenticationProvider() {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var configReaderService: ConfigReaderService

    @Throws(AuthenticationException::class)
    override fun additionalAuthenticationChecks(userDetails: UserDetails, auth: UsernamePasswordAuthenticationToken) {
        auth as MetaMaskAuthenticationRequest
        userDetails as MetaMaskUserDetails

        val verificationRequest: VerificationRequest = jacksonObjectMapper().readValue(auth.getVerificationBody())
        val message: SiweMessage = SiweMessage.Parser().parse(verificationRequest.message);

        try {
            val rpc = configReaderService.readChainConfig().chains.filter { item -> item.id == message.chainId }
                .map { item -> item.rpc }
                .first()

            val provider: Web3j = Web3j.build(HttpService(rpc));

            message.verify(message.domain, message.nonce, verificationRequest.signature, provider)
        } catch (e: SiweException) {
            throw BadCredentialsException("Signature is not valid", e)
        }
    }

    @Throws(AuthenticationException::class)
    override fun retrieveUser(username: String?, authentication: UsernamePasswordAuthenticationToken): UserDetails {
        val auth = authentication as MetaMaskAuthenticationRequest
        val user = userRepository.getUser(auth.getId())
        return MetaMaskUserDetails(auth.getId(), auth.getVerificationBody(), user.nonce)
    }

}
