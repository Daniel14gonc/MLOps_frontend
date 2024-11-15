# Usa una imagen de Nginx como base
FROM nginx:stable-alpine

# Copia los archivos de construcción al directorio de Nginx
COPY dist/ /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para correr Nginx
CMD ["nginx", "-g", "daemon off;"]