package com.retypeme.project.auth

import com.retypeme.project.auth.metamask.MetaMaskAuthenticationFilter
import com.retypeme.project.auth.metamask.MetaMaskAuthenticationSuccessHandler
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
class SecurityConfig(val userRepository: UserRepository) {

    @Bean
    fun authenticationManager(myAuthenticationProviders: List<AuthenticationProvider>): AuthenticationManager {
        return ProviderManager(myAuthenticationProviders)
    }

    fun corsConfigurationSource(corsAllowedOrigin: String): CorsConfigurationSource {
        val corsConfiguration = CorsConfiguration()
        //Make the below setting as * to allow connection from any hos
        corsConfiguration.allowedOrigins = listOf(corsAllowedOrigin)
        corsConfiguration.allowedMethods = listOf("*")
        corsConfiguration.allowedHeaders = listOf("*")
        corsConfiguration.allowCredentials = true
        corsConfiguration.maxAge = 3600L
        val source: UrlBasedCorsConfigurationSource = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", corsConfiguration)
        return source
    }

    @Bean
    @Throws(Exception::class)
    fun filterChain(
        http: HttpSecurity,
        authenticationManager: AuthenticationManager,
        @Value("\${application.cors.allowed-origins}") corsAllowedOrigin: String
    ): SecurityFilterChain {
        return http
            .cors { c -> c.configurationSource(corsConfigurationSource(corsAllowedOrigin)) }
            .authorizeHttpRequests { customizer ->
                customizer.requestMatchers("/**").permitAll().anyRequest().authenticated()
            }
            .logout { customizer -> customizer.logoutUrl("/logout")
                .logoutSuccessHandler((HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))
            }
            .csrf { obj: CsrfConfigurer<HttpSecurity> -> obj.disable() }
            .addFilterBefore(
                authenticationFilter(authenticationManager),
                UsernamePasswordAuthenticationFilter::class.java
            )
            .build()
    }

    private fun authenticationFilter(authenticationManager: AuthenticationManager): MetaMaskAuthenticationFilter {
        val filter = MetaMaskAuthenticationFilter()
        filter.setAuthenticationManager(authenticationManager)
        filter.setAuthenticationSuccessHandler(MetaMaskAuthenticationSuccessHandler(userRepository))
        filter.setAuthenticationFailureHandler(SimpleUrlAuthenticationFailureHandler("/login?error=true"))
        filter.setSecurityContextRepository(HttpSessionSecurityContextRepository())
        return filter
    }
}
