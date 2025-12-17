#!/bin/bash
# Deploy script - run on VPS to extract and deploy

cd /tmp
tar -xzf dist.tar.gz
rm -rf /var/www/powalyze.com/dist
mv dist /var/www/powalyze.com/
systemctl reload nginx
echo "✓ Deployment Complete - OAuth System Activated!"
echo "✓ New version available at https://powalyze.com"
