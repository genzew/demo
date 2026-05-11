package com.example.demo.common.result;

import lombok.Getter;

@Getter
public enum ResultCode {

    SUCCESS(0, "ok"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未登录或登录已过期"),
    FORBIDDEN(403, "无权限访问"),
    NOT_FOUND(404, "资源不存在"),
    INTERNAL_ERROR(500, "服务器内部错误"),

    USER_NOT_FOUND(1001, "用户不存在"),
    WX_LOGIN_FAIL(1002, "微信登录失败"),

    STORE_NOT_FOUND(2001, "门店不存在"),
    ROOM_UNAVAILABLE(2101, "包厢不可预订"),

    BOOKING_TIME_CONFLICT(3001, "所选时段已被占用"),
    BOOKING_NOT_FOUND(3002, "预订记录不存在"),

    ORDER_NOT_FOUND(4001, "订单不存在"),
    ORDER_STATUS_INVALID(4002, "订单状态不允许该操作"),

    PAY_FAIL(5001, "支付失败"),

    DEVICE_OFFLINE(6001, "设备离线"),
    DEVICE_OPEN_FAIL(6002, "开门失败"),

    COUPON_INVALID(7001, "优惠券无效或已过期");

    private final int code;
    private final String message;

    ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
