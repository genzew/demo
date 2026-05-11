package com.example.demo.security;

import com.example.demo.common.exception.BizException;
import com.example.demo.common.result.ResultCode;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProperties props;
    private final JwtTokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) {
        if (!(handler instanceof HandlerMethod hm)) {
            return true;
        }
        boolean anonymous = hm.hasMethodAnnotation(Anonymous.class)
                || hm.getBeanType().isAnnotationPresent(Anonymous.class);
        if (anonymous) {
            return true;
        }

        String header = req.getHeader(props.getHeader());
        if (header == null || !header.startsWith(props.getPrefix())) {
            throw new BizException(ResultCode.UNAUTHORIZED);
        }
        String token = header.substring(props.getPrefix().length()).trim();
        try {
            Claims c = tokenService.parse(token);
            LoginUser u = new LoginUser(
                    Long.valueOf(c.getSubject()),
                    c.get("openid", String.class),
                    null);
            UserContext.set(u);
        } catch (Exception e) {
            log.warn("invalid token: {}", e.getMessage());
            throw new BizException(ResultCode.UNAUTHORIZED);
        }
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest req, HttpServletResponse resp, Object handler, Exception ex) {
        UserContext.clear();
    }
}
