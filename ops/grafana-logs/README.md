# Package logs exploring using local Grafana+Loki+Promtail stack

## Motivation

When developing locally, API logs are either too lengthy when using pino-pretty or too hard to visually parse when in JSON format. To make multiple log steps easier to read, one can utilise local Grafana+Loki+Promtail stack. It also allows one to collapse and expand log lines.

## How to use

1. Start environment using `pnpm dev:json-logs`. This command will pipe all the logs to the `./logs/fastify.log` file
2. Navigate to Grafana `http://locahost:3000`
3. Check dashboard "Loki: Logs/App"

Notes:

- Use default `admin:admin` to log into Grafana for customization.

<image src="./assets/log-in.jpg" width=400/>
