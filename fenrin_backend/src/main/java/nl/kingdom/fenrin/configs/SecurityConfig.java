package nl.kingdom.fenrin.configs;


import lombok.AllArgsConstructor;
import nl.kingdom.fenrin.enums.Roles;
import nl.kingdom.fenrin.services.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MyUserDetailService userDetailService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable()
                .authorizeHttpRequests(registry -> {

//  TODO hierin kan je de aangeven welke role bij welk endpoint kan!

            registry.requestMatchers(new AntPathRequestMatcher("/authenticate")).permitAll();
            registry.requestMatchers(new AntPathRequestMatcher("/register")).permitAll();
            registry.requestMatchers(new AntPathRequestMatcher("/admin/**")).hasRole("LEAD");
            registry.requestMatchers(new AntPathRequestMatcher("/user/**")).hasAnyRole(Roles.SPELER.toString(), Roles.BOUWLEIDER.toString(), Roles.LEAD.toString());
            registry.anyRequest().authenticated();
        }).build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
