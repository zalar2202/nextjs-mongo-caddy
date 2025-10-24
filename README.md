# 🚀 Next.js + MongoDB + Caddy (Production Stack)

![GitHub Repo stars](https://img.shields.io/github/stars/zalar2202/nextjs-mongo-caddy?style=flat&color=gold)
![GitHub last commit](https://img.shields.io/github/last-commit/zalar2202/nextjs-mongo-caddy?color=orange)
![GitHub License](https://img.shields.io/github/license/zalar2202/nextjs-mongo-caddy)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-ready-blue?logo=docker)
![Next.js](https://img.shields.io/badge/Next.js-14.2.x-black?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)
![Caddy](https://img.shields.io/badge/Caddy-2.x-lightblue?logo=caddy)

> **Fully containerized production setup** for a modern full-stack app:
> - ⚡️ **Next.js 14** frontend with API routes  
> - 🍃 **MongoDB** database (local container)  
> - 🔒 **Caddy** reverse proxy with automatic HTTPS (via Let's Encrypt + Cloudflare)

---

## 🌐 Live Deployment

**Production URL:**  
🔗 [https://portal.logaa.site](https://portal.logaa.site)

Hosted on a DigitalOcean VPS with Docker, fronted by Cloudflare and Caddy auto-TLS.

---

## 🧰 Stack Overview

| Service | Role | Port | Container |
|----------|------|------|------------|
| **Next.js** | Frontend & API | `3000` | `app-web-1` |
| **MongoDB** | Database | `27017` | `app-mongo-1` |
| **Caddy** | Reverse proxy + HTTPS | `80`, `443` | `app-caddy-1` |

---

## ⚙️ Quick Start

```bash
git clone git@github.com:zalar2202/nextjs-mongo-caddy.git
cd nextjs-mongo-caddy

# Copy and configure environment variables
cp .env.example .env
# (edit secrets inside .env)

# Build and start
docker compose up -d --build
