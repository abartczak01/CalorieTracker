package dev.abartczak.calorietracker.controller.web;

import dev.abartczak.calorietracker.dto.auth.request.AuthenticationRequest;
import dev.abartczak.calorietracker.dto.auth.response.AuthenticationResponse;
import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.service.AuthenticationService;
import dev.abartczak.calorietracker.service.JwtService;
import dev.abartczak.calorietracker.service.ProductService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/web")
public class WebController {

    private final AuthenticationService authenticationService;
    private final ProductService productService;
    private final JwtService jwtService;

    private boolean isNotAdmin(String jwt) {
        return jwt == null || jwt.isEmpty() || !jwtService.hasAdminRole(jwt);
    }

    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String login(
            @ModelAttribute AuthenticationRequest request,
            HttpServletResponse response,
            Model model
    ) {
        try {
            AuthenticationResponse authResponse = authenticationService.authenticate(request);
            Cookie jwtCookie = new Cookie("jwt", authResponse.getToken());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);
            return "redirect:/web/products";
        } catch (Exception e) {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }

    @GetMapping("/products/{id}")
    public String showProductDetails(
            @PathVariable long id,
            @CookieValue(value = "jwt", required = false) String jwt,
            Model model
    ) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        try {
            Product product = productService.findById(id);
            model.addAttribute("product", product);
            return "product-details";
        } catch (Exception e) {
            return "redirect:/web/products";
        }
    }

    @PostMapping("/products")
    public String saveProduct(@ModelAttribute Product product, @CookieValue(value = "jwt", required = false) String jwt) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        productService.save(product);
        return "redirect:/web/products";
    }

    @GetMapping("/products/new")
    public String showAddProductForm(Model model, @CookieValue(value = "jwt", required = false) String jwt) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        model.addAttribute("product", new Product());
        return "product-form";
    }

    @PostMapping("/products/delete/{id}")
    public String deleteProduct(@PathVariable Long id, @CookieValue(value = "jwt", required = false) String jwt) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        productService.deleteById(id);
        return "redirect:/web/products";
    }

    @GetMapping("/products/edit/{id}")
    public String showEditProductForm(@PathVariable Long id, Model model, @CookieValue(value = "jwt", required = false) String jwt) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        Product product = productService.findById(id);
        model.addAttribute("product", product);
        return "product-form";
    }

    @PostMapping("/products/edit/{id}")
    public String updateProduct(
            @PathVariable Long id,
            @ModelAttribute Product product,
            @CookieValue(value = "jwt", required = false) String jwt
    ) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        productService.updateProduct(id, product);
        return "redirect:/web/products";
    }

    @PostMapping("/logout")
    public String logout(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt", "");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        return "redirect:/web/login";
    }

    @GetMapping("/products")
    public String showProducts(
            @CookieValue(value = "jwt", required = false) String jwt,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer minKcal,
            @RequestParam(required = false) Integer maxKcal,
            @RequestParam(required = false) Boolean isVegan,
            Model model
    ) {
        if (isNotAdmin(jwt)) {
            return "redirect:/web/login";
        }

        try {
            List<Product> products = productService.searchProducts(
                    name, null, isVegan, minKcal, maxKcal, null, null, null, null, null, null
            );
            model.addAttribute("products", products);
            model.addAttribute("name", name);
            model.addAttribute("minKcal", minKcal);
            model.addAttribute("maxKcal", maxKcal);
            model.addAttribute("isVegan", isVegan);

            return "products";
        } catch (Exception e) {
            return "redirect:/web/login";
        }
    }
}
