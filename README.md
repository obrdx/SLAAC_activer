# SLAAC IPv6 路由追踪

这个 OBoard 插件从指定服务器执行 IPv6 UDP 路由追踪，默认目标是 `dns.google`，相当于受控的 `traceroute6 dns.google`。插件只通过 OBoard SDK 访问 Agent，不执行 Shell 命令。

## 配置

- `TARGET_SERVER`：选择已注册并具备 IPv6 的服务器。
- `TARGET`：目标域名，默认 `dns.google`。
- `MAX_HOPS`：最大跳数，默认 `30`。
- `QUERIES_PER_HOP`：每跳探测次数，默认 `3`。
- `PER_HOP_TIMEOUT_MS`：每跳超时，默认 `1000` 毫秒。

安装插件实例后，创建 `interval` 定时触发器，直接在触发器中设置执行间隔（例如 `5m`）。节点还需要在本地安全策略中允许插件诊断。
