package com.retypeme.project.auth.metamask

import com.retypeme.project.auth.User
import com.retypeme.project.auth.UserRepository
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import java.io.IOException


class MetaMaskAuthenticationSuccessHandler(private val userRepository: UserRepository) :
    SimpleUrlAuthenticationSuccessHandler() {

    @Throws(ServletException::class, IOException::class)
    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        super.onAuthenticationSuccess(request, response, authentication)
        val principal: MetaMaskUserDetails = authentication.principal as MetaMaskUserDetails
        val user: User = userRepository.getUser(principal.address)
        user.changeNonce()
    }
}
