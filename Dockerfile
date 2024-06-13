# Docker file for building image for this Plaxis AI project for next js and tailwind

# load the base image
FROM node:20-slim AS base

# Changing default to work with PNPM
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# set the working directory
WORKDIR /app

# copy the package.json and package-lock.json files
COPY package*.json ./

# Installing dependencies using PNPM
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# copy the source code
FROM base
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

# expose the port
EXPOSE 3000

# start the project
CMD ["pnpm", "start"]

