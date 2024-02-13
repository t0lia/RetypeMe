package com.retypeme.project.auth

import com.apozdniakov.cryptoauth.MetaMaskAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.context.HttpSessionSecurityContextRepository


@Configuration
@EnableWebSecurity
class SecurityConfig (val userRepository: UserRepository ){

    @Bean
    fun authenticationManager(myAuthenticationProviders: List<AuthenticationProvider>): AuthenticationManager {
        return ProviderManager(myAuthenticationProviders)
    }

    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity, authenticationManager: AuthenticationManager): SecurityFilterChain {
        return http
            .authorizeHttpRequests(Customizer { customizer  ->
                customizer
                    .requestMatchers(HttpMethod.GET, "/nonce/*").permitAll()
                    .requestMatchers("/public/**").permitAll()
                    .anyRequest().authenticated()
            })
            .formLogin { customizer: FormLoginConfigurer<HttpSecurity?> ->
                customizer.loginPage("/login")
                    .failureUrl("/login?error=true")
                    .permitAll()
            }
            .logout { customizer: LogoutConfigurer<HttpSecurity?> ->
                customizer.logoutUrl(
                    "/logout"
                )
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
