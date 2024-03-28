package com.retypeme.project.auth.metamask

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.moonstoneid.siwe.SiweMessage
import com.retypeme.project.auth.VerificationRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import java.lang.System.lineSeparator
import java.util.stream.Collectors.joining


class MetaMaskAuthenticationFilter : AbstractAuthenticationProcessingFilter(AntPathRequestMatcher("/login", "POST")) {

    @Throws(AuthenticationException::class)
    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        val authRequest = getAuthRequest(request)
        authRequest.details = authenticationDetailsSource.buildDetails(request)
        return authenticationManager.authenticate(authRequest)
    }

    private fun getAuthRequest(request: HttpServletRequest): UsernamePasswordAuthenticationToken {
        val verificationBody: String = request.reader.lines().collect(joining(lineSeparator()))

        val verificationData: VerificationRequest = jacksonObjectMapper().readValue(verificationBody)
        val message: SiweMessage = SiweMessage.Parser().parse(verificationData.message);

        return MetaMaskAuthenticationRequest(message.address, verificationBody)
    }

}
