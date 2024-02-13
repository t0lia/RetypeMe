package com.retypeme.project.auth

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping


@Controller
class WebController {
    @RequestMapping("/")
    fun root(): String {
        return "index"
    }

    @RequestMapping("/login")
    fun login(): String {
        return "login"
    }
}
