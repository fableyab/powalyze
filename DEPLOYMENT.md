Deployment instructions — Powalyze
===============================

1) Copy configs and reload Nginx

```bash
# from the repo on the VPS
sudo cp nginx-powalyze-ssl.conf /etc/nginx/sites-available/powalyze.conf
sudo ln -fs /etc/nginx/sites-available/powalyze.conf /etc/nginx/sites-enabled/powalyze.conf
sudo nginx -t
sudo systemctl reload nginx
```

2) Build and start the Next.js app (port 3001)

```bash
cd /path/to/repo
npm ci --production
npm run build
# recommended: pm2
pm2 start npm --name powalyze -- start
pm2 save
```

3) Or use systemd

```bash
sudo cp systemd/powalyze.service /etc/systemd/system/powalyze.service
sudo systemctl daemon-reload
sudo systemctl enable --now powalyze
sudo systemctl status powalyze
```

4) Quick deploy (script)

Run `deploy-powalyze.sh` from the repo root on the VPS:

```bash
chmod +x deploy-powalyze.sh
./deploy-powalyze.sh
```

Notes
- The Nginx configs in the repo were updated to proxy `/pmo-*` to `http://127.0.0.1:3001`.
- Do not share private SSH keys in chat. If you want me to run the deploy, provide temporary SSH access (user@host and a deploy key) via a secure channel.
