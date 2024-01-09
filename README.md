# cloudreve-worker

Cloudreve 直链提取并转跳，使用 cloudflare workers。

# 部署

将 `worker.js` 开头的参数补全，部署到 Cloudflare Worker 即可。

# 使用

+ `/s/XXXXX` 获取分享链接直链并 302 转跳，其格式与 Cloudreve 分享链接相同
+ `/url/XXXXX` 仅获取分享链接，返回 json。
