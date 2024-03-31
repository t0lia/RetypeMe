package com.retypeme.project.auth.metamask

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.moonstoneid.siwe.SiweMessage
import com.moonstoneid.siwe.error.SiweException
import com.retypeme.project.auth.UserRepository
import com.retypeme.project.auth.VerificationRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component

@Component
class MetaMaskAuthenticationProvider : AbstractUserDetailsAuthenticationProvider() {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Throws(AuthenticationException::class)
    override fun additionalAuthenticationChecks(userDetails: UserDetails, auth: UsernamePasswordAuthenticationToken) {
        auth as MetaMaskAuthenticationRequest
        userDetails as MetaMaskUserDetails

        val verificationRequest: VerificationRequest = jacksonObjectMapper().readValue(auth.getVerificationBody())
        val message: SiweMessage = SiweMessage.Parser().parse(verificationRequest.message);

        try {
//            message.verify(message.domain, userDetails.nonce, verificationRequest.signature)
            message.verify(message.domain, message.nonce, verificationRequest.signature)
        } catch (e: SiweException) {
            throw BadCredentialsException("Signature is not valid", e)
        }
    }

    @Throws(AuthenticationException::class)
    override fun retrieveUser(username: String?, authentication: UsernamePasswordAuthenticationToken): UserDetails {
        val auth = authentication as MetaMaskAuthenticationRequest
        val user = userRepository.getUser(auth.getAddress())
        return MetaMaskUserDetails(auth.getAddress(), auth.getVerificationBody(), user.nonce)
    }

}
