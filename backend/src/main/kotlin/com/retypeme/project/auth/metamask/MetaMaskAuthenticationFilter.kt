package com.retypeme.project.auth.metamask

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import java.util.stream.Collectors
import com.fasterxml.jackson.databind.ObjectMapper



class MetaMaskAuthenticationFilter : AbstractAuthenticationProcessingFilter(AntPathRequestMatcher("/login", "POST")) {

    @Throws(AuthenticationException::class)
    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        val authRequest = getAuthRequest(request)
        authRequest.details = authenticationDetailsSource.buildDetails(request)
        return authenticationManager.authenticate(authRequest)
    }

    private fun getAuthRequest(request: HttpServletRequest): UsernamePasswordAuthenticationToken {
        val body: String = request.reader.lines().collect(Collectors.joining(System.lineSeparator()))
        val map = ObjectMapper().readValue(body, Map::class.java)

        val address = map["address"] as String
        val signature = map["signature"] as String
        return MetaMaskAuthenticationRequest(address, signature)
    }

    private fun obtainAddress(request: HttpServletRequest): String? =
        request.getParameter("address")

    private fun obtainSignature(request: HttpServletRequest): String? =
        request.getParameter("signature")
}
