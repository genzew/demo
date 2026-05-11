package com.example.demo.common.base;

import lombok.Data;

@Data
public class PageQuery {
    private long pageNum = 1;
    private long pageSize = 10;
    private String orderBy;
    private Boolean asc = false;
}
