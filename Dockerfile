# The site is built (and the CV PDF rendered) in CI before this image builds;
# the image is just nginx serving the static export.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY out/ /usr/share/nginx/html/
