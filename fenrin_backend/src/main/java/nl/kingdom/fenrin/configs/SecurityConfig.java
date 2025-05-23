package nl.kingdom.fenrin.configs;


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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MyUserDetailService userDetailService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable().cors().and()
                .authorizeHttpRequests(registry -> {

            //Auth routes
            registry.requestMatchers("/api/authenticate", "/api/refreshtoken").permitAll();
            registry.requestMatchers("/api/register").denyAll();

            // Playtime routes
            registry.requestMatchers("/api/playtimelist").hasAnyAuthority(Roles.ROLE_SPELER.toString());
            registry.requestMatchers("/api/playtime").hasAnyAuthority(Roles.ROLE_LEAD.toString());
            registry.requestMatchers("/api/playtime/*").hasAnyAuthority(Roles.ROLE_LEAD.toString());

            // Player routes
            registry.requestMatchers("/api/players").hasAnyAuthority(Roles.ROLE_LEAD.toString());
            registry.requestMatchers("/api/players/*").hasAnyAuthority(Roles.ROLE_LEAD.toString());

            // Build routes
            registry.requestMatchers("/api/buildlist").hasAnyAuthority(Roles.ROLE_SPELER.toString());
            registry.requestMatchers("/api/build").hasAnyAuthority(Roles.ROLE_BOUWLEIDER.toString());
            registry.requestMatchers("/api/build/*").hasAnyAuthority(Roles.ROLE_BOUWLEIDER.toString());

            // Application routes
            registry.requestMatchers("/api/application").permitAll();
            registry.requestMatchers("/api/application/*").hasAnyAuthority(Roles.ROLE_LEAD.toString());

            // Event routes
            registry.requestMatchers("/api/event").hasAnyAuthority(Roles.ROLE_SPELER.toString());


                    try {
                        registry.anyRequest().authenticated().and().cors();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                })
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
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
