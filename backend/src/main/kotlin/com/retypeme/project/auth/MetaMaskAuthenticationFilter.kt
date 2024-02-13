package com.apozdniakov.cryptoauth

import com.retypeme.project.auth.MetaMaskAuthenticationRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher

class MetaMaskAuthenticationFilter : AbstractAuthenticationProcessingFilter(AntPathRequestMatcher("/login", "POST")) {
    companion object {
        const val SPRING_SECURITY_FORM_ADDRESS_KEY = "address"
        const val SPRING_SECURITY_FORM_SIGNATURE_KEY = "signature"
    }

    @Throws(AuthenticationException::class)
    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication {
        val authRequest = getAuthRequest(request!!)
        authRequest.details = authenticationDetailsSource.buildDetails(request)
        return authenticationManager.authenticate(authRequest)
    }

    private fun getAuthRequest(request: HttpServletRequest): UsernamePasswordAuthenticationToken {
        val address = obtainAddress(request) ?: ""
        val signature = obtainSignature(request) ?: ""
        return MetaMaskAuthenticationRequest(address, signature)
    }

    private fun obtainAddress(request: HttpServletRequest): String? =
        request.getParameter(SPRING_SECURITY_FORM_ADDRESS_KEY)

    private fun obtainSignature(request: HttpServletRequest): String? =
        request.getParameter(SPRING_SECURITY_FORM_SIGNATURE_KEY)
}
