package com.handong.swap.Controller;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;

public class CorsFilter implements Filter {
	
	  @Value("${restAPI.crossOrigins}")
	  String cors_allow_origin;
	  
	  @Override
	  public void init(FilterConfig filterConfig) throws ServletException {

	  }

//	  @Override
//	  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//	      
//	  }

	  @Override
	  public void destroy() {

	  }

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
	    httpResponse.addHeader("Access-Control-Allow-Origin", cors_allow_origin);
	    httpResponse.addHeader("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS");
	    httpResponse.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Auth-Token");       
	    chain.doFilter(request, response);
	}
//	  @Override
//	    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
//	        final HttpServletResponse response = (HttpServletResponse) res;
//	        response.setHeader("Access-Control-Allow-Origin", "*");
//	        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
//	        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
//	        response.setHeader("Access-Control-Max-Age", "3600");
//	        if ("OPTIONS".equalsIgnoreCase(((HttpServletRequest) req).getMethod())) {
//	            response.setStatus(HttpServletResponse.SC_OK);
//	        } else {
//	            chain.doFilter(req, res);
//	        }
//	    }
	  
	
}


