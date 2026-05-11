# 包厢预订小程序（前端 mock 版）

微信小程序前端脚手架，纯本地 mock，无需后端即可跑通所有页面与流程。后端后续再接。

## 目录结构

```
demo/
├── miniprogram/                微信小程序（已实现）
│   ├── app.js / app.json / app.wxss / sitemap.json / project.config.json
│   ├── package.json            vant 依赖
│   ├── config/                 环境配置（含 useMock 开关）
│   ├── utils/                  request / auth / format
│   ├── mock/                   接口 mock 路由 + 静态数据
│   ├── api/                    业务 API 封装（home/store/booking/order/device/user/coupon/misc）
│   ├── components/             自定义组件（store-card / empty-state）
│   ├── pages/                  页面
│   └── images/                 图片资源（占位，按需自行补）
└── server/                     Java 后端（先放着，后续再实现）
```

## 已覆盖页面（按功能架构）

| 模块         | 页面                                                                |
|------------|-------------------------------------------------------------------|
| 首页         | `pages/index`：定位栏、Banner、快捷入口、热门活动、推荐门店                          |
| 预订         | `pages/store-list`、`pages/store-detail`、`pages/booking-confirm`、`pages/booking-success` |
| 订单         | `pages/order-list`、`pages/order-detail`（含开门码 / 续时 / 取消 / 申请发票） |
| 智能开门       | `pages/open-door`（一键开门 + 蓝牙备选）、`pages/scan`（扫码开门）                   |
| 我的         | `pages/mine`、`pages/login`                                         |
| 优惠券 / 邀请 | `pages/coupon`、`pages/invite`                                      |
| 辅助功能      | `pages/feedback`、`pages/settings`、`pages/address`（消费记录）、`pages/invoice`（发票） |

## 跑起来

1. **安装 vant**（小程序需要构建 npm）
   ```bash
   cd miniprogram
   npm install
   ```

2. **微信开发者工具**
   - 导入项目根目录指向 `demo/miniprogram`
   - AppID：使用测试号即可（`project.config.json` 里 `appid: touristappid`）
   - 菜单 → 工具 → **构建 npm**（生成 `miniprogram_npm`，否则 vant 组件报找不到）
   - 编译预览即可

3. **登录态**
   - 「我的」点登录或任何需要鉴权的入口会跳到登录页
   - 微信一键登录走 mock，直接给一个假 token + 假用户

## Mock 机制

- `config/index.js` 里 `useMock: true`
- `utils/request.js` 检测到该开关后会把请求转给 `mock/index.js`
- `mock/index.js` 用一张路由表 + 通配符（`/stores/:id`）模拟 RESTful 后端
- 数据来自 `mock/data.js`；订单写入 `wx.setStorageSync('mock_orders')`，刷新不丢
- 切真实后端：把 `useMock` 改 `false`，调好 `baseUrl` 即可

## 关键约定

- 接口返回统一格式：`{ code, message, data, timestamp }`
- `code === 0` 视为成功，`401` 自动清登录态跳登录页
- 鉴权头：`Authorization: Bearer <token>`
- 价格全部以 **分** 存储，前端展示时除以 100

## TODO（前端层面）

- `images/` 目录是占位，tabBar 已改纯文字；后续补 4 张 `home/store/order/mine` 图标后，把 app.json 的 tabBar 节点恢复 iconPath 即可
- 蓝牙开门当前是模拟的 `setTimeout`，真实场景接 `wx.openBluetoothAdapter` 等 API
- 时间选择器目前是简易 chip 网格，后续可换成 vant 的 `picker` 做更完整的时段联动
