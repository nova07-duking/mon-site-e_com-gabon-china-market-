#!/bin/bash

# Script de déploiement automatique GCMarket
# Usage: ./deploy.sh [VOTRE_IP_PUBLIQUE]

IP_ADDRESS=$1

if [ -z "$IP_ADDRESS" ]; then
    echo "Usage: ./deploy.sh [VOTRE_IP_PUBLIQUE]"
    exit 1
fi

echo "🚀 Configuration du déploiement pour l'IP : $IP_ADDRESS"

# Création du fichier .env
cat <<EOF > .env
GCM_BACKEND_URL=http://$IP_ADDRESS:8080
GCM_FRONTEND_URL=http://$IP_ADDRESS
EOF

echo "✅ Fichier .env généré."

# Relance de Docker Compose
echo "📦 Reconstruction et démarrage des conteneurs..."
docker-compose up -d --build

echo "🎉 Mise à jour terminée !"
echo "🌐 Frontend : http://$IP_ADDRESS"
echo "📚 Swagger : http://$IP_ADDRESS:8080/swagger-ui.html"
echo "🗄️ phpMyAdmin : http://$IP_ADDRESS:8081"
