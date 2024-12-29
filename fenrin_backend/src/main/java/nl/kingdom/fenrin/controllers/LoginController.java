package nl.kingdom.fenrin.controllers;

import nl.kingdom.fenrin.models.LoginForm;
import nl.kingdom.fenrin.services.JwtService;
import nl.kingdom.fenrin.services.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserDetailService myUserDetailService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAndGenerateToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.getUsername(),
                loginForm.getPassword()
        ));
        if (authentication.isAuthenticated()) {
            return ResponseEntity.ok(Map.of("token", jwtService.generateToken(myUserDetailService.loadUserByUsername(loginForm.getUsername()))));
        } else {

            throw new UsernameNotFoundException("Invallid credentials");
        }
    }
}
