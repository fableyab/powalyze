#!/bin/bash
# Script d'installation de la clé SSH - À exécuter sur le VPS

mkdir -p ~/.ssh
chmod 700 ~/.ssh

cat >> ~/.ssh/authorized_keys << 'EOF'
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC6Uj0zgRgE5o2U0/1Y6eGbuAxrh+D0YmyfiF7rBSY7VyzUsVcd/FsWpnQldhKCFdjKbUBgKFD7bVt719rM0ibSDfB2GYoc1tPQ20XyK6OxY4Arm2Nfd35Zi8gYi1gQe1f6PpQIEuMRvHlQPTKM20dotmAIE8I8Qlp/VHuEjYYA7KSwPKnErF3EqitBdR149u5PjAgl2ARDxuThulPFCLgZkAUs5EHH9ONsYrjoOgl2Lwydxkfb9pb74biBWwkOlOH9+TVQyxOWEqM5XMahrnJ29Rsj/d+b6rIEc6Cv9TwDZy4KChJJXKkgWAAlBNbK7uqvONDb3q7eJ29eu33p2MdU+90bRiWjxS7561CB5UfxLgmgay+KJR1ybwV2nxj/2yP1SxPXQ0BwZAvM5V+qENOjLz35flzfOYbXWbdDw/Qy96S5X5RROYyEeRsWp6mZXxlGPKcDgsHd9D13/kycvUT9FbFW4JVYOuDHtTyDLzapFIyskSre2TSYWTQUO+8yNPOaLMIvwafrFkN9QgbAwUdz6yq23hPAeE7gp020zLKV5joVL15AAkcL789EQTChnFJSg6WnZgseFs8DJEki5QFSptPsYmebnVZ1RF/3sBMejE1ur63FiRLYDmABpTl2AfsyrXaaD/G4BtWov05ZC6qVL3gkOYbzyKHyoPAFH4fVeQ== powalyze-vps
EOF

chmod 600 ~/.ssh/authorized_keys

echo "✅ Clé SSH installée avec succès!"
echo "Test depuis Windows: ssh -i \"C:\Users\fabri\.ssh\id_rsa_powalyze\" root@193.203.169.19"
