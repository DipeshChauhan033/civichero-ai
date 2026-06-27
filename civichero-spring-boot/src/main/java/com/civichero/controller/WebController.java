package com.civichero.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("appName", "CivicHero AI");
        return "index"; // Thymeleaf template
    }

    @GetMapping("/categories")
    public String categories(Model model) {
        return "categories";
    }

    @GetMapping("/officer")
    public String officerDashboard(Model model) {
        return "officer_dashboard";
    }

    @GetMapping("/admin")
    public String adminPanel(Model model) {
        return "admin_panel";
    }
}
